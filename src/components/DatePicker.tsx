import React, { useState } from "react";



type WeekdayDateRangePickerProps = {
  onChange: (range: [string, string], weekends: string[]) => void;
  predefinedRanges?: { label: string; range: [Date, Date] }[];
};

const WeekdayDateRangePicker: React.FC<WeekdayDateRangePickerProps> = ({
  onChange,
  predefinedRanges = [],
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [displayedYear, setDisplayedYear] = useState(new Date().getFullYear());
  const [displayedMonth, setDisplayedMonth] = useState(new Date().getMonth());

  const DayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const generateCalendarDays = (year: number, month: number) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    for (let d = firstDay; d <= lastDay; d.setDate(d.getDate() + 1)) {
      days.push(new Date(d));
    }
    return days;
  };

  const handleDateClick = (date: Date) => {
    if (isWeekend(date)) return;

    if (!startDate || (startDate && endDate)) {
      setStartDate(date);
      setEndDate(null);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handlePredefinedRange = ([start, end]: [Date, Date]) => {
    setStartDate(start);
    setEndDate(end);
    computeChangeHandler(start, end);
  };

  const computeChangeHandler = (start: Date | null, end: Date | null) => {
    if (start && end) {
      const weekends: string[] = [];
      const current = new Date(start);
      const endDate = new Date(end);

      while (current <= endDate) {
        if (isWeekend(current)) {
          weekends.push(current.toISOString().split("T")[0]);
        }
        current.setDate(current.getDate() + 1);
      }

      onChange(
        [start.toISOString().split("T")[0], end.toISOString().split("T")[0]],
        weekends
      );
    }
  };

  const days = generateCalendarDays(displayedYear, displayedMonth);

  return (
    <div className="pt-5  text-white h-screen max-w-[700px] m-auto">
      <div className=" flex justify-center items-center gap-5">
        <div className=" flex gap-5 bg-slate-300 rounded-full py-1 px-3 items-center">
          <button
            onClick={() => setDisplayedYear((y) => y - 1)}
            className="text-2xl"
          >
            -
          </button>
          <span>{displayedYear}</span>
          <button
            onClick={() => setDisplayedYear((y) => y + 1)}
            className="text-2xl"
          >
            +
          </button>
        </div>
        <div className="flex gap-5 bg-gray-600 rounded-full py-2 px-3  text-white">
          <button
            onClick={() => setDisplayedMonth((m) => (m - 1 + 12) % 12)}
            className="text-2xl"
          >
            -
          </button>
          <span className="w-[100px] flex justify-center items-center">
            {new Date(displayedYear, displayedMonth).toLocaleString("default", {
              month: "long",
            })}
          </span>
          <button
            onClick={() => setDisplayedMonth((m) => (m + 1) % 12)}
            className="text-2xl"
          >
            +
          </button>
        </div>
        <div>
          <button className=" bg-slate-800 p-2 text-white rounded-full">
            Today
          </button>
        </div>
      </div>

      <div className=" border-[1px] rounded-lg m-5 p-3">
        <div className="grid gap-5 grid-cols-7 mb-3 border-b-[1px] pb-1">
          {DayNames.map((days) => (
            <p className=" text-center" key={days}>{days}</p>
          ))}
        </div>
        <div className="grid gap-5 grid-cols-7">
          {days.map((day, idx) => (
            <button
              key={idx}
              className={`day ${isWeekend(day) ? " text-gray-900 p-1" : "  p-1"} ${
                startDate &&
                endDate &&
                day >= startDate &&
                day <= endDate &&
                !isWeekend(day)
                  ? "bg-red-300"
                  : " "
              }`}
              onClick={() => handleDateClick(day)}
            >
              {day.getDate()}
            </button>
          ))}
        </div>
      </div>

      <div className=" flex gap-5 justify-center">
        {predefinedRanges.map(({ label, range }, idx) => (
          <button key={idx} onClick={() => handlePredefinedRange(range)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;
