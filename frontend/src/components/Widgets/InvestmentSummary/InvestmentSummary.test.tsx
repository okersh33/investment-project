import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { InvestmentSummary } from "./InvestmentSummary";

describe("InvestmentSummary Component", () => {
  test("renders the component without crashing", () => {
    render(
      <InvestmentSummary userName="Vincent Van Gogh" totalInvested={3333} />
    );

    expect(
      screen.getByRole("heading", { name: "Investment Summary" })
    ).toBeInTheDocument();
  });

  test("displays the correct user name", () => {
    render(
      <InvestmentSummary userName="Vincent Van Gogh" totalInvested={10000} />
    );

    expect(
      screen.getByText("Welcome back, Vincent Van Gogh")
    ).toBeInTheDocument();
  });

  test("displays the correct total invested amount", () => {
    render(
      <InvestmentSummary userName="Vincent Van Gogh" totalInvested={3333} />
    );

    expect(screen.getByText("£3,333")).toBeInTheDocument();
  });
});
