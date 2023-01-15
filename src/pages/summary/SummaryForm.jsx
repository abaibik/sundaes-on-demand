import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";

export default function SummaryForm() {
  const [termsChecked, settermsChecked] = useState(false);
  const handleClick = (e) => {
    settermsChecked(e.target.checked);
  };
  const checkBoxLabel = (
    <span>
      I agree to <span style={{ color: "blue" }}>Terms and Conditions</span>
    </span>
  );
  return (
    <Form>
      <FormGroup controlId="formCheck">
        <Form.Check
          checked={termsChecked}
          onChange={handleClick}
          type="checkbox"
          label={checkBoxLabel}
        />
      </FormGroup>

      <Button disabled={!termsChecked} variant="primary" type="submit">
        Confirm Order
      </Button>
    </Form>
  );
}
