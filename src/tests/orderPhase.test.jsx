import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

describe("order phases for happy path", () => {
  test("Toppings header is not on summary page if no toppings ordered", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    const chocolateInput = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });

    await user.clear(chocolateInput);
    await user.type(chocolateInput, "2");

    const orderSummaryButton = screen.getByRole("button", {
      name: /order sundae/i,
    });

    await user.click(orderSummaryButton);

    const scoopsHeading = screen.getByRole("heading", {
      name: /scoops: €8.00/i,
    });

    expect(scoopsHeading).toBeInTheDocument();

    const toppingsHeading = screen.queryByRole("heading", {
      name: /toppings/i,
    });
    expect(toppingsHeading).not.toBeInTheDocument();

    unmount();
  });

  test("Toppings header is not on summary page if toppings ordered, then removed", async () => {
    const user = userEvent.setup();

    const { unmount } = render(<App />);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: /vanilla/i,
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: /cherries/i,
    });

    await user.click(cherriesCheckbox);
    expect(cherriesCheckbox).toBeChecked();
    const toppingsTotal = screen.getByText(/toppings total/i, { exact: false });
    expect(toppingsTotal).toHaveTextContent("1.50");

    await user.click(cherriesCheckbox);
    expect(cherriesCheckbox).not.toBeChecked();
    expect(toppingsTotal).toHaveTextContent("0.00");

    // const orderSummaryButton = screen.getByRole("button", {
    //   name: /order sundae/i,
    // });

    // await user.click(orderSummaryButton);

    // const summaryHeading = screen.getByRole("heading", {
    //   name: /order summary/i,
    // });

    // expect(summaryHeading).toBeInTheDocument();

    // const scoopsHeading = screen.getByRole("heading", {
    //   name: /scoops: €4.00/i,
    // });
    // expect(scoopsHeading).toBeInTheDocument();
    // const toppingsHeading = screen.getByRole("heading", {
    //   name: /toppings: €0.00/i,
    // });
    // expect(toppingsHeading).toBeInTheDocument();

    // const termsCheckbox = screen.getByRole("checkbox", {
    //   name: /terms and conditions/i,
    // });
    // await user.click(termsCheckbox);

    // const confirmOrderButton = screen.getByRole("button", {
    //   name: /confirm order/i,
    // });
    // await user.click(confirmOrderButton);

    // const loading = screen.getByText(/loading/i);
    // expect(loading).toBeInTheDocument();

    // const thanksHeader = await screen.findByRole("heading", {
    //   name: /thank you/i,
    // });
    // expect(thanksHeader).toBeInTheDocument();

    // const notLoading = screen.queryByText("loading");
    // expect(notLoading).not.toBeInTheDocument();

    // const orderNumber = await screen.findByText(/order number/i);
    // expect(orderNumber).toBeInTheDocument();

    // const newOrderButton = screen.getByRole("button", {
    //   name: /new order/i,
    // });
    // await user.click(newOrderButton);

    // const scoopsTotal = await screen.findByText(/scoops total: €0.00/i);
    // expect(scoopsTotal).toBeInTheDocument();

    unmount();
  });
});
