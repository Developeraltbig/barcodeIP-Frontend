export const PRODUCTS_DATA = [
  {
    id: 1,
    name: "Samsung Galaxy Watch 6",
    brand: "Samsung",
    icon: "S",
    stats: { found: 8, partial: 1, notFound: 2 },
    color: "#10b981",
    priority: "Medium Risk Replacement",
    summary: "The Samsung Galaxy Watch 6 demonstrates high alignment in data processing logic, but reveals a significant gap in hardware flexibility. While the invention utilizes a fabric-based energy harvesting system, this product remains tethered to a rigid lithium-ion architecture.",
    features: [
      { id: "01", title: "Flexible Thermoelectric Module", status: "NOT FOUND", analysis: "Powered by conventional rigid Li-ion battery (425mAh). No heat-to-electricity conversion.", evidence: "Battery spec: 'Li-Ion 425 mAh'. Requires external wireless charging.", sources: [2, 6, 7] },
      { id: "02", title: "Skutterudite Heat Materials", status: "NOT FOUND", analysis: "Does not utilize Skutterudite. Built with standard sapphire and stainless steel.", evidence: "Chassis is 'Stainless Steel'. No thermoelectric properties in build materials.", sources: [2, 5, 7] },
      { id: "03", title: "Multiple Biosensors", status: "FOUND", analysis: "Fully implements real-time monitoring via BioActive sensor suite.", evidence: "Includes Accelerometer, ECG, and Bioelectrical Impedance Analysis.", sources: [2, 3, 6] }
    ]
  },
  {
    id: 2,
    name: "Whoop 4.0",
    brand: "Whoop",
    icon: "W",
    stats: { found: 8, partial: 9, notFound: 2 },
    color: "#6366f1",
    priority: "Low Risk Alternative",
    summary: "Whoop 4.0 excels in biosensor integration but lacks any self-powering thermal capabilities defined in the patent.",
    features: [
      { id: "01", title: "Flexible Thermoelectric Module", status: "NOT FOUND", analysis: "Battery is strictly chemical-based.", evidence: "Proprietary battery pack required for daily charging.", sources: [1, 4] },
      { id: "03", title: "Multiple Biosensors", status: "FOUND", analysis: "Industry-leading heart rate and skin temp monitoring.", evidence: "5 LED, 4 photodiode sensor array.", sources: [1, 5] }
    ]
  },
  {
    id: 3,
    name: "Whoop 4.0",
    brand: "Whoop",
    icon: "W",
    stats: { found: 3, partial: 1, notFound: 2 },
    color: "#6366f1",
    priority: "Low Risk Alternative",
    summary: "Whoop 4.0 excels in biosensor integration but lacks any self-powering thermal capabilities defined in the patent.",
    features: [
      { id: "01", title: "Flexible Thermoelectric Module", status: "PARTIAL", analysis: "Battery is strictly chemical-based.", evidence: "Proprietary battery pack required for daily charging.", sources: [1, 4] },
      { id: "03", title: "Multiple Biosensors", status: "FOUND", analysis: "Industry-leading heart rate and skin temp monitoring.", evidence: "5 LED, 4 photodiode sensor array.", sources: [1, 5] }
    ]
  },
  {
    id: 4,
    name: "Whoop 5.3",
    brand: "Whoop",
    icon: "W",
    stats: { found: 3, partial: 1, notFound: 2 },
    color: "#6366f1",
    priority: "Low Risk Alternative",
    summary: "Whoop 4.0 excels in biosensor integration but lacks any self-powering thermal capabilities defined in the patent.",
    features: [
      { id: "01", title: "Flexible Thermoelectric Module", status: "PARTIAL", analysis: "Battery is strictly chemical-based.", evidence: "Proprietary battery pack required for daily charging.", sources: [1, 4, 8] },
      { id: "03", title: "Multiple Biosensors", status: "FOUND", analysis: "Industry-leading heart rate and skin temp monitoring.", evidence: "5 LED, 4 photodiode sensor array.", sources: [1, 5] },
      { id: "04", title: "Multiple Biosensors", status: "NOT FOUND", analysis: "Industry-leading heart rate and skin temp monitoring.", evidence: "5 LED, 4 photodiode sensor array.", sources: [1, 5] }
    ]
  }
];

// export const ADDITIONAL_PRODUCTS = [
//   { name: "Apple Watch Ultra 2", brand: "Apple", score: 7.9, desc: "Premium smartwatch with advanced ECG and SpO2 sensors." },
//   { name: "Oura Ring Gen3", brand: "Oura", score: 6.5, desc: "Finger-worn device with temperature and SpO2 sensing." },
//   { name: "Xenoma e-skin", brand: "Xenoma", score: 4.5, desc: "Smart shirt with textile ECG and motion capture sensors." }
// ];