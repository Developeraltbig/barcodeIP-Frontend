import { Paragraph, TextRun, HeadingLevel, AlignmentType } from "docx";

export const htmlToDocxParagraphs = (htmlContent) => {
  if (!htmlContent) return [];
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlContent;

  const paragraphs = [];

  // Recursive function to process nodes
  const processNode = (node, listLevel = 0, isOrdered = false) => {
    // 1. TEXT / PARAGRAPHS
    if (node.nodeName === "P" || node.nodeName === "#text") {
      const text = node.textContent.trim();
      if (text) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: text, size: 24 })],
            spacing: { after: 200 },
            alignment: AlignmentType.JUSTIFIED,
          })
        );
      }
    }

    // 2. HEADINGS
    else if (["H1", "H2", "H3", "H4"].includes(node.nodeName)) {
      const text = node.textContent.trim();
      if (text) {
        paragraphs.push(
          new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_3,
            spacing: { before: 400, after: 200 },
          })
        );
      }
    }

    // 3. LIST ITEMS (LI)
    else if (node.nodeName === "LI") {
      let liText = "";

      // Extract direct text children first (e.g. "Primary Features:")
      node.childNodes.forEach((child) => {
        if (
          child.nodeName === "#text" ||
          child.nodeName === "STRONG" ||
          child.nodeName === "B"
        ) {
          liText += child.textContent;
        }
      });

      liText = liText.trim();

      if (liText) {
        paragraphs.push(
          new Paragraph({
            text: liText,
            bullet: { level: listLevel }, // Indentation level based on recursion depth
            spacing: { after: 100 },
          })
        );
      }

      // Process nested lists (UL/OL inside LI)
      node.childNodes.forEach((child) => {
        if (child.nodeName === "UL" || child.nodeName === "OL") {
          processNode(child, listLevel + 1, child.nodeName === "OL");
        }
      });
    }

    // 4. LIST CONTAINERS (UL/OL)
    else if (node.nodeName === "UL" || node.nodeName === "OL") {
      Array.from(node.children).forEach((child) => {
        processNode(child, listLevel, node.nodeName === "OL");
      });
    }
  };

  // Start processing from root children
  Array.from(tempDiv.childNodes).forEach((node) => processNode(node));

  return paragraphs;
};
