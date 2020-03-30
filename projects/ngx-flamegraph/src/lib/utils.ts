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
  parent: Data | null;
  original: RawData;
}

export type SiblingLayout = 'relative' | 'equal';

export const maxValue = (data: RawData[]) => {
  return data.reduce((p, c) => {
    return Math.max(p, c.value, maxValue(c.children || []));
  }, -Infinity);
};

export const transformRawData = (
  data: RawData[],
  layout: 'relative' | 'equal',
  maxDataValue: number,
  parent: Data | null = null,
  leftRatio = 0,
  parentRatio = 1,
  rowNumber = 0
) => {
  const result: Data[] = [];
  let totalValue = 0;
  data.forEach(entry => {
    totalValue += entry.value;
  });
  const siblings: Data[] = [];
  data.forEach(entry => {
    let widthRatio = parentRatio / data.length;
    if (layout === 'relative') {
      widthRatio = ((entry.value / totalValue) * parentRatio) || 0;
    }
    const intensity = Math.min(entry.value / maxDataValue, 1);
    const h = 50 - 50 * intensity;
    const l = 65 + 5 * intensity;
    const color = entry.color || `hsl(${h || 0}, 80%, ${l || 0}%)`;
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
    const rest = transformRawData(
      entry.children || [],
      layout,
      maxDataValue,
      node,
      leftRatio,
      widthRatio,
      rowNumber + 1
    );
    siblings.push(node);
    result.push(node, ...rest);
    leftRatio += widthRatio;
  });
  return result;
};
