export function convertQueryValue(queryValue: string | string[] | undefined) {
  if (Array.isArray(queryValue)) return parseInt(queryValue[0]);
  if (typeof queryValue === 'undefined') return queryValue;
  return parseInt(queryValue);
}
