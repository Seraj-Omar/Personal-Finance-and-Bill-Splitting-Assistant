export type Bill = {
  id: string
  title: string
  value: number
  frequency: "Monthly" | "Weekly" | "Yearly"
  date: string
  active: boolean
}
