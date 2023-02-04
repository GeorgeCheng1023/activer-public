export default function convertDateFormat(dateString: string) {
  return dateString.replace(/-/g, '/');
}
