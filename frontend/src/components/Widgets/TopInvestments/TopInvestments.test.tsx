import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { TopInvestments } from "./TopInvestments";
import { riskColors, TopFundInvestment } from "../../../types/types";

describe("TopInvestments Widget", () => {
  const mockTopFunds: TopFundInvestment[] = [
    {
      fund: {
        id: "1",
        name: "High Risk Test Fund",
        description: "High risk fund used for testing",
        risk: "High",
        category: "testing",
      },
      amount: 150000,
    },
    {
      fund: {
        id: "2",
        name: "Balanced Network Test Fund",
        description: "Balanced risk fund used for testing",
        risk: "Medium",
        category: "testing",
      },
      amount: 33333,
    },
  ];

  const renderComponent = (topFunds: TopFundInvestment[] = []) =>
    render(
      <BrowserRouter>
        <TopInvestments topFunds={topFunds} />
      </BrowserRouter>
    );

  test("renders the widget without crashing", () => {
    renderComponent();
    expect(
      screen.getByRole("heading", { name: /your top investments/i })
    ).toBeInTheDocument();
  });

  test("renders the list of top funds when available", () => {
    renderComponent(mockTopFunds);

    expect(screen.getByText("High Risk Test Fund")).toBeInTheDocument();
    expect(screen.getByText("£150,000")).toBeInTheDocument();

    expect(screen.getByText("Balanced Network Test Fund")).toBeInTheDocument();
    expect(screen.getByText("£33,333")).toBeInTheDocument();
  });

  test("applies correct risk colors for each fund", () => {
    renderComponent(mockTopFunds);

    const highRiskBadge = screen.getByText("High Risk");
    expect(highRiskBadge).toHaveClass(riskColors.High);

    const mediumRiskBadge = screen.getByText("Medium Risk");
    expect(mediumRiskBadge).toHaveClass(riskColors.Medium);
  });

  test("renders a message when no investments are available", () => {
    renderComponent([]);

    expect(
      screen.getByText("You haven't made any investments yet.")
    ).toBeInTheDocument();

    const startInvestingLink = screen.getByRole("link", {
      name: "Start Investing",
    });
    expect(startInvestingLink).toBeInTheDocument();
    expect(startInvestingLink).toHaveAttribute("href", "/invest");
  });
});
