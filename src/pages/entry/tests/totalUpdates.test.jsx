import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  const scoopsSubtotal = screen.getByText("Scoops total: €", { exact: false });

  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="toppings" />);

  const toppingsSubtotal = screen.getByText("Toppings total: €", {
    exact: false,
  });

  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  await user.click(cherriesCheckbox);

  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const hotHudgeCheckbox = await screen.findByRole("checkbox", {
    name: "Hot hudge",
  });

  await user.click(hotHudgeCheckbox);

  expect(toppingsSubtotal).toHaveTextContent("3.00");

  await user.click(hotHudgeCheckbox);

  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("starts at 0", () => {
    const { unmount } = render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: €", {
      exact: false,
    });

    expect(grandTotal).toHaveTextContent("0.00");

    unmount();
  });
  test("updates properly if scoop is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: €", {
      exact: false,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("updates properly if topping is added first", async () => {
    const user = userEvent.setup();

    render(<OrderEntry />);

    const grandTotal = screen.getByText("Grand total: €", {
      exact: false,
    });

    const cherriesCheckbox = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    await user.click(cherriesCheckbox);

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);

    expect(grandTotal).toHaveTextContent("2.00");
  });
  test("updates properly if item is removed", () => {});
});
