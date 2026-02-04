"use client";

import { Box, Button, Typography } from "@mui/material";
import { Check, AlertTriangle } from "lucide-react";

type Variant = "success" | "warning";

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: Variant;
  onConfirm: () => void;
  onClose: () => void;
}

const VARIANT_CONFIG = {
  success: {
    icon: Check,
    bg: "#16C087",
  },
  warning: {
    icon: AlertTriangle,
    bg: "#FACC15",
  },
};

export default function ConfirmationModal({
  open,
  title,
  description = "This action will update the payment status.",
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "success",
  onConfirm,
  onClose,
}: Props) {
  if (!open) return null;

  const Icon = VARIANT_CONFIG[variant].icon;

  return (
    <Box className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/60">
      <Box
        sx={{
          width: 390,
          height: 318,
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          padding: "16px 16px 32px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "32px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Box
          sx={{
            width: 60,
            height: 100,
            borderRadius: "50%",
            backgroundColor: VARIANT_CONFIG[variant].bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 2,
          }}
        >
          <Icon size={36} color="#FFFFFF" />
        </Box>

        <Box textAlign="center">
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 700,
              color: "#111827",
              mb: 1,
            }}
          >
            {title}
          </Typography>

          {description && (
            <Typography
              sx={{
                fontSize: "14px",
                color: "#6B7280",
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <Box className="flex gap-4 w-full">
          <Button
            fullWidth
            variant="contained"
            onClick={onConfirm}
            sx={{
              backgroundColor: "#3F51B5",
              "&:hover": { backgroundColor: "#303F9F" },
              borderRadius: "12px",
              py: 1.6,
              textTransform: "none",
              fontWeight: 300,
              boxShadow: "none",
            }}
          >
            {confirmText}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            onClick={onClose}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 300,
              color: "#111827",
              borderColor: "#E5E7EB",
              "&:hover": {
                backgroundColor: "#F9FAFB",
                borderColor: "#D1D5DB",
              },
            }}
          >
            {cancelText}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
