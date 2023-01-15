import { Button, Form } from "react-bootstrap";

export default function SummaryForm() {
  return (
    <Form>
      <Form.Check type="checkbox" label="Check me out" />

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
