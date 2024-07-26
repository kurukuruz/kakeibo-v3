import dayjs, { Dayjs } from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);
dayjs.locale('mon-start', {
  weekStart: 1,
  weekdaysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
});

export const daysOfMonth = (target: Dayjs) => {
  const start = target.startOf('month').startOf('week');
  const end = target.endOf('month').endOf('week');

  const month = [] as Dayjs[][];
  let temp = start;
  while (temp.isSameOrBefore(end)) {
    const week = [] as Dayjs[];
    const weekend = temp.endOf('week');
    while (temp.isSameOrBefore(weekend)) {
      week.push(temp);
      temp = temp.add(1, 'day');
    }
    month.push(week);
  }

  return month;
};
