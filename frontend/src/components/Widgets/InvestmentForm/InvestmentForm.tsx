import { FormEvent, useState } from "react";
import { Fund } from "../../../types/types";
import { Button } from "../../Button/Button";
import { IoClose } from "react-icons/io5";

interface InvestmentFormProps {
  selectedFund: Fund;
  isSubmitting: boolean;
  onSubmit: (amount: number) => void;
  onClose: () => void;
}

export const InvestmentForm: React.FC<InvestmentFormProps> = ({
  selectedFund,
  isSubmitting,
  onSubmit,
  onClose,
}) => {
  const [investmentAmount, setInvestmentAmount] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (investmentAmount && parseFloat(investmentAmount) > 0) {
      onSubmit(parseFloat(investmentAmount));
      setInvestmentAmount("");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow mb-8 p-6 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
        aria-label="Close investment form"
      >
        <IoClose size={20} />
      </button>

      <h3 className="text-xl font-bold text-gray-900 mb-4 pr-8">
        Invest in {selectedFund.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Investment Amount (£)
          </label>
          <input
            id="amount"
            type="number"
            min="10"
            step="1"
            placeholder="Enter amount"
            className="rounded-md border-gray-300 px-3 py-2 w-full"
            value={investmentAmount}
            onChange={(e) => setInvestmentAmount(e.target.value)}
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            Minimum investment: £10.00
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Fund Details</h4>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Risk Level:</span> {selectedFund.risk}
          </p>
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Category:</span>{" "}
            {selectedFund.category}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Description:</span>{" "}
            {selectedFund.description}
          </p>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            disabled={isSubmitting || !investmentAmount}
            isLoading={isSubmitting}
            fullWidth
          >
            Complete Investment
          </Button>
        </div>
      </form>
    </div>
  );
};
