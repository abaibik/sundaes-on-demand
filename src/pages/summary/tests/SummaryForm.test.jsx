import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

test("checkbox is unchecked by default", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox");
  expect(checkbox).not.toBeChecked();
});
