interface IdentifiableType {
  id?: number;
}

export function mapToEntities<T extends IdentifiableType>(
  items: T[],
  entities: { [id: number]: T },
): { [id: number]: T } {
  return items.reduce(
    (theEntities: { [id: number]: T }, t: T) => {
      return {
        ...theEntities,
        [t.id as number]: t,
      };
    },
    { ...entities },
  );
}
