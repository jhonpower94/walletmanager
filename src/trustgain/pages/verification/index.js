import {
  Card,
  CardContent,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import {
  BootstrapInput,
  HeaderTitle,
  formstyle,
} from "../../../component/component";
import { LoadingButton } from "@mui/lab";
import { useDropzone } from "react-dropzone";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../config/firebase";
import CustomizedSnackbars from "../../alert";
import { addUsers } from "../../../config/services";
import { useSelector } from "react-redux";

export default function Identity() {
  const userInfos = useSelector((state) => state.useInfos);

  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const [values, setValues] = React.useState({
    imageid: { image: "", loading: false },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setValues({
        ...values,
        imageid: { image: "", loading: true },
      });

      const storageRef = ref(storage, `images/${acceptedFiles[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, acceptedFiles[0]);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          setValues({
            ...values,
            imageid: { image: "", loading: false },
          });
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            addUsers(userInfos.id, {
              kyc_verified: true,
              image_url: downloadURL,
            }).then(() => {
              setValues({
                ...values,
                imageid: { image: `${downloadURL}`, loading: false },
              });
              setOpenSnackbar(true);
            });
          });
        }
      );
    },
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container>
      <CustomizedSnackbars
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        severity="success"
        message={
          "Your file has been uploaded successfully, your account will be verified onces it is reviewed and confirmed."
        }
      />
      <Card variant="outlined">
        <CardContent>
          <HeaderTitle
            title={"Identity verification"}
            subtitle={
              "Upload any clear photo or scanned image of your identity document"
            }
          />
          <div style={formstyle.section}>
            <FormControl variant="standard">
              <InputLabel shrink htmlFor="names-input">
                Select document type to upload
              </InputLabel>
              <BootstrapInput
                defaultValue={"International passport"}
                select
                id="address-input"
                placeholder="identity document type"
                name="id_type"
                required
              >
                {[
                  "International passport",
                  "Drivers Licence",
                  "Voters card",
                ].map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </BootstrapInput>
            </FormControl>
          </div>

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            required
            value={values.imageid.image}
            label="ID Document"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <LoadingButton
                      loading={values.imageid.loading}
                      variant="contained"
                      disableElevation
                    >
                      Choose file
                    </LoadingButton>
                  </div>
                </InputAdornment>
              ),
            }}
          />
        </CardContent>
      </Card>
    </Container>
  );
}
