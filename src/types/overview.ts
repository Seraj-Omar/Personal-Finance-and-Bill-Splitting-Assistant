export type OverviewData = {
  id: string;
  label: string;
  value: number;
  changePercentage: number;
  trend: "UP" | "DOWN";
};

export interface OverviewProps {
  data: OverviewData[];
}