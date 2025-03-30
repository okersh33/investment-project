import { Header } from "../components/Header/Header";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const Invest = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header page="Invest" />

        <main className="flex-grow p-6">
          <div className="max-w-7xl mx-auto">Invest</div>
        </main>
      </div>
    </div>
  );
};
