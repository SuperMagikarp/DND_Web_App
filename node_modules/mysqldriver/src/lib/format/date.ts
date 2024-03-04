import dayjs from 'dayjs';
export function formatDate(d: Date) {
  return dayjs(d).format('YYYY-MM-DD hh:mm:ss');
}
