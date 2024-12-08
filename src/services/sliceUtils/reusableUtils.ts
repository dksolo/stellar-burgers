export const swapItemsInArray = <T>(
  i: number,
  array: T[],
  direction: string
): T[] => {
  switch (direction) {
    case 'UP':
      return [
        ...array.slice(0, i - 1),
        array[i],
        array[i - 1],
        ...array.slice(i + 1)
      ];
    case 'DOWN':
      return [
        ...array.slice(0, i),
        array[i + 1],
        array[i],
        ...array.slice(i + 2)
      ];

    default:
      return array;
  }
};
