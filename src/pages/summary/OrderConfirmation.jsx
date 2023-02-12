import { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { Button } from "react-bootstrap";

export default function OrderConfirmation({ setOrderPhase }) {
  const { resetOrder } = useOrderDetails();
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .post(`http://localhost:3030/order`, {
        signal: controller.signal,
      })
      .then((response) => setOrderNumber(response.data.orderNumber))
      .catch((error) => {
        // TODO: handle error
      });

    return () => {
      controller.abort();
    };
  }, []);

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
        <Button onClick={handleClick}>Create new order</Button>
      </div>
    );
  } else {
    return <Loading />;
  }
}
