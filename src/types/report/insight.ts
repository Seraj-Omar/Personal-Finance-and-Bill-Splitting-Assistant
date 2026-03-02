export interface Insight {
  id: string;
  type: "DANGER" | "WARNING" | "SUCCESS";
  title: string;
  message: string;
  isRead: boolean;
}