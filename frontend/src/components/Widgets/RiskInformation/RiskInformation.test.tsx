import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { RiskInformation } from "./RiskInformation";
import { riskColors } from "../../../types/types";

describe("RiskInformation Widget", () => {
  test("renders the widget without crashing", () => {
    render(<RiskInformation />);
    expect(
      screen.getByRole("heading", { name: "Understanding Investment Risk" })
    ).toBeVisible();
  });

  test("renders all risk levels with descriptions", () => {
    render(<RiskInformation />);

    expect(screen.getByText("Low")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lower potential returns but more stability and a reduced risk of money loss."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("Medium")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Balanced approach with moderate potential returns and risk."
      )
    ).toBeInTheDocument();

    expect(screen.getByText("High")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Higher potential returns but greater volatility and higher risk of losing the investment."
      )
    ).toBeInTheDocument();
  });

  test("applies correct colors for each risk level", () => {
    render(<RiskInformation />);

    const lowRisk = screen.getByText("Low");
    expect(lowRisk).toHaveClass(riskColors.Low);

    const mediumRisk = screen.getByText("Medium");
    expect(mediumRisk).toHaveClass(riskColors.Medium);

    const highRisk = screen.getByText("High");
    expect(highRisk).toHaveClass(riskColors.High);
  });
});
