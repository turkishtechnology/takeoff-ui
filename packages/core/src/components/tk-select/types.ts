export type TkSelectOption = string | number | boolean | Record<string, unknown>;
export type TkSelectValue = TkSelectOption | TkSelectOption[] | null;
export type TkSelectFilter = (text: string | null | undefined, options: TkSelectOption[]) => Promise<TkSelectOption[]> | TkSelectOption[];
export type TkSelectOptionRenderer = (item: TkSelectOption) => string;
export type TkSelectOptionPredicate = (item: TkSelectOption) => boolean;
export type TkSelectPanelRenderer = () => string | HTMLElement;
