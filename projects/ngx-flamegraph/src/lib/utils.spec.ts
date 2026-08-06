import {
  Data,
  FlamegraphColor,
  HslColor,
  RawData,
  RgbColor,
  findDepth,
  maxValue,
  restore,
  transformData,
  transformRawData,
} from './utils';

describe('ngx-flamegraph utils', () => {
  const sampleData: RawData[] = [
    {
      label: 'Root A',
      value: 100,
      children: [
        {
          label: 'Child A1',
          value: 40,
          children: [
            { label: 'Leaf A1a', value: 10, children: [] },
            { label: 'Leaf A1b', value: 30, children: [] },
          ],
        },
        {
          label: 'Child A2',
          value: 60,
          children: [],
        },
      ],
    },
  ];

  const defaultHslColor: HslColor = {
    hue: [50, 0],
    saturation: [80, 80],
    lightness: [55, 60],
  };

  const sampleRgbColor: RgbColor = {
    red: [255, 0],
    green: [0, 255],
    blue: [100, 200],
  };

  describe('maxValue', () => {
    it('should return 0 for empty array', () => {
      expect(maxValue([])).toBe(0);
    });

    it('should find maximum value in flat data', () => {
      const data: RawData[] = [
        { label: 'A', value: 10, children: [] },
        { label: 'B', value: 50, children: [] },
        { label: 'C', value: 30, children: [] },
      ];
      expect(maxValue(data)).toBe(50);
    });

    it('should find maximum value in deeply nested data', () => {
      expect(maxValue(sampleData)).toBe(100);

      const deepData: RawData[] = [
        {
          label: 'Root',
          value: 10,
          children: [
            {
              label: 'Child',
              value: 20,
              children: [{ label: 'Deep', value: 200, children: [] }],
            },
          ],
        },
      ];
      expect(maxValue(deepData)).toBe(200);
    });

    it('should handle zero and negative values safely', () => {
      const data: RawData[] = [
        { label: 'A', value: 0, children: [] },
        { label: 'B', value: 0, children: [] },
      ];
      expect(maxValue(data)).toBe(0);
    });
  });

  describe('findDepth', () => {
    it('should return 0 for undefined or empty data', () => {
      expect(findDepth(undefined)).toBe(0);
      expect(findDepth([])).toBe(0);
    });

    it('should return 1 for a single level without children', () => {
      const data: RawData[] = [
        { label: 'A', value: 10, children: [] },
        { label: 'B', value: 20, children: [] },
      ];
      expect(findDepth(data)).toBe(1);
    });

    it('should return correct depth for nested data', () => {
      expect(findDepth(sampleData)).toBe(3);
    });

    it('should return maximum depth for unbalanced tree', () => {
      const unbalanced: RawData[] = [
        {
          label: 'Shallow',
          value: 10,
          children: [],
        },
        {
          label: 'Deep',
          value: 20,
          children: [
            {
              label: 'Deep-1',
              value: 10,
              children: [
                {
                  label: 'Deep-2',
                  value: 5,
                  children: [
                    {
                      label: 'Deep-3',
                      value: 2,
                      children: [],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ];
      expect(findDepth(unbalanced)).toBe(4);
    });
  });

  describe('transformRawData', () => {
    it('should transform tree into a flat Data array with tree linkages', () => {
      const result = transformRawData(
        sampleData,
        'relative',
        maxValue(sampleData),
        defaultHslColor,
      );

      expect(result.length).toBe(5);
      const root = result[0];
      expect(root.label).toBe('Root A');
      expect(root.rowNumber).toBe(0);
      expect(root.parent).toBeNull();
      expect(root.children.length).toBe(2);
      expect(root.siblings.length).toBe(1);

      const childA1 = result[1];
      expect(childA1.label).toBe('Child A1');
      expect(childA1.rowNumber).toBe(1);
      expect(childA1.parent).toBe(root);

      const leafA1a = result[2];
      expect(leafA1a.label).toBe('Leaf A1a');
      expect(leafA1a.rowNumber).toBe(2);
      expect(leafA1a.parent).toBe(childA1);
    });

    it('should calculate correct widthRatio and leftRatio in relative layout', () => {
      const siblings: RawData[] = [
        { label: 'A', value: 25, children: [] },
        { label: 'B', value: 75, children: [] },
      ];

      const result = transformRawData(siblings, 'relative', 75, defaultHslColor);

      expect(result[0].widthRatio).toBeCloseTo(0.25);
      expect(result[0].leftRatio).toBeCloseTo(0);

      expect(result[1].widthRatio).toBeCloseTo(0.75);
      expect(result[1].leftRatio).toBeCloseTo(0.25);
    });

    it('should calculate correct widthRatio and leftRatio in equal layout', () => {
      const siblings: RawData[] = [
        { label: 'A', value: 10, children: [] },
        { label: 'B', value: 90, children: [] },
      ];

      const result = transformRawData(siblings, 'equal', 90, defaultHslColor);

      expect(result[0].widthRatio).toBeCloseTo(0.5);
      expect(result[0].leftRatio).toBeCloseTo(0);

      expect(result[1].widthRatio).toBeCloseTo(0.5);
      expect(result[1].leftRatio).toBeCloseTo(0.5);
    });

    it('should calculate HSL colors based on intensity', () => {
      const data: RawData[] = [
        { label: 'Min', value: 0, children: [] },
        { label: 'Max', value: 100, children: [] },
      ];

      const result = transformRawData(data, 'relative', 100, defaultHslColor);

      // Value 0 => intensity 0 => hue: 50, sat: 80%, light: 55%
      expect(result[0].color).toBe('hsl(50, 80%, 55%)');
      // Value 100 => intensity 1 => hue: 0, sat: 80%, light: 60%
      expect(result[1].color).toBe('hsl(0, 80%, 60%)');
    });

    it('should support scalar numbers for HSL colors', () => {
      const scalarHsl: HslColor = {
        hue: 200,
        saturation: 70,
        lightness: 50,
      };

      const data: RawData[] = [{ label: 'Node', value: 50, children: [] }];
      const result = transformRawData(data, 'relative', 50, scalarHsl);

      expect(result[0].color).toBe('hsl(200, 70%, 50%)');
    });

    it('should calculate RGB colors based on intensity', () => {
      const data: RawData[] = [
        { label: 'Min', value: 0, children: [] },
        { label: 'Max', value: 100, children: [] },
      ];

      const result = transformRawData(data, 'relative', 100, sampleRgbColor);

      // Value 0 => intensity 0 => rgb(255, 0, 100)
      expect(result[0].color).toBe('rgb(255, 0, 100)');
      // Value 100 => intensity 1 => rgb(0, 255, 200)
      expect(result[1].color).toBe('rgb(0, 255, 200)');
    });

    it('should support scalar numbers for RGB colors', () => {
      const scalarRgb: RgbColor = {
        red: 120,
        green: 130,
        blue: 140,
      };

      const data: RawData[] = [{ label: 'Node', value: 50, children: [] }];
      const result = transformRawData(data, 'relative', 50, scalarRgb);

      expect(result[0].color).toBe('rgb(120, 130, 140)');
    });

    it('should preserve explicit custom color on RawData', () => {
      const data: RawData[] = [
        { label: 'Custom', value: 50, color: '#ff0000', children: [] },
      ];

      const result = transformRawData(data, 'relative', 50, defaultHslColor);
      expect(result[0].color).toBe('#ff0000');
    });

    it('should throw error for unsupported color scheme', () => {
      const invalidColor = { foo: 1, bar: 2 } as unknown as FlamegraphColor;
      const data: RawData[] = [{ label: 'Invalid', value: 10, children: [] }];

      expect(() => {
        transformRawData(data, 'relative', 10, invalidColor);
      }).toThrowError('Unsupported color scheme.');
    });

    it('should handle zero values gracefully without producing NaN', () => {
      const data: RawData[] = [
        { label: 'ZeroA', value: 0, children: [] },
        { label: 'ZeroB', value: 0, children: [] },
      ];

      const result = transformRawData(data, 'relative', 0, defaultHslColor);

      expect(isNaN(result[0].widthRatio)).toBe(false);
      expect(isNaN(result[0].leftRatio)).toBe(false);
      expect(result[0].color).not.toContain('NaN');
    });
  });

  describe('transformData (zoom) and restore', () => {
    let flatData: Data[];

    beforeEach(() => {
      flatData = transformRawData(
        sampleData,
        'relative',
        maxValue(sampleData),
        defaultHslColor,
      );
    });

    it('should zoom into a child node and adjust siblings/parents', () => {
      const root = flatData[0];
      const childA1 = flatData[1];
      const childA2 = flatData[4];

      transformData(childA1, 'relative');

      // childA1 should occupy the full width
      expect(childA1.widthRatio).toBe(1);
      expect(childA1.leftRatio).toBe(0);

      // Sibling childA2 should be hidden to the right (leftRatio = 1)
      expect(childA2.widthRatio).toBe(0);
      expect(childA2.leftRatio).toBe(1);

      // Parent root should be navigable
      expect(root.navigable).toBe(true);

      // childA1's children should be scaled to fill full width
      const leafA1a = flatData[2]; // value 10
      const leafA1b = flatData[3]; // value 30
      expect(leafA1a.widthRatio).toBeCloseTo(10 / 40);
      expect(leafA1a.leftRatio).toBeCloseTo(0);
      expect(leafA1b.widthRatio).toBeCloseTo(30 / 40);
      expect(leafA1b.leftRatio).toBeCloseTo(10 / 40);
    });

    it('should restore zoomed state back to original ratios', () => {
      const root = flatData[0];
      const childA1 = flatData[1];
      const childA2 = flatData[4];

      const originalA1Width = childA1.widthRatio;
      const originalA2Width = childA2.widthRatio;

      transformData(childA1, 'relative');
      restore(root);

      expect(root.navigable).toBe(false);
      expect(childA1.widthRatio).toBe(originalA1Width);
      expect(childA1.leftRatio).toBe(childA1.originalLeftRatio);
      expect(childA2.widthRatio).toBe(originalA2Width);
      expect(childA2.leftRatio).toBe(childA2.originalLeftRatio);
    });
  });
});
