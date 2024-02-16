import React, { FC, useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import CSS if needed

interface DateType {
  justDate: Date | null;
  dateTime: Date | null;
}

interface indexProps {
  // Define your props here
}

const Index: FC<indexProps> = (props) => {
  const [date, setDate] = useState<DateType>({
    justDate: null,
    dateTime: null,
  });

  return (
    <div className='flex h-screen flex-col items-center justify-center'>
      {date.justDate ? (
        <div>
          {/* Display selected date or additional content */}
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

export default Index; // This should be outside and after your component/function definition.
