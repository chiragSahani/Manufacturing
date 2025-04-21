import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Sample data for AI models
export const productionData = {
  machines: {
    "Machine A": {
      efficiency: 95,
      downtime: 45,
      defects: 27,
      operator: "John Doe",
      totalProduction: 912,
    },
    "Machine B": {
      efficiency: 88,
      downtime: 30,
      defects: 35,
      operator: "Jane Smith",
      totalProduction: 845,
    },
    "Machine C": {
      efficiency: 94,
      downtime: 15,
      defects: 18,
      operator: "Robert Johnson",
      totalProduction: 902,
    },
    "Machine D": {
      efficiency: 87,
      downtime: 10,
      defects: 42,
      operator: "Sarah Williams",
      totalProduction: 835,
    },
  },
  operators: {
    "John Doe": {
      machines: ["Machine A"],
      efficiency: 95,
      totalProduction: 912,
      defects: 27,
    },
    "Jane Smith": {
      machines: ["Machine B"],
      efficiency: 88,
      totalProduction: 845,
      defects: 35,
    },
    "Robert Johnson": {
      machines: ["Machine C"],
      efficiency: 94,
      totalProduction: 902,
      defects: 18,
    },
    "Sarah Williams": {
      machines: ["Machine D"],
      efficiency: 87,
      totalProduction: 835,
      defects: 42,
    },
  },
  downtimePredictions: {
    "Machine A": { risk: 78, nextMaintenance: "2025-04-25" },
    "Machine B": { risk: 45, nextMaintenance: "2025-04-28" },
    "Machine C": { risk: 12, nextMaintenance: "2025-05-10" },
    "Machine D": { risk: 8, nextMaintenance: "2025-05-15" },
  },
  anomalies: [
    {
      machine: "Machine B",
      issue: "Output Drop",
      severity: "High",
      details: "30% drop detected at 11:00 AM",
    },
    {
      operator: "Jane Smith",
      issue: "Performance",
      severity: "Medium",
      details: "15% below 30-day average",
    },
    {
      product: "X-123",
      issue: "Quality",
      severity: "Medium",
      details: "Defect rate 2.5x higher than normal",
    },
  ],
}

// AI prediction model (simplified)
export function predictDowntimeRisk(machine: string): number {
  const machineData = productionData.downtimePredictions[machine as keyof typeof productionData.downtimePredictions]
  return machineData ? machineData.risk : 0
}

// Anomaly detection (simplified)
export function detectAnomalies(data: any): any[] {
  return productionData.anomalies
}

// Production efficiency calculation
export function calculateEfficiency(actual: number, target: number): number {
  return Math.round((actual / target) * 100)
}
