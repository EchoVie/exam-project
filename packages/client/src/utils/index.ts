import dayjs from 'dayjs';

type TimeProps = number | string;

export function transformToDate(time: TimeProps) {
  return time && dayjs(time).format('YYYY-MM-DD HH:mm:ss');
}

export function isCurrentTimeBeforeOther(a: TimeProps, b: TimeProps) {
  if (!a || !b) return 0;

  return dayjs(b).diff(dayjs(a));
}
