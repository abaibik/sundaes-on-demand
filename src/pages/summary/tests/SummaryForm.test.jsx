import { fireEvent, render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";

describe("SummaryForm", () => {
  let checkbox;
  let button;
  beforeEach(() => {
    render(<SummaryForm />);
    checkbox = screen.getByRole("checkbox", {
      name: "I agree to Terms and Conditions",
    });
    button = screen.getByRole("button", { name: "Confirm Order" });
  });

  test("checkbox is unchecked by default", () => {
    expect(checkbox).not.toBeChecked();
  });

  test("checking checkbox enables button", () => {
    expect(button).toBeDisabled();
    fireEvent.click(checkbox);
    expect(button).toBeEnabled();
  });

  test("unchecking checkbox again disables button", () => {
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    expect(button).toBeDisabled();
  });
});
