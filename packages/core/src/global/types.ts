/**
 * Represents CSS style properties as strings.
 */
export type CSSStyleProperties = Partial<{ [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends string ? K : never]: string }>;

