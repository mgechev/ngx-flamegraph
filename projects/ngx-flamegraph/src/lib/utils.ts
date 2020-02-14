export interface RawData {
  label: string;
  value: number;
  color?: string;
  children: RawData[];
}

export interface Data {
  label: string;
  value: number;
  color: string;
  widthRatio: number;
  originalWidthRatio: number;
  originalLeftRatio: number;
  navigable: boolean;
  leftRatio: number;
  rowNumber: number;
  siblings: Data[];
  children: Data[];
  parent: Data;
  original: RawData;
}

export const transformRawData = (data: RawData[], parent: Data = null, leftRatio = 0, parentRatio = 1, rowNumber = 0) => {
  const result: Data[] = [];
  let minValue = Infinity;
  let totalValue = 0;
  data.forEach(entry => {
    minValue = Math.min(minValue, entry.value);
    totalValue += entry.value;
  });
  const siblings = [];
  data.forEach(entry => {
    const widthRatio = (entry.value / totalValue) * parentRatio;
    const intensity = entry.value / totalValue;
    const h = 50 - 50 * intensity;
    const l = 65 + 7 * intensity;
    const color = entry.color || `hsl(${h}, 80%, ${l}%)`;
    const children: Data[] = [];
    const node: Data = {
      label: entry.label,
      value: entry.value,
      siblings,
      color,
      widthRatio,
      originalWidthRatio: widthRatio,
      originalLeftRatio: leftRatio,
      leftRatio,
      navigable: false,
      rowNumber,
      original: entry,
      children,
      parent
    };
    if (parent) {
      parent.children.push(node);
    }
    const rest = transformRawData(entry.children, node, leftRatio, widthRatio, rowNumber + 1);
    siblings.push(node);
    result.push(
      node,
      ...rest
    );
    leftRatio += widthRatio;
  });
  return result;
};
