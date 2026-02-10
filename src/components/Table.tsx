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
      <table
        className="w-full border-separate border-spacing-y-3 table-fixed"
      >
        {/* Header */}
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col, index) => (
              <th
                key={col.key}
                className={`
                  px-12 py-3 text-left text-sm font-medium text-gray-500
                  ${index === 0 ? "rounded-l-3xl" : ""}
                  ${index === columns.length - 1 ? "rounded-r-3xl" : ""}
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
              className="bg-white  hover:bg-gray-50"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={col.key}
                  className={`
                    px-10 py-3 text-sm truncate
                    ${colIndex === 0 ? "rounded-l-2xl" : ""}
                    ${colIndex === columns.length - 1 ? "rounded-r-2xl" : ""}
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
