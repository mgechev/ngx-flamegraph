export interface RawData {
  label: string;
  value: number;
  children: RawData[];
}

export interface Data {
  label: string;
  value: number;
  color: string;
  widthRatio: number;
  leftRatio: number;
  rowNumber: number;
  original: RawData;
}

export const transformRawData = (data: RawData[], leftRatio = 0, parentRatio = 1, rowNumber = 0) => {
  const result: Data[] = [];
  let maxValue = -Infinity;
  let totalValue = 0;
  data.forEach(entry => {
    maxValue = Math.max(maxValue, entry.value);
    totalValue += entry.value;
  });
  data.forEach(entry => {
    const widthRatio = (entry.value / totalValue) * parentRatio;
    const node: Data = {
      ...entry,
      widthRatio,
      leftRatio,
      rowNumber,
      color: 'red',
      original: entry
    };
    result.push(
      node,
      ...transformRawData(entry.children, leftRatio, widthRatio, rowNumber + 1)
    );
    leftRatio += widthRatio;
  });
  return result;
};
