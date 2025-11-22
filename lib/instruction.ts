export default function generateInstruction(data: Record<string, any>) {
  const { content, language, summaryLength } = data;

  // Define summary length instructions
  const lengthInstructions = {
    short: "1-2 sentences",
    medium: "1 paragraph (3-5 sentences)",
    long: "2-3 paragraphs",
  };

  // Build dynamic instructions
  const instructions = `Summarize the following content in ${language}.
The summary should be ${
    lengthInstructions[summaryLength as keyof typeof lengthInstructions]
  }.
Return only the summary text, nothing else.`;

  return instructions;
}
