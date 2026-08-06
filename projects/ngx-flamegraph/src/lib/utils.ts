export type FlamegraphColor = HslColor | RgbColor;

export interface HslColor {
  hue: number | [number, number];
  saturation: number | [number, number];
  lightness: number | [number, number];
}

export interface RgbColor {
  red: number | [number, number];
  green: number | [number, number];
  blue: number | [number, number];
}

type MultiColor<T> = {
  [K in keyof T]: Extract<T[K], [number, number]>;
};

type MultiHslColor = MultiColor<HslColor>;
type MultiRgbColor = MultiColor<RgbColor>;

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

export const maxValue = (data: RawData[]): number => {
  if (!data || !data.length) {
    return 0;
  }
  return data.reduce((p, c) => {
    return Math.max(p, c.value, maxValue(c.children || []));
  }, 0);
};

const calculateWidthRatio = (
  siblingsTotalValue: number,
  entryValue: number,
  parentValue: number,
  parentRatio: number,
  siblingsCount: number,
  layout: SiblingLayout,
) => {
  let widthRatio: number;

  if (layout === 'relative') {
    if (siblingsTotalValue === 0 || parentValue === 0) {
      widthRatio = siblingsCount > 0 ? parentRatio / siblingsCount : 0;
    } else {
      const entryToSiblingsRatio = entryValue / siblingsTotalValue;
      const siblingsToParentRatio = siblingsTotalValue / parentValue;
      widthRatio = entryToSiblingsRatio * siblingsToParentRatio * parentRatio;
    }
  } else {
    widthRatio = siblingsCount > 0 ? parentRatio / siblingsCount : 0;
  }

  return isNaN(widthRatio) ? 0 : widthRatio;
};

export const transformRawData = (
  data: RawData[],
  layout: SiblingLayout,
  maxDataValue: number,
  colors: FlamegraphColor,
  parent: Data | null = null,
  leftRatio = 0,
  parentRatio = 1,
  rowNumber = 0,
) => {
  const result: Data[] = [];
  let totalValue = 0;
  data.forEach((entry) => {
    totalValue += entry.value;
  });
  const siblings: Data[] = [];
  data.forEach((entry) => {
    const widthRatio = calculateWidthRatio(
      totalValue,
      entry.value,
      parent?.value ?? totalValue,
      parentRatio,
      data.length,
      layout,
    );

    const children: Data[] = [];
    const node: Data = {
      label: entry.label,
      value: entry.value,
      siblings,
      color: calculateNodeColor(entry, maxDataValue, colors),
      widthRatio,
      originalWidthRatio: widthRatio,
      originalLeftRatio: leftRatio,
      leftRatio,
      navigable: false,
      rowNumber,
      original: entry,
      children,
      parent,
    };
    if (parent) {
      parent.children.push(node);
    }
    const rest = transformRawData(
      entry.children || [],
      layout,
      maxDataValue,
      colors,
      node,
      leftRatio,
      widthRatio,
      rowNumber + 1,
    );
    siblings.push(node);
    result.push(node, ...rest);
    leftRatio += widthRatio;
  });
  return result;
};

export const findDepth = (data: RawData[] | undefined) => {
  if (!data) {
    return 0;
  }
  if (!data.length) {
    return 0;
  }
  let result = 0;
  for (const row of data) {
    result = Math.max(1 + findDepth(row.children), result);
  }
  return result;
};

const collapse = (e: Data) => {
  e.widthRatio = 0;
  e.children.forEach(collapse);
};

const collapseOthers = (entry: Data) => {
  entry.siblings.forEach((e) => {
    if (e === entry) {
      return;
    }
    collapse(e);
  });
  let current = entry;
  while (current.parent) {
    current = current.parent;
    if (current.widthRatio === 0) {
      continue;
    }
    collapseOthers(current);
  }
};

const hide = (leftRatio: number, node: Data) => {
  node.widthRatio = 0;
  node.leftRatio = leftRatio;
  node.children.forEach((n) => hide(leftRatio, n));
};

const hideSiblings = (node: Data) => {
  const idx = node.siblings.indexOf(node);
  for (let i = 0; i < idx; i++) {
    node.siblings[i].widthRatio = 0;
    node.siblings[i].leftRatio = 0;
    node.siblings[i].children.forEach(hide.bind(null, 0));
  }
  for (let i = idx + 1; i < node.siblings.length; i++) {
    node.siblings[i].widthRatio = 0;
    node.siblings[i].leftRatio = 1;
    node.siblings[i].children.forEach(hide.bind(null, 1));
  }
};

export const transformData = (focused: Data, layout: SiblingLayout) => {
  let current: Data | null = focused;
  while (current) {
    current.widthRatio = 1;
    current.leftRatio = 0;
    hideSiblings(current);
    current = current.parent;
    if (current) {
      current.navigable = true;
    }
  }
  adjustChildren(focused.children, layout, focused.value);
};

const adjustChildren = (
  data: Data[],
  layout: SiblingLayout,
  parentValue: number,
  leftRatio = 0,
  parentRatio = 1,
) => {
  let totalValue = 0;
  data.forEach((entry) => {
    totalValue += entry.value;
  });
  data.forEach((entry) => {
    const widthRatio = calculateWidthRatio(
      totalValue,
      entry.value,
      parentValue,
      parentRatio,
      data.length,
      layout,
    );

    entry.widthRatio = widthRatio;
    entry.leftRatio = leftRatio;
    adjustChildren(entry.children, layout, entry.value, leftRatio, widthRatio);
    leftRatio += widthRatio;
  });
};

export const restore = (entry: Data) => {
  entry.navigable = false;
  entry.leftRatio = entry.originalLeftRatio;
  entry.widthRatio = entry.originalWidthRatio;
  entry.children.forEach(restore);
};

const isHslColor = (color: FlamegraphColor): color is HslColor =>
  'hue' in color && 'saturation' in color && 'lightness' in color;

const isRgbColor = (color: FlamegraphColor): color is RgbColor =>
  'red' in color && 'green' in color && 'blue' in color;

const normalizeColor = <T extends Record<string, any>, U extends Record<string, any>>(
  color: T,
  channels: string[],
): U => {
  const multi = {} as U;
  for (const ch of channels) {
    const colorCh = color[ch];
    (multi as Record<string, any>)[ch] = Array.isArray(colorCh) ? colorCh : [colorCh, colorCh];
  }
  return multi;
};

const HSL_CHANNELS: (keyof HslColor)[] = ['hue', 'saturation', 'lightness'];
const RGB_CHANNELS: (keyof RgbColor)[] = ['red', 'green', 'blue'];

const normalizeHslColor = (color: HslColor) =>
  normalizeColor<HslColor, MultiHslColor>(color, HSL_CHANNELS);
const normalizeRgbColor = (color: RgbColor) =>
  normalizeColor<RgbColor, MultiRgbColor>(color, RGB_CHANNELS);

const getComponent = ([min, max]: [number, number], intensity: number) => {
  const val = min + (max - min) * intensity;
  return isNaN(val) ? min : val;
};

const calculateNodeColor = (entry: RawData, maxValue: number, colors: FlamegraphColor): string => {
  if (entry.color) {
    return entry.color;
  }

  const intensity = maxValue > 0 ? Math.min(Math.max(entry.value / maxValue, 0), 1) : 0;

  if (isHslColor(colors)) {
    const c = normalizeHslColor(colors);
    const hue = getComponent(c.hue, intensity) ?? 0;
    const saturation = getComponent(c.saturation, intensity) ?? 80;
    const lightness = getComponent(c.lightness, intensity) ?? 0;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }

  if (isRgbColor(colors)) {
    const c = normalizeRgbColor(colors);
    const red = getComponent(c.red, intensity) ?? 0;
    const green = getComponent(c.green, intensity) ?? 0;
    const blue = getComponent(c.blue, intensity) ?? 0;

    return `rgb(${red}, ${green}, ${blue})`;
  }

  throw new Error('Unsupported color scheme.');
};
