import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import { QuickActions } from "./QuickActions";

describe("QuickActions Component", () => {
  const renderComponent = () =>
    render(
      <BrowserRouter>
        <QuickActions />
      </BrowserRouter>
    );

  test("renders the widget without crashing", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: "Quick Actions" })
    ).toBeInTheDocument();
  });

  test("renders the New Investment action", () => {
    renderComponent();

    const newInvestmentLink = screen.getByRole("link", {
      name: "new-investment",
    });
    expect(newInvestmentLink).toBeInTheDocument();
    expect(newInvestmentLink).toHaveAttribute("href", "/invest");
  });

  test("renders the View Portfolio action", () => {
    renderComponent();

    const viewPortfolioLink = screen.getByRole("link", {
      name: "view-portfolio",
    });
    expect(viewPortfolioLink).toBeInTheDocument();
    expect(viewPortfolioLink).toHaveAttribute("href", "/portfolio");
  });

  test("renders the Account Settings action", () => {
    renderComponent();

    const accountSettingsLink = screen.getByRole("link", {
      name: "settings",
    });
    expect(accountSettingsLink).toBeInTheDocument();
    expect(accountSettingsLink).toHaveAttribute("href", "/settings");
  });
});
