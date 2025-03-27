interface Props {
  userName: string;
  totalInvested: number;
}

export const InvestmentSummary: React.FC<Props> = ({
  userName,
  totalInvested,
}) => {
  return (
    <div className="bg-white rounded-lg shadow mb-8 overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Investment Summary
        </h2>
        <p className="text-gray-600">Welcome back, {userName}</p>
      </div>
      <div className="border-t border-gray-200 px-6 py-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total Invested</span>
          <span className="text-2xl font-bold text-teal-600">
            £
            {totalInvested.toLocaleString("en-GB", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};
