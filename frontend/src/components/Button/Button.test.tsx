import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "./Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  test("renders without crashing and children correctly", () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByText("Test Button")).toBeInTheDocument();
  });

  test("renders button with primary variant by default", () => {
    render(<Button>Primary Button</Button>);
    const button = screen.getByText("Primary Button");
    expect(button).toHaveClass("bg-teal-500");
  });

  test("renders button with secondary variant", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByText("Secondary Button");
    expect(button).toHaveClass("bg-gray-100");
  });

  test("renders disabled state button", () => {
    render(<Button disabled>Disabled Button</Button>);
    expect(screen.getByText("Disabled Button")).toBeDisabled();
    expect(screen.getByText("Disabled Button")).toHaveClass(
      "cursor-not-allowed"
    );
  });

  test("renders loading state button ", () => {
    render(<Button isLoading>Original Text</Button>);
    expect(screen.queryByText("Original Text")).not.toBeInTheDocument();
    expect(screen.getByText("Processing...")).toBeInTheDocument();
  });

  test("handles click functionality", async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    await userEvent.click(screen.getByText("Click Me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
