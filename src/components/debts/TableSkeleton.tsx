"use client";

export default function TableSkeleton() {
  
  const skeletonRows = Array.from({ length: 3});
 
  const columnCount = 6; 

  return (
    <div className="w-full overflow-x-auto animate-pulse">
      <table className="w-full border-separate border-spacing-y-2 md:border-spacing-y-3 table-auto">
       
        <thead>
          <tr className="bg-[#F6F6F7]">
            {Array.from({ length: columnCount }).map((_, index) => (
              <th
                key={index}
                className={`
                  px-4 py-4 md:px-12 md:py-5
                  ${index === 0 ? "rounded-l-2xl md:rounded-l-3xl" : ""}
                  ${index === columnCount - 1 ? "rounded-r-2xl md:rounded-r-3xl" : ""}
                `}
              >
                <div className="h-3 bg-gray-200 rounded-full w-16"></div>
              </th>
            ))}
          </tr>
        </thead>

    
        <tbody>
          {skeletonRows.map((_, rowIndex) => (
            <tr key={rowIndex} className="bg-white">
              {Array.from({ length: columnCount }).map((_, colIndex) => (
                <td
                  key={colIndex}
                  className={`
                    px-4 py-3 md:px-10 md:py-5
                    ${colIndex === 0 ? "rounded-l-xl md:rounded-l-2xl" : ""}
                    ${colIndex === columnCount - 1 ? "rounded-r-xl md:rounded-r-2xl" : ""}
                  `}
                >
                  
                  {colIndex === 0 ? (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100"></div>
                      <div className="h-3 bg-gray-100 rounded-full w-20"></div>
                    </div>
                  ) : (
                    <div className="h-3 bg-gray-100 rounded-full w-full max-w-[100px]"></div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}