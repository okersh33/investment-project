import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FundList } from "./FundList";
import { Fund, riskColors } from "../../../types/types";

const testFunds: Fund[] = [
  {
    id: "1",
    name: "High Risk Test Fund",
    description: "High risk fund used for testing",
    risk: "High",
    category: "testing",
  },
  {
    id: "2",
    name: "Balanced Network Test Fund",
    description: "Balanced risk fund used for testing",
    risk: "Medium",
    category: "testing",
  },
];

describe("FundList Widget", () => {
  const testProps = {
    funds: testFunds,
    isLoading: false,
    onSelectFund: jest.fn(),
    selectedFund: null,
    riskColors,
    filter: "all",
    searchTerm: "",
    onFilterChange: jest.fn(),
    onSearchChange: jest.fn(),
  };

  test("renders all funds without crashing when no filter is applied", () => {
    render(<FundList {...testProps} />);

    expect(screen.getByText("High Risk Test Fund")).toBeInTheDocument();
    expect(screen.getByText("Balanced Network Test Fund")).toBeInTheDocument();
  });

  test("applies risk level filter correctly", () => {
    render(<FundList {...testProps} filter="high" />);

    expect(screen.getByText("High Risk Test Fund")).toBeInTheDocument();
    expect(
      screen.queryByText("Balanced Network Test Fund")
    ).not.toBeInTheDocument();
  });

  test("filters funds by search term", () => {
    render(<FundList {...testProps} searchTerm="network" />);

    expect(screen.queryByText("High Risk Test Fund")).not.toBeInTheDocument();
    expect(screen.getByText("Balanced Network Test Fund")).toBeInTheDocument();
  });

  test("calls onSelectFund when a fund is clicked", () => {
    const onSelectFund = jest.fn();
    render(<FundList {...testProps} onSelectFund={onSelectFund} />);

    fireEvent.click(screen.getByText("High Risk Test Fund"));

    expect(onSelectFund).toHaveBeenCalledWith(testFunds[0]);
  });
});
