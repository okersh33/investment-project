import { Link } from "react-router-dom";
import { riskColors, TopFundInvestment } from "../../../types/types";

interface TopInvestmentsProps {
  topFunds: TopFundInvestment[];
}

export const TopInvestments: React.FC<TopInvestmentsProps> = ({ topFunds }) => {
  return (
    <div className="bg-white rounded-lg shadow mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your Top Investments
        </h2>

        {topFunds.length > 0 ? (
          <div className="space-y-4">
            {topFunds.map(({ fund, amount }) => (
              <div
                key={fund.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
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
                  <span className="font-bold text-teal-600">
                    £{amount.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">
              You haven't made any investments yet.
            </p>
            <Link
              to="/invest"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              Start Investing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
