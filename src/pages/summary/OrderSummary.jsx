import React from "react";
import SummaryForm from "./SummaryForm";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utilities";

export default function OrderSummary({ setOrderPhase }) {
  const { totals, optionCounts } = useOrderDetails();

  const scoopArray = Object.entries(optionCounts.scoops);
  const scoopsList = scoopArray.map(([key, value]) => (
    <li key={key}>
      {value} {key}
    </li>
  ));

  const hasToppings = totals.toppings > 0;
  let toppingsDisplay = null;

  if (hasToppings) {
    const toppingsArray = Object.keys(optionCounts.toppings);
    const toppingsList = toppingsArray.map((name) => (
      <li key={name}>{name}</li>
    ));
    <ul>{toppingsList}</ul>;
    toppingsDisplay = (
      <>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
      </>
    );
  }

  return (
    <div>
      <h1>Order Summary:</h1>
      <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
      <ul>{scoopsList}</ul>
      {toppingsDisplay}
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}
