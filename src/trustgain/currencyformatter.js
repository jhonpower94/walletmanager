import NumberFormat from "react-number-format";

export function CurrencyFormat({ amount }) {
  return <NumberFormat thousandSeparator={true} displayType={'text'} prefix={"$"} value={amount} />;
}
