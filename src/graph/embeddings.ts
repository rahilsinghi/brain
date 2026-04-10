export interface ChunkWithVector {
  filePath: string;
  vector: number[];
}

export function aggregateEmbeddings(
  chunks: ChunkWithVector[],
): Map<string, number[]> {
  const groups = new Map<string, number[][]>();

  for (const chunk of chunks) {
    if (!chunk.vector || chunk.vector.length === 0) continue;

    const existing = groups.get(chunk.filePath);
    if (existing) {
      existing.push(chunk.vector);
    } else {
      groups.set(chunk.filePath, [chunk.vector]);
    }
  }

  const centroids = new Map<string, number[]>();

  for (const [filePath, vectors] of groups) {
    const dim = vectors[0].length;
    const centroid = new Array<number>(dim).fill(0);

    for (const vec of vectors) {
      for (let i = 0; i < dim; i++) {
        centroid[i] += vec[i];
      }
    }

    for (let i = 0; i < dim; i++) {
      centroid[i] /= vectors.length;
    }

    centroids.set(filePath, centroid);
  }

  return centroids;
}
