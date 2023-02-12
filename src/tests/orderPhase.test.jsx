import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  const user = userEvent.setup();

  const { unmount } = render(<App />);

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "3");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: /cherries/i,
  });

  await user.click(cherriesCheckbox);

  const orderSummaryButton = screen.getByRole("button", {
    name: /order sundae/i,
  });

  await user.click(orderSummaryButton);

  const summaryHeading = screen.getByRole("heading", {
    name: /order summary/i,
  });

  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", {
    name: /scoops: €6.00/i,
  });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingsHeading = screen.getByRole("heading", {
    name: /toppings: €1.50/i,
  });
  expect(toppingsHeading).toBeInTheDocument();

  expect(screen.getByText("3 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  const termsCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(termsCheckbox);

  const confirmOrderButton = screen.getByRole("button", {
    name: /confirm order/i,
  });
  await user.click(confirmOrderButton);

  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  const thanksHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thanksHeader).toBeInTheDocument();

  const notLoading = screen.queryByText("loading");
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  const newOrderButton = screen.getByRole("button", {
    name: /new order/i,
  });
  await user.click(newOrderButton);

  const scoopsTotal = await screen.findByText(/scoops total: €0.00/i);
  expect(scoopsTotal).toBeInTheDocument();

  const toppingsTotal = screen.getByText(/toppings total: €0.00/i);
  expect(toppingsTotal).toBeInTheDocument();

  unmount();
});
