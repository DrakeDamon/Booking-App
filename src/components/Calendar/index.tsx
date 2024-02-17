import React, { type FC, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { add, format } from 'date-fns';
import { INTERVAL, STORE_CLOSING_TIME, STORE_OPENING_TIME } from 'src/constants/config'

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}


const Index: FC = () => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  const getTimes = () => {
    if (!date.justDate) return [];

    const beginning = add(date.justDate, { hours: STORE_OPENING_TIME });
    const end = add(date.justDate, { hours: STORE_CLOSING_TIME });
    const interval = INTERVAL; 
    const times: Date[] = [];

    for (let i = beginning; i <= end; i = add(i, { minutes: interval })) {
      times.push(i);
    }

    return times;
  };

  const times = getTimes(); // Get the times for the selected date

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {date.justDate ? (
        <div className='flex max-w-lg flex-wrap gap-4'>
          {times.map((time, i) => (
            <div className='rounded-sm bg-gray-100 p-2' key={`time-${i}`}>
              <button onClick={() => setDate((prev) => ({ ...prev, dateTime: time }))} type='button'>
                {format(time, 'kk:mm')}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <ReactCalendar
          minDate={new Date()}
          className='react-calendar p-2'
          view='month'
          onClickDay={(selectedDate) =>
            setDate((prev) => ({ ...prev, justDate: selectedDate }))
          }
        />
      )}
    </div>
  );
};

export default Index;
