export function replaceDateMinus(dateString: string) {
  return dateString.replace(/-/g, '/');
}

export function formateDateSimple(dateString: string) {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}月 ${day}, ${year}`;
}

export default function formatDateString(dateString: string) {
  const date = new Date(dateString);
  date.setHours(date.getHours() + 8);
  const year = date.getFullYear();
  const month = `0${date.getMonth() + 1}`.slice(-2);
  const day = `0${date.getDate()}`.slice(-2);
  const hours = `0${date.getHours()}`.slice(-2);
  const minutes = `0${date.getMinutes()}`.slice(-2);

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}
