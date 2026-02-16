"use client";

import React from 'react';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { PieChart } from '@mui/x-charts/PieChart';
import { useBudgets } from './hooks/useBudgets';

const data = [
  { label: 'Group A', value: 400, color: '#3146B6' },
  { label: 'Group B', value: 300, color: '#5E74E6' },
  { label: 'Group C', value: 300, color: '#F4B9C2' },
  { label: 'Group D', value: 200, color: '#E9A3AD' },
  { label: 'Savings', value: 250, color: '#6D7DFF' },
];

const total = data.reduce((sum, item) => sum + item.value, 0);

const OverreviewBudget = () => {

  const { data: budgetsRes, isLoading } = useBudgets();

const budgets = budgetsRes?.data ?? [];

const totalAllocated = budgets.reduce(
  (sum: number, b: any) => sum + Number(b.allocatedAmount),
  0
);

const totalSpent = budgets.reduce(
  (sum: number, b: any) => sum + Number(b.spentAmount),
  0
);

const availableBudget = totalAllocated - totalSpent;

  return (
    <Box>
      <Typography variant="h6" fontWeight={700}>
        Budget
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Created On: Dec 16, 2024
      </Typography>

      <Stack width="100%" height={300} position="relative" alignItems="center">
        <PieChart
          series={[
            {
              data,
              paddingAngle: 4,
              innerRadius: 80,
              outerRadius: 120,
              cornerRadius: 8,
            },
          ]}
          height={300}
          hideLegend
        />

        {/* ===== Center Content ===== */}
        <Stack
          position="absolute"
          top="50%"
          left="50%"
          alignItems="center"
          sx={{ transform: 'translate(-50%, -50%)' }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.84598 8.46135C12.1401 8.46135 13.9998 7.6348 13.9998 6.6152C13.9998 5.59559 12.1401 4.76904 9.84598 4.76904C7.55188 4.76904 5.69214 5.59559 5.69214 6.6152C5.69214 7.6348 7.55188 8.46135 9.84598 8.46135Z" stroke="#1F1E1F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M5.69214 6.61523V12.1537C5.69214 13.1691 7.53829 13.9999 9.84598 13.9999C12.1537 13.9999 13.9998 13.1691 13.9998 12.1537V6.61523" stroke="#1F1E1F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M13.9998 9.38477C13.9998 10.4002 12.1537 11.2309 9.84598 11.2309C7.53829 11.2309 5.69214 10.4002 5.69214 9.38477" stroke="#1F1E1F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M9.75385 2.93118C8.67522 2.26553 7.41969 1.94359 6.15385 2.0081C3.85538 2.0081 2 2.83887 2 3.85426C2 4.39887 2.53538 4.88811 3.38462 5.23887" stroke="#1F1E1F" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3.38462 10.7776C2.53538 10.4268 2 9.93757 2 9.39295V3.85449" stroke="#AFAFAF" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M3 .c .c .c .c .c .c .c .c .c .c .c .c .c .c .c " stroke="#AFAFAF" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

          <Typography variant="caption" color="text.secondary">
            $
          </Typography>
          <Typography variant="h5" fontWeight={800}>
{availableBudget.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Available Budget
          </Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        flexWrap="wrap"
        gap={1.5}
        mt={2}
      >
        {data.map((item) => {
          const percentage = Math.round((item.value / total) * 100);

          return (
            <Chip
              key={item.label}
              label={`${item.label} - ${percentage}%`}
              sx={{
                borderRadius: 2,
                border: '1px solid #eee',
                backgroundColor: '#fff',
                '&::before': {
                  content: '""',
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: item.color,
                  display: 'inline-block',
                  marginRight: '8px',
                },
              }}
            />
          );
        })}
      </Stack>
    </Box>
  );
};

export default OverreviewBudget;
