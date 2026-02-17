export const getSafeFilename = (htmlString) => {
  if (!htmlString) return "Draft";

  // 1. Parse HTML to get raw text
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  const rawText = tempDiv.textContent || tempDiv.innerText || "";

  // 2. Clean up for filename safety
  // - Trim whitespace
  return rawText.trim().replace(/[^a-z0-9\s-]/gi, ""); // Remove special chars except spaces/hyphens
};
