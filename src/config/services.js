import CryptoConvert from "crypto-convert";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where
} from "firebase/firestore";
import { collectionData, docData } from "rxfire/firestore";
import { tap } from "rxjs/operators";
import { store } from "../";
import { notification$, totaltransaction$ } from "../trustgain/redux/action";
import { db } from "./firebase";

import { useEffect, useState } from "react";
import NumberFormat from "react-number-format";

const current_timestamp = Timestamp.fromDate(new Date());

export const CurrencyFormat = ({ amount, prefix, seperator }) => {
  return (
    <NumberFormat
      thousandSeparator={seperator}
      displayType={"text"}
      prefix={prefix}
      value={amount}
      decimalScale={2}
      fixedDecimalScale
    />
  );
};

export const CryptoCurrencyFormat = ({ amount, suffix }) => {
  return (
    <NumberFormat
      thousandSeparator={false}
      displayType={"text"}
      suffix={suffix}
      value={amount}
      decimalScale={6}
      fixedDecimalScale
    />
  );
};

export const addUsers = async (docid, userdatas) => {
  const querydoc = doc(db, `users/${docid}`);
  await setDoc(querydoc, userdatas, { merge: true });
};

export const creditWallet = async (userid, wallet, data) => {
  const querydoc = doc(db, "users", `${userid}`, "wallet", wallet);
  await setDoc(querydoc, data, { merge: true });
};

export const getUserInfo = (userid) => {
  const querydoc = doc(db, `users/${userid}`);
  return docData(querydoc);
};

export const getTransactions = (userid) => {
  const transactionref = query(
    collection(db, "users", `${userid}`, "transactions"),
    where("main", "==", true)
  );
  return collectionData(transactionref, { idField: "uid" })
    .pipe(
      tap((transactions) => console.log("This is all transaction observable!"))
    )
    .subscribe((trans) => {
      console.log(trans.length);
      store.dispatch(totaltransaction$(trans.length));
    });
};

export const getTransactionsType = async (userid, coinType) => {
  const transactionref = query(
    collection(db, "users", `${userid}`, "transactions"),
    where("cointitle", "==", coinType),
    orderBy("timestamp", "desc")
  );
  const querySnapshot = await getDocs(transactionref);
  return querySnapshot;
};

export const addTransfer = async (userid, data) => {
  const docRef = doc(collection(db, "users", userid, "transactions"));

  return await setDoc(docRef, { ...data, timestamp: current_timestamp });
};

export const updateUserBalance = (userid, cointype, balance) => {
  const querydoc = doc(db, `users/${userid}`);
  console.log(balance);
  return setDoc(querydoc, { [cointype]: Number(balance) }, { merge: true });
};

export const getallusers = () => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  return collectionData(q, { idField: "uid" });
};

export const getuserDataAdmin = (id) => {
  const davidDocRef = doc(db, `users/${id}`);
  return docData(davidDocRef, { idField: "uid" });
};

export const getuserDataBalanceAdmin = (id, type) => {
  const DocRef = doc(db, "users", `${id}`, "account", type);
  return docData(DocRef, { idField: "uid" });
};

export const updateuserDataBalanceAdmin = (id, type, balance) => {
  const DocRef = doc(db, "users", `${id}`, "account", type);
  setDoc(DocRef, { balance: parseInt(balance) }, { merge: true });
  alert("User info has been updated successfully");
};

export const activateAccount = async (uid, current) => {
  const DocRef = doc(db, "users", `${uid}`);
  await setDoc(
    DocRef,
    { activated: current, Verificationstatus: current },
    { merge: true }
  );
};

export const getallWalletTransaction = () => {
  const collectionRef = collection(db, "transactionswallet");
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  return collectionData(q, { idField: "uid" });
};

export const getallUserTrans = (id) => {
  const collectionRef = collection(db, "users", id, "transactions");
  const q = query(collectionRef, orderBy("timestamp", "desc"));
  return collectionData(q, { idField: "uid" });
};

export const addNotification = async (id, title, message) => {
  const DocRef = doc(collection(db, "users", `${id}`, "notification"));
  await setDoc(DocRef, { title: title, message: message });
};

export const getNotification = (id) => {
  const notificationRef = query(
    collection(db, "users", `${id}`, "notification")
  );
  return collectionData(notificationRef, { idField: "uid" }).subscribe(
    (data) => {
      store.dispatch(notification$(data));
    }
  );
};

export const deletedocument = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const sendMessage = (message, subject, email, name) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  var raw = JSON.stringify({
    message: message,
    to: `anthonyerics84@gmail.com, ${email}`,
    subject: subject,
    name: name,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  return fetch(
    "https://expresspages-chi.vercel.app/cambit",
    requestOptions
  ).then((response) => response.text());
};

export const convert = new CryptoConvert();

export const Price = function({ amount }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    (async function() {
      await convert.ready();
      setValue(convert.ETH.USD(amount));
    })();
  }, []);

  // const returnValue = convert.USD.BTC(200);

  return (
    <>
      You will receive{" "}
      <CurrencyFormat amount={value} prefix="$" seperator={true} /> USD
    </>
  );
};
