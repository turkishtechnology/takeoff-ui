export interface IGanttTask {
  id: string | number;
  name: string;
  startDate: Date | string;
  endDate: Date | string;
  progress?: number;
  color?: string;
  tooltipContent?: string;
}

export interface IGanttTaskClickDetail {
  task: IGanttTask;
  event: MouseEvent;
}
