import React from 'react';

const PurchaseNumberModalSkeleton = () => {
  return (
    <div className="p-4">
      <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
        <div className="bg-gray-100 rounded-xl shadow-xl max-w-sm w-full p-6 relative animate-pulse">
          <div className="h-6 bg-gray-300 rounded mb-6 mx-auto w-1/2"></div>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="bg-gray-300 h-4 w-20 rounded"></span>
              <span className="bg-gray-300 h-4 w-24 rounded"></span>
            </div>

            <div className="flex justify-between">
              <span className="bg-gray-300 h-4 w-20 rounded"></span>
              <span className="bg-gray-300 h-4 w-24 rounded"></span>
            </div>

            <div className="flex justify-between items-center">
              <span className="bg-gray-300 h-4 w-20 rounded"></span>
              <span className="bg-gray-300 h-4 w-32 rounded"></span>
            </div>

            <div className="flex justify-between">
              <span className="bg-gray-300 h-4 w-20 rounded"></span>
              <span className="bg-gray-300 h-4 w-24 rounded"></span>
            </div>

            <div className="flex justify-between items-center">
              <span className="bg-gray-300 h-4 w-20 rounded"></span>
              <span className="bg-gray-300 h-4 w-24 rounded"></span>
            </div>
          </div>

          <div className="mt-6 bg-gray-300 h-10 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseNumberModalSkeleton;
