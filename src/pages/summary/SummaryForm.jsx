import { useState } from "react";
import { Button, Form, FormGroup } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

export default function SummaryForm() {
  const [termsChecked, settermsChecked] = useState(false);
  const handleClick = (e) => {
    settermsChecked(e.target.checked);
  };

  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>No ice cream will actually be delivered</Popover.Body>
    </Popover>
  );

  const checkBoxLabel = (
    <span>
      I agree to
      <OverlayTrigger placement="right" overlay={popover}>
        <span style={{ color: "blue" }}> Terms and Conditions</span>
      </OverlayTrigger>
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
