export const groupNumbers = (numbers: number[]): number[][] =>
  numbers.sort().reduce((groups: number[][], number) => {
    const lastSubArray: number[] = groups[groups.length - 1] || [];

    if (lastSubArray.length === 0 || lastSubArray[lastSubArray.length - 1] !== number - 1) {
      groups.push([]);
    }

    groups[groups.length - 1].push(number);

    return groups;
  }, []);

export const listGroupedNumbers = (
  groupedNumbers: number[][],
  format?: (first?: number, last?: number) => string
): string => {
  return groupedNumbers
    .reduce((lists: string[], numbers) => {
      const [first, ...rest] = numbers;
      const last = rest.pop();
      const list = `${first}${last ? '-' + last : ''}`;
      return [...lists, format ? list + format(first, last) : list];
    }, [])
    .join(', ');
};
