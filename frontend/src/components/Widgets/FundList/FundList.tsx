import { Button } from "../../Button/Button";
import { Fund } from "../../../types/types";

interface FundListProps {
  funds: Fund[];
  selectedFund: Fund | null;
  filter: string;
  searchTerm: string;
  isLoading?: boolean;
  riskColors: Record<string, string>;
  onFilterChange: (filter: string) => void;
  onSearchChange: (search: string) => void;
  onSelectFund: (fund: Fund) => void;
}

export const FundList: React.FC<FundListProps> = ({
  funds,
  selectedFund,
  filter,
  searchTerm,
  isLoading = false,
  riskColors,
  onFilterChange,
  onSearchChange,
  onSelectFund,
}) => {
  const filteredFunds = funds.filter((fund) => {
    const matchesRisk =
      filter === "all" || fund.risk.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fund.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRisk && matchesSearch;
  });

  return (
    <div className="bg-white rounded-lg shadow mb-8 p-6">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6">
        <div>
          <label
            htmlFor="risk-filter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Filter by Risk
          </label>
          <select
            id="risk-filter"
            className="rounded-md border-gray-300 px-3 py-2 w-full sm:w-auto"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
          >
            <option value="all">All Risk Levels</option>
            <option value="low">Low Risk</option>
            <option value="medium">Medium Risk</option>
            <option value="high">High Risk</option>
          </select>
        </div>

        <div className="flex-grow">
          <label
            htmlFor="fund-search"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Search Funds
          </label>
          <input
            id="fund-search"
            type="text"
            placeholder="Search by name, description or category..."
            className="rounded-md border-gray-300 px-3 py-2 w-full"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">
          <div className="btn-loader mx-auto mb-4 w-8 h-8 border-4"></div>
          <p className="text-gray-600">Loading available funds...</p>
        </div>
      ) : filteredFunds.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">No funds match your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredFunds.map((fund) => (
            <div
              key={fund.id}
              className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer ${
                selectedFund?.id === fund.id ? "border-teal-500 bg-gray-50" : ""
              }`}
              onClick={() => onSelectFund(fund)}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{fund.name}</h3>
                <div
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    riskColors[fund.risk]
                  }`}
                >
                  {fund.risk} Risk
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{fund.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">{fund.category}</span>
                <Button
                  variant="secondary"
                  className="text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectFund(fund);
                  }}
                >
                  {selectedFund?.id === fund.id ? "Selected" : "Select"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
