"use client";
import React from "react";
import { Plus } from "lucide-react";
import ParticipantItem from "./ParticipantItem";

interface Participant {
  id: string;
  name: string;
  amount?: number;
  isMe?: boolean;
  color: string;
}

interface ParticipantListProps {
  participants: Participant[];
  onRemove: (id: string) => void;
  onSelectMe: (id: string) => void;
  onAdd: () => void;
}

export default function ParticipantList({
  participants,
  onRemove,
  onSelectMe,
  onAdd,
}: ParticipantListProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {participants.map((p) => (
        <div key={p.id} onClick={() => onSelectMe(p.id)} className="cursor-pointer">
          <ParticipantItem
            name={p.name}
            isMe={p.isMe}
            onDelete={(e: React.MouseEvent) => {
              e.stopPropagation(); 
              onRemove(p.id);
            }}
          />
        </div>
      ))}
      <button
        onClick={onAdd}
        className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-gray-300 text-gray-500 rounded-[12px] py-3 transition-all hover:bg-gray-50 hover:border-gray-400 active:scale-[0.98]"
      >
        <Plus size={16} />
        <span className="text-[14px] font-medium">Add Participant</span>
      </button>
    </div>
  );
}