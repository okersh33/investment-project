import { useEffect, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { getUserInvestments } from "../services/api";
import { Investment, TopFundInvestment } from "../types/types";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Header } from "../components/Header/Header";
import { InvestmentSummary } from "../components/Widgets/InvestmentSummary/InvestmentSummary";
import { QuickActions } from "../components/Widgets/QuickActions/QuickActions";
import { mockFunds } from "../services/mockData";
import { TopInvestments } from "../components/Widgets/TopInvestments/TopInvestments";

export const Home = () => {
  const userAuth = useUserAuth();
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvestments = async () => {
      if (!userAuth.user) return;

      try {
        setIsLoading(true);
        const data = await getUserInvestments(userAuth.user.id);
        setInvestments(data);
      } catch (err) {
        setError("Failed to load your investments");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInvestments();
  }, [userAuth.user]);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const investmentsByFund = investments.reduce<Record<string, number>>(
    (acc, inv) => {
      if (!acc[inv.fund_id]) acc[inv.fund_id] = 0;
      acc[inv.fund_id] += inv.amount;
      return acc;
    },
    {}
  );

  const topFunds: TopFundInvestment[] = Object.entries(investmentsByFund)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([fundId, amount]) => ({
      fund: mockFunds.find((fund) => fund.id === fundId) || {
        id: fundId,
        name: fundId,
        description: "",
        risk: "Medium" as const,
        category: "",
      },
      amount,
    }));

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header page="Dashboard" />

        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="btn-loader mx-auto mb-4 w-8 h-8 border-4"></div>
                <p className="text-gray-600">Loading your investments...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            ) : (
              <>
                <InvestmentSummary
                  userName={userAuth.user?.name ?? ""}
                  totalInvested={totalInvested}
                />
                <TopInvestments topFunds={topFunds} />
                <QuickActions />
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
