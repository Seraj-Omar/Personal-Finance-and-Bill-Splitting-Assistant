import { Box, IconButton, TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MicNoneIcon from "@mui/icons-material/MicNone";

export default function ChatInput({
  input,
  setInput,
  canSend,
  onSend,
}: {
  input: string;
  setInput: (v: string) => void;
  canSend: boolean;
  onSend: (text: string) => void;
}) {
  return (
    <Box sx={{ p: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
      <IconButton size="small">
        <AddIcon />
      </IconButton>

      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask AI Anything..."
        fullWidth
        size="small"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (canSend) onSend(input);
          }
        }}
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: 999 },
        }}
      />

      <IconButton size="small">
        <MicNoneIcon />
      </IconButton>

      <Button
        variant="contained"
        disabled={!canSend}
        onClick={() => onSend(input)}
        sx={{ borderRadius: 999, textTransform: "none" }}
      >
        Send
      </Button>
    </Box>
  );
}
