export default function useConvertDatet(dateString: string) {
  return dateString.replace(/-/g, '/');
}
