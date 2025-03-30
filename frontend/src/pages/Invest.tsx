import { useState } from "react";
import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Feedback } from "../components/Feedback/Feedback";
import { useUserAuth } from "../hooks/useUserAuth";
import { Fund, CreateInvestmentRequest, riskColors } from "../types/types";
import { createInvestment } from "../services/api";
import { mockFunds } from "../services/mockData";
import { FundList } from "../components/Widgets/FundList/FundList";
import { InvestmentForm } from "../components/Widgets/InvestmentForm/InvestmentForm";
import { RiskInformation } from "../components/Widgets/RiskInformation/RiskInformation";

export const Invest = () => {
  const userAuth = useUserAuth();
  const [error, setError] = useState<string | null>(null);
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleInvestmentSubmit = async (amount: number) => {
    if (!selectedFund) {
      setError("Please select a fund first");
      return;
    }
    if (!userAuth.user) {
      setError("You must be logged in to invest");
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const investment: CreateInvestmentRequest = {
        user_id: userAuth.user.id,
        fund_id: selectedFund.id,
        amount: amount,
      };
      await createInvestment(investment);
      setSuccess(
        `£${amount.toLocaleString()} successfully invested in ${selectedFund.name}`
      );

      setSelectedFund(null);
    } catch (err) {
      setError(
        "Sorry, we couldn't process your investment right now. Please try again."
      );
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header page="Invest" />

        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-lg shadow mb-8 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Grow your investments with Ancore
              </h2>
              <p className="text-gray-600">
                Browse our range of investment funds below and start or continue
                building your portfolio. We've highlighted the risk level for
                each option to help you make the right choice for your future.
              </p>
            </div>

            {success && (
              <div className="mb-8">
                <Feedback type="success" message={success} />
              </div>
            )}

            {error && (
              <div className="mb-8">
                <Feedback type="error" message={error} />
              </div>
            )}

            {selectedFund && (
              <InvestmentForm
                selectedFund={selectedFund}
                isSubmitting={isSubmitting}
                onSubmit={handleInvestmentSubmit}
                onClose={() => setSelectedFund(null)}
              />
            )}

            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900">
                {selectedFund
                  ? "Browse other investment options"
                  : "Choose where to invest"}
              </h3>
            </div>

            <FundList
              funds={mockFunds}
              selectedFund={selectedFund}
              filter={filter}
              searchTerm={searchTerm}
              riskColors={riskColors}
              onFilterChange={setFilter}
              onSearchChange={setSearchTerm}
              onSelectFund={setSelectedFund}
            />

            <RiskInformation />
          </div>
        </main>
      </div>
    </div>
  );
};
