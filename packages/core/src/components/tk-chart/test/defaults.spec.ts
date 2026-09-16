// lodash-es is ESM-only and Jest does not transform node_modules; `merge` has to deep-merge
// for the chart option objects to combine correctly.
jest.mock('lodash-es', () => ({
  merge: (target: any, ...sources: any[]) => {
    const isPlainObject = (value: any) => value !== null && typeof value === 'object' && !Array.isArray(value);
    const deepMerge = (dest: any, src: any) => {
      Object.keys(src ?? {}).forEach(key => {
        if (isPlainObject(src[key])) {
          dest[key] = isPlainObject(dest[key]) ? deepMerge({ ...dest[key] }, src[key]) : deepMerge({}, src[key]);
        } else {
          dest[key] = src[key];
        }
      });
      return dest;
    };
    return sources.reduce((acc, source) => deepMerge(acc, source), target);
  },
}));

import { getDefaultOptionsForType, DEFAULT_CHART_OPTIONS, BAR_CHART_OPTIONS, HORIZONTAL_BAR_CHART_OPTIONS, PIE_CHART_OPTIONS, DOUGHNUT_CHART_OPTIONS } from '../defaults';

describe('chart defaults', () => {
  describe('getDefaultOptionsForType', () => {
    it.each(['bar', 'horizontal-bar', 'pie', 'doughnut', 'line', 'unknown'])('always carries the shared base options for %s', type => {
      const options = getDefaultOptionsForType(type);

      expect(options.responsive).toBe(true);
      expect(options.maintainAspectRatio).toBe(false);
    });

    it('merges the bar options', () => {
      expect(getDefaultOptionsForType('bar').indexAxis).toBe(BAR_CHART_OPTIONS.indexAxis);
    });

    it('merges the horizontal bar options', () => {
      expect(getDefaultOptionsForType('horizontal-bar').indexAxis).toBe(HORIZONTAL_BAR_CHART_OPTIONS.indexAxis);
    });

    it('merges the pie options', () => {
      expect(getDefaultOptionsForType('pie').plugins.legend.position).toBe(PIE_CHART_OPTIONS.plugins.legend.position);
    });

    it('merges the doughnut options and keeps its cutout', () => {
      expect(getDefaultOptionsForType('doughnut').cutout).toBe(DOUGHNUT_CHART_OPTIONS.cutout);
    });

    it('falls back to the base options for an unknown type', () => {
      const options = getDefaultOptionsForType('radar');

      expect(options.indexAxis).toBeUndefined();
      expect(options.cutout).toBeUndefined();
      expect(options.plugins.legend.display).toBe(DEFAULT_CHART_OPTIONS.plugins.legend.display);
    });

    it('returns a fresh object each call', () => {
      const first = getDefaultOptionsForType('bar');
      const second = getDefaultOptionsForType('bar');

      first.responsive = 'mutated';

      expect(second.responsive).toBe(true);
      expect(DEFAULT_CHART_OPTIONS.responsive).toBe(true);
    });
  });

  describe('pie tooltip label', () => {
    const label = PIE_CHART_OPTIONS.plugins.tooltip.callbacks.label;
    const context = (raw: number, data: number[], text?: string) => ({
      label: text,
      raw,
      chart: { data: { datasets: [{ data }] } },
    });

    it('appends the share of the total', () => {
      expect(label(context(25, [25, 75], 'Apples'))).toBe('Apples: 25 (25.00%)');
    });

    it('keeps two decimal places for an uneven share', () => {
      expect(label(context(1, [1, 2], 'A'))).toBe('A: 1 (33.33%)');
    });

    it('tolerates a missing label and value', () => {
      expect(label(context(0, [0, 0]))).toBe(': 0 (NaN%)');
    });

    it('reports a full share for a single slice', () => {
      expect(label(context(10, [10], 'Only'))).toBe('Only: 10 (100.00%)');
    });

    it('is shared with the doughnut options', () => {
      expect(DOUGHNUT_CHART_OPTIONS.plugins.tooltip.callbacks.label).toBe(label);
    });
  });
});
