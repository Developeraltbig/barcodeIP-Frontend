// import { jsPDF } from "jspdf";

export const downloadCasePDF = (item) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(`Case ID: ${item.id}`, 10, 20);
  
  doc.setFontSize(10);
  doc.text(`User: ${item.user}`, 10, 30);
  doc.text(`Date: ${item.date}`, 10, 37);
  
  doc.setLineWidth(0.5);
  doc.line(10, 42, 200, 42);

  doc.setFontSize(12);
  const splitContent = doc.splitTextToSize(item.content, 180);
  doc.text(splitContent, 10, 52);
  
  doc.save(`Case_Report_${item.id}.pdf`);
};