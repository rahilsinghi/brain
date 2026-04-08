export function truncateAtSentence(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const slice = text.slice(0, maxLength);
  const lastSentenceEnd = Math.max(
    slice.lastIndexOf(". "),
    slice.lastIndexOf("! "),
    slice.lastIndexOf("? "),
    slice.lastIndexOf(".\n"),
    slice.lastIndexOf("!\n"),
    slice.lastIndexOf("?\n"),
  );

  // +1 to include the punctuation character itself
  const cutPoint = lastSentenceEnd > 0 ? lastSentenceEnd + 1 : maxLength;
  return text.slice(0, cutPoint) + "...";
}
