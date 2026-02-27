import { Insight } from "../../types/report/insight";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchInsights = async (): Promise<Insight[]> => {
  const token = sessionStorage.getItem("token");
  if (!token) return []; 

  try {
    const res = await fetch(`${API_BASE_URL}/financial-reports`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch insights");

    const result = await res.json();
    const report = result.data;

    if (!report?.insights?.length) return [];

    const insights: Insight[] = report.insights.map((i: any) => ({
      id: i.id,
      type: i.type as Insight["type"],
      title: i.title,
      message: i.message,
      isRead: i.isRead,
    }));

    const typePriority: Record<string, number> = {
      DANGER: 1,
      WARNING: 2,
      SUCCESS: 3,
    };

    return insights.sort((a, b) => {
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
      return (typePriority[a.type] || 4) - (typePriority[b.type] || 4);
    });
  } catch (err) {
    console.error("Error fetching insights:", err);
    return [];
  }
};