import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SummaryForm() {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleClick = () => {
    buttonDisabled ? setButtonDisabled(false) : setButtonDisabled(true);
  };
  return (
    <Form>
      <Form.Check onClick={handleClick} type="checkbox" label="Check me out" />

      <Button disabled={buttonDisabled} variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
