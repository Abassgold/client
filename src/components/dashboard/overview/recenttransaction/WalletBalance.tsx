import React from 'react'
interface walletbalanceType{ 
        balance: number;
        isVisible: boolean;
         onToggle: () => void;
        }

const WalletBalance = ({ balance, isVisible, onToggle }: walletbalanceType) => {
return (
    <div className="mb-2 sm:mb-4">
      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Wallet Balance</h4>
      <div className="flex items-center space-x-2">
        <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-teal-600">
          {isVisible ? `$${balance.toFixed(2)}` : "****"}
        </p>
        <button
          onClick={onToggle}
          className="text-gray-500 hover:text-gray-700 text-sm sm:text-base"
        >
          {isVisible ? "👁️ Hide" : "👁️ Show"}
        </button>
      </div>
    </div>
  );
}

export default WalletBalance