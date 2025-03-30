import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InvestmentForm } from "./InvestmentForm";
import { Fund } from "../../../types/types";

describe("InvestmentForm Component", () => {
  const mockFund: Fund = {
    id: "1",
    name: "High Risk Test Fund",
    description: "High risk fund used for testing",
    risk: "High",
    category: "testing",
  };

  const testProps = {
    selectedFund: mockFund,
    isSubmitting: false,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  test("renders form with fund details without crashing", () => {
    render(<InvestmentForm {...testProps} />);

    expect(screen.getByText(`Invest in ${mockFund.name}`)).toBeInTheDocument();

    expect(screen.getByText(mockFund.description)).toBeInTheDocument();
    expect(screen.getByText(mockFund.risk)).toBeInTheDocument();
  });

  test("handles investment amount input change", () => {
    render(<InvestmentForm {...testProps} />);

    const amountInput = screen.getByLabelText("Amount");

    fireEvent.change(amountInput, { target: { value: 333 } });
    expect(amountInput).toHaveValue(333);
  });

  test("disables submit button when no amount is entered", () => {
    render(<InvestmentForm {...testProps} />);

    const submitButton = screen.getByRole("button", {
      name: "Complete investment",
    });

    expect(submitButton).toBeDisabled();
  });

  test("allows the user to submit when valid amount is entered", () => {
    render(<InvestmentForm {...testProps} />);

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: 330 } });

    const submitButton = screen.getByRole("button", {
      name: "Complete investment",
    });
    expect(submitButton).not.toBeDisabled();
  });

  test("calls onSubmit with correct amount when the form is submitted", () => {
    const onSubmit = jest.fn();
    render(<InvestmentForm {...testProps} onSubmit={onSubmit} />);

    const amountInput = screen.getByLabelText("Amount");
    fireEvent.change(amountInput, { target: { value: 390 } });

    const submitButton = screen.getByRole("button", {
      name: "Complete investment",
    });
    fireEvent.click(submitButton);

    expect(onSubmit).toHaveBeenCalledWith(390);
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();
    render(<InvestmentForm {...testProps} onClose={onClose} />);

    const closeButton = screen.getByRole("button", {
      name: "Close investment form",
    });
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});
