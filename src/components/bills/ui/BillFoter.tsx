import { Box, Button } from "@mui/material";
import React from "react";

function BillFoter({ onClose }: { onClose: () => void }) {
  return (
    <Box className="flex gap-4 mt-4">
      <Button
        fullWidth
        variant="contained"
        sx={{
          backgroundColor: "#3F51B5",
          "&:hover": { backgroundColor: "#303F9F" },
          borderRadius: "12px",
          py: 1.6,
          textTransform: "none",
          fontWeight: 700,
          boxShadow: "none",
        }}
      >
        Save Expense
      </Button>

      <Button
        fullWidth
        variant="outlined"
        onClick={onClose}
        sx={{
          borderColor: "#3F51B5",
          color: "#3F51B5",
          "&:hover": {
            borderColor: "#303F9F",
            backgroundColor: "#F5F7FF",
          },
          borderRadius: "12px",
          py: 1.6,
          textTransform: "none",
          fontWeight: 700,
        }}
      >
        Cancel
      </Button>
    </Box>
  );
}

export default BillFoter;
