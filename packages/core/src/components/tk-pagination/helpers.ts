/**
 * Formats a template string by replacing placeholders with corresponding values.
 *
 * @param template - The template string containing placeholders in the format {key}.
 * @param values - An object containing key-value pairs for replacement.
 * @returns The formatted string with placeholders replaced by their corresponding values.
 * @example
 * const template = "Page {currentPage} of {totalPages}";
 * const values = { currentPage: 2, totalPages: 5 };
 * const result = formatTemplate(template, values);
 * // result: "Page 2 of 5"
 */

export function formatTemplate(template: string, values: Record<string, number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return values[key]?.toString() || match;
  });
}
export function getTemplateValues(internalCurrentPage: number, rowsPerPage: number, totalItems: number, totalPages: number) {
  const startItem = (internalCurrentPage - 1) * rowsPerPage + 1;
  const endItem = Math.min(internalCurrentPage * rowsPerPage, totalItems);
  return {
    currentPage: internalCurrentPage,
    totalPages: totalPages,
    startItem,
    endItem,
    totalItems: totalItems,
  };
}
