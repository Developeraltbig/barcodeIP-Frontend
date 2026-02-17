import plantumlEncoder from "plantuml-encoder";

export const getPlantUmlImageUrl = (plantUmlCode) => {
  if (!plantUmlCode) {
    return null;
  }

  try {
    // 1. Clean the code
    let cleanCode = plantUmlCode
      .replace(/```(?:plantuml|uml)?/g, "")
      .replace(/```/g, "")
      .trim();

    // 2. Ensure @startuml and @enduml exist
    if (!cleanCode.includes("@startuml")) {
      cleanCode = `@startuml\n${cleanCode}\n@enduml`;
    }

    // 3. Encode using the library (Deflate + Custom Mapping)
    const encoded = plantumlEncoder.encode(cleanCode);

    // 4. Return SVG URL (SVG scales perfectly compared to PNG)
    return `https://www.plantuml.com/plantuml/svg/${encoded}`;
  } catch (error) {
    if (!import.meta.env.PROD) {
      console.error("PlantUML Encoding Error:", error);
    }
    return null;
  }
};
