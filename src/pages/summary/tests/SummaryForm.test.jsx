import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

describe("SummaryForm", () => {
  const user = userEvent.setup();

  let checkbox;
  let button;
  let termsAndConditions;
  let nullPopover;
  let popover;

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

  test("checking checkbox enables button", async () => {
    expect(button).toBeDisabled();
    await user.click(checkbox);
    expect(button).toBeEnabled();
  });

  test("unchecking checkbox again disables button", async () => {
    await user.click(checkbox);
    await user.click(checkbox);
    expect(button).toBeDisabled();
  });

  test("popower responds to hover", async () => {
    nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );

    expect(nullPopover).not.toBeInTheDocument();

    termsAndConditions = screen.getByText(/terms and conditions/i);

    await user.hover(termsAndConditions);

    popover = screen.getByText(/no ice cream will actually be delivered/i);

    expect(popover).toBeInTheDocument();

    await user.unhover(termsAndConditions);

    expect(popover).not.toBeInTheDocument();
  });
});
