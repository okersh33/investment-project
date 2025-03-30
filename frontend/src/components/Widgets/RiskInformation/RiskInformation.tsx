import { riskColors } from "../../../types/types";

export const RiskInformation: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Understanding Investment Risk
      </h3>
      <div className="space-y-4">
        <div className="flex items-center">
          <div className="w-16 text-center">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${riskColors.Low}`}
            >
              Low
            </span>
          </div>
          <p className="ml-4 text-gray-600">
            Lower potential returns but more stability and a reduced risk of
            money loss.
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-16 text-center">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${riskColors.Medium}`}
            >
              Medium
            </span>
          </div>
          <p className="ml-4 text-gray-600">
            Balanced approach with moderate potential returns and risk.
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-16 text-center">
            <span
              className={`inline-block px-2 py-1 rounded text-xs font-medium ${riskColors.High}`}
            >
              High
            </span>
          </div>
          <p className="ml-4 text-gray-600">
            Higher potential returns but greater volatility and higher risk of
            losing the investment.
          </p>
        </div>
      </div>
    </div>
  );
};
