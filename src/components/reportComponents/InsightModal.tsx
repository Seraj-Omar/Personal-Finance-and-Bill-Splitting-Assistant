import React from "react";
import { Insight } from "../../types/report/insight";
import { typeIcons } from "./icons/InsightIcons";

interface Props {
  insight: Insight;
  onClose: () => void;
}

export const InsightModal: React.FC<Props> = ({ insight, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 md:p-8 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">{insight.title}</h3>
          <button onClick={onClose} className="text-2xl text-gray-500 hover:text-gray-800">
            ×
          </button>
        </div>

        <div className="flex gap-3 mb-4 items-center">
          {typeIcons[insight.type]}
          <span className="text-[#707070]">{insight.message}</span>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};