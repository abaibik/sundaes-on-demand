import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import Button from "react-bootstrap/Button";
import AlertBanner from "../common/AlertBanner";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .post(`http://localhost:3030/order`, {
        signal: controller.signal,
      })
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => setError(true));

    return () => {
      controller.abort();
    };
  }, []);

  const newOrderButton = (
    <Button onClick={handleClick}>Create new order</Button>
  );

  if (error) {
    return (
      <>
        <AlertBanner message={null} variant={null} />
        {newOrderButton}
      </>
    );
  }

  function handleClick() {
    resetOrder();
    setOrderPhase("inProgress");
  }

  if (orderNumber) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Thank you!</h1>
        <p>Your order number is {orderNumber}</p>
        <p style={{ fontSize: "25%" }}>
          as per our terms and conditions, nothing will happen now
        </p>
        {newOrderButton}
      </div>
    );
  } else {
    return <Loading />;
  }
}
