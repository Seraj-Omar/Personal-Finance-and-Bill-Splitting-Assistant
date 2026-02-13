import { Box, Button } from "@mui/material";
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
    <Box className="flex flex-col gap-2">
      {participants.map((p) => (
        <ParticipantItem
          key={p.id}
          name={p.name}
          initials={p.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
          color={p.color}
          amount={p.amount}
          isMe={p.isMe}
          onRemove={() => onRemove(p.id)}
          onClick={() => onSelectMe(p.id)}
        />
      ))}

      <Button
        variant="outlined"
        fullWidth
        onClick={onAdd}
        startIcon={<Plus size={16} />}
        className="border-dashed border-2 border-gray-300 text-gray-500 rounded-[12px] py-2 normal-case"
      >
        Add Participant
      </Button>
    </Box>
  );
}
