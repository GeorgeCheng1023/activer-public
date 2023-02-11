export default function getUrlParams(
  url: string,
  paramName: string,
  defaultValue?: string[] | string,
): string[] | string | null {
  const urlParams = new URLSearchParams(new URL(url).search);
  const values: string[] = [];
  urlParams.forEach((value, key) => {
    if (key === paramName) {
      values.push(value);
    }
  });
  if (values.length === 1) {
    return values[0];
  }
  return values.length > 0 ? values : defaultValue || null;
}
