"use client";
 import Image from "next/image";
  export type Column<T> = {
     key: string;
      title: string;
       render?: (row: T) => React.ReactNode; 
    };
 type TableProps<T> = {
     columns: Column<T>[];
      data: T[]; 
    };
export default function Table<T>({ columns, data }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-separate border-spacing-y-2 md:border-spacing-y-3 table-auto">
        {/* Header */}
        <thead>
          <tr className="bg-[#F6F6F7]">
            {columns.map((col, index) => (
              <th
                key={col.key}
                className={`
                  px-4 py-2 md:px-12 md:py-3
                  text-left text-xs md:text-sm font-medium text-[#1C1A1A80]
                  ${index === 0 ? "rounded-l-2xl md:rounded-l-3xl" : ""}
                  ${index === columns.length - 1 ? "rounded-r-2xl md:rounded-r-3xl" : ""}
                `}
              >
                {col.title}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="bg-white hover:bg-gray-50"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={col.key}
                  className={`
                    px-4 py-2 md:px-10 md:py-3
                    text-xs md:text-sm truncate text-[#1C1A1A]
                    ${colIndex === 0 ? "rounded-l-xl md:rounded-l-2xl" : ""}
                    ${colIndex === columns.length - 1 ? "rounded-r-xl md:rounded-r-2xl" : ""}
                  `}
                >
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
