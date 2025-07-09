// src/components/ui/NewsArticleCardSkeleton.tsx

export const NewsArticleCardSkeleton = () => {
    return (
      <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden my-4 border border-gray-200 dark:border-gray-700 animate-pulse">
        <div className="w-full h-40 bg-gray-300 dark:bg-gray-600"></div>
        <div className="p-4">
          <div className="h-3 w-1/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
          <div className="h-5 w-full bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
          <div className="h-4 w-5/6 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mt-4"></div>
        </div>
      </div>
    );
  };
