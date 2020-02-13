export interface RawData {
  label: string;
  value: number;
  children: RawData[];
}

export interface Data {
  label: string;
  value: number;
  width: number;
  height: number;
  color: string;
  x: number;
  y: number;
}

const Height = 20;

export const transformRawData = (data: RawData[], totalWidth = 200, x = 0, y = 0) => {
  const result: Data[] = [];
  let maxValue = -Infinity;
  let totalValue = 0;
  data.forEach(entry => {
    maxValue = Math.max(maxValue, entry.value);
    totalValue += entry.value;
  });
  data.forEach(entry => {
    const width = totalWidth * (entry.value / totalValue);
    result.push({
      ...entry,
      height: Height,
      width,
      x,
      y,
      color: 'red',
    }, ...transformRawData(entry.children, width, x, y + Height));
    x += width;
  });
  console.log(result);
  return result;
};
