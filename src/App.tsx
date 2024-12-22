import React from "react";
import WeekdayDateRangePicker from "./components/DatePicker";

const App = () => {
  const handleDateRangeChange = (range: [string, string], weekends: string[]) => {
    console.log("Selected Range:", range);
    console.log("Weekends:", weekends);
  };

  const predefinedRanges = [
    {
      label: "Last 7 Days",
      range: [new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()],
    },
    {
      label: "Last 30 Days",
      range: [new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), new Date()],
    },
  ];

  return (
    <>
      <WeekdayDateRangePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </>
  );
};

export default App;
