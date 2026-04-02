import type { NodeId } from 'd3-org-chart';

export interface OrgChartNode {
  id?: NodeId;
  parentId?: NodeId | null;
  name?: string;
  title?: string;
  children?: OrgChartNode[];
  [key: string]: unknown;
}
