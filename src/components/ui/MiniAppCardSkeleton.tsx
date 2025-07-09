// src/components/ui/MiniAppCardSkeleton.tsx

export const MiniAppCardSkeleton = () => {
    return (
      <div className="w-full max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-3 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="p-4 flex items-start space-x-4">
          <div className="w-16 h-16 rounded-lg bg-gray-300 dark:bg-gray-600"></div>
          <div className="flex-grow space-y-2">
            <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
        <div className="px-4 space-y-2">
            <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="p-4 mt-2">
            <div className="h-10 w-full bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
      </div>
    );
  };
