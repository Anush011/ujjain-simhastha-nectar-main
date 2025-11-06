import { useEffect, useState } from "react";
import { Card } from "./ui/card";

const SIMHASTHA_DATE = new Date("2028-04-21").getTime(); // Update with exact date if different

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = SIMHASTHA_DATE - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-semibold text-primary">Time Until Simhastha 2028</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {timeUnits.map(({ value, label }) => (
          <Card key={label} className="p-4 text-center bg-primary/5">
            <div className="text-3xl md:text-4xl font-bold text-primary">
              {value.toString().padStart(2, "0")}
            </div>
            <div className="text-sm text-muted-foreground uppercase tracking-wider">
              {label}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Countdown;