"use client";

import React, { useState } from "react";
import { Container, Box } from "@mui/material";

import PadgetComponent from "./PadgetComponent";
import OverreviewBudget from "./OverreviewBudget";
import BudgetSummary from "./BudgetSummary";
import SpendingOverviewChart from "./SpendingOverviewChart";
import AiBudgetSuggestions from "./AiBudgetSuggestions";
import TableBudget from "./TableBudget";
import ManageExpenses from "./ManageExpenses";

export type FilterType = "All" | "Paid" | "Unpaid" | "Overdue";

const Budget = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");

  return (
<Container
  maxWidth={false}
  disableGutters
  sx={{
    py: 5,
    px: { xs: "10px", sm: "12px", md: "16px", lg: "100px" }, // خليها 10 حتى على lg
  }}
>

      <PadgetComponent />

      <Box
        sx={{
          display: "flex",
                flexDirection: { xs: "column", md: "row" },

          gap: 5,
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          p: 4,
          borderRadius: 4,
          mt: 4,
        }}
      >
        <Box
          sx={{
            flex: 5,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <OverreviewBudget />

          <BudgetSummary totalBudget={5000} totalExpenses={3500} currency="$" />
        </Box>

        <Box
          sx={{
            flex: 7,
            minHeight: 300,
            borderRadius: 4,
            border: "1px dashed #e0e0e0",
          }}
        >
          <SpendingOverviewChart />
          <AiBudgetSuggestions />
        </Box>
      </Box>

      <Box
        sx={{
          mt: 5,
        }}
      >
        <TableBudget activeFilter={activeFilter} onChange={setActiveFilter} filter={activeFilter}/>
      </Box>

      <Box sx={{       mt: 5,}} ><ManageExpenses /></Box>
    </Container>
  );
};

export default Budget;
