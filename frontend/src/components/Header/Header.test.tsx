import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Header } from "./Header";

describe("Header Component", () => {
  test("renders without crashing and the correct page title", () => {
    const testPage = "Dashboard";
    render(<Header page={testPage} />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(testPage);
  });

  test("applies the correct styling classes", () => {
    render(<Header page="Invest" />);

    const header = screen.getByRole("banner");
    expect(header).toHaveClass("bg-white");
    expect(header).toHaveClass("shadow");

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveClass("text-3xl");
    expect(heading).toHaveClass("font-bold");
    expect(heading).toHaveClass("text-gray-900");
  });
});
