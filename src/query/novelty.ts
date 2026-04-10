export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let magA = 0;
  let magB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  if (denom === 0) return 0;
  return dot / denom;
}

export function noveltyScore(
  answerVector: number[],
  chunkVectors: number[][],
): number {
  if (chunkVectors.length === 0) return 1.0;

  let maxSim = -Infinity;
  for (const chunkVec of chunkVectors) {
    const sim = cosineSimilarity(answerVector, chunkVec);
    if (sim > maxSim) maxSim = sim;
  }

  return Math.max(0, 1 - maxSim);
}
