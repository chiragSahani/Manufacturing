import { productionData } from "./utils"

// Downtime prediction model
export async function predictDowntime(machineId: string): Promise<{
  risk: number
  nextFailureEstimate: string
  recommendations: string[]
}> {
  // In a real implementation, this would use a trained ML model
  // Here we're using sample data for demonstration
  const machines = productionData.downtimePredictions
  const machine = machines[machineId as keyof typeof machines]

  if (!machine) {
    return {
      risk: 0,
      nextFailureEstimate: "Unknown",
      recommendations: ["No data available for this machine"],
    }
  }

  let recommendations: string[] = []

  if (machine.risk > 70) {
    recommendations = [
      "Schedule immediate preventive maintenance",
      "Check for unusual vibration patterns",
      "Inspect lubrication systems",
    ]
  } else if (machine.risk > 40) {
    recommendations = [
      "Plan maintenance within the next week",
      "Monitor machine performance closely",
      "Review recent maintenance history",
    ]
  } else {
    recommendations = ["Continue with regular maintenance schedule", "No immediate action required"]
  }

  return {
    risk: machine.risk,
    nextFailureEstimate: machine.nextMaintenance,
    recommendations,
  }
}

// Anomaly detection model
export async function detectAnomalies(data: any): Promise<{
  anomalies: Array<{
    type: string
    severity: string
    details: string
    recommendations: string[]
  }>
}> {
  // In a real implementation, this would use an anomaly detection algorithm
  // Here we're using sample data for demonstration
  const anomalies = productionData.anomalies.map((anomaly) => {
    let type = ""
    let recommendations: string[] = []

    if (anomaly.machine) {
      type = "Machine"
      recommendations = [
        "Inspect machine for mechanical issues",
        "Check recent maintenance records",
        "Review operator logs for the shift",
      ]
    } else if (anomaly.operator) {
      type = "Operator"
      recommendations = [
        "Review operator training status",
        "Check if operator is assigned to unfamiliar tasks",
        "Consider additional training or support",
      ]
    } else if (anomaly.product) {
      type = "Product"
      recommendations = [
        "Inspect material quality from recent batches",
        "Review product specifications",
        "Check tooling and fixtures for the product",
      ]
    }

    return {
      type,
      severity: anomaly.severity,
      details: anomaly.details,
      recommendations,
    }
  })

  return { anomalies }
}

// AI assistant query processor
export async function processQuery(query: string): Promise<string> {
  // In a real implementation, this would use an NLP model or LLM
  // Here we're using simple keyword matching for demonstration

  const lowerQuery = query.toLowerCase()

  if (lowerQuery.includes("defect") && lowerQuery.includes("machine")) {
    return `
      Defects by machine for today:
      - Machine A: 27 defects (2.9% defect rate)
      - Machine B: 35 defects (4.1% defect rate)
      - Machine C: 18 defects (2.0% defect rate)
      - Machine D: 42 defects (5.0% defect rate)
      
      Machine D has the highest defect rate and should be investigated.
    `
  }

  if (lowerQuery.includes("jane smith") && lowerQuery.includes("produce")) {
    return `
      Jane Smith produced 845 units during her last shift on Machine B.
      This is 88% of the target (960 units) and includes 35 defective units.
      Her performance is 15% below her 30-day average.
    `
  }

  if (lowerQuery.includes("downtime") && lowerQuery.includes("machine a")) {
    return `
      Machine A has a 78% risk of downtime in the next 48 hours.
      This prediction is based on:
      - Unusual vibration patterns detected
      - 45 minutes of downtime already today
      - Historical failure patterns
      
      Recommended action: Schedule preventive maintenance immediately.
    `
  }

  if (lowerQuery.includes("highest efficiency")) {
    return `
      Machine A currently has the highest efficiency at 95%.
      Operated by John Doe, it has produced 912 units today (95% of target).
      The machine has had 45 minutes of downtime, primarily for scheduled maintenance.
    `
  }

  if (lowerQuery.includes("anomal")) {
    return `
      3 anomalies detected today:
      
      1. Machine B Output Drop (High Severity)
         30% drop detected at 11:00 AM. Maintenance check recommended.
      
      2. Jane Smith Performance (Medium Severity)
         Efficiency is 15% below her 30-day average.
      
      3. Product X-123 Quality Issue (Medium Severity)
         Defect rate is 2.5x higher than normal across all machines.
    `
  }

  return `I don't have specific information about that query. You can ask about machine performance, operator output, downtime predictions, or detected anomalies.`
}
