import { Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <>
      <h2>Loading...</h2>
      <Spinner animation="border" role="status" />
    </>
  );
}
