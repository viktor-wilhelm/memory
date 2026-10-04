/** Values that can be inserted into an HTML template. */
export type TemplateValues = Record<string, string | number>;

const PLACEHOLDER_PATTERN = /\{\{\{(\w+)\}\}\}|\{\{(\w+)\}\}/g;
const SPECIAL_CHARACTER_PATTERN = /[&<>"']/g;
const HTML_ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

/**
 * Escapes the characters that are special in HTML text and attribute values.
 * @param text Plain text that may contain special characters.
 * @returns The text that is safe to insert into markup.
 */
export function escapeHtml(text: string): string {
  return text.replace(
    SPECIAL_CHARACTER_PATTERN,
    (character: string): string => HTML_ESCAPES[character],
  );
}

/**
 * Reads one template value and fails loudly when it is missing.
 * @param values The values passed to the template.
 * @param key The placeholder name.
 * @returns The value as a string.
 */
function readValue(values: TemplateValues, key: string): string {
  const value = values[key];
  if (value === undefined) throw new Error(`Missing template value: ${key}`);
  return String(value);
}

/**
 * Fills an HTML template: `{{name}}` inserts escaped text, `{{{name}}}` inserts trusted markup
 * that was built from another template.
 * @param template The template source.
 * @param values The values for every placeholder of the template.
 * @returns The finished markup.
 */
export function fillTemplate(template: string, values: TemplateValues): string {
  return template.replace(
    PLACEHOLDER_PATTERN,
    (_match: string, markupKey?: string, textKey?: string): string =>
      markupKey ? readValue(values, markupKey) : escapeHtml(readValue(values, String(textKey))),
  );
}
