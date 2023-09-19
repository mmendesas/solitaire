import { useEffect, useState } from 'react';
import './Clock.css';

function zeroPad(num: number, places: number = 2) {
  return String(num).padStart(places, '0');
}

export const Clock = () => {
  const [count, setCount] = useState(0);

  const seconds = zeroPad(Math.floor(count % 60));
  const minutes = zeroPad(Math.floor(count / 60));

  useEffect(() => {
    const timerID = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  return (
    <div className="clock">
      <span>00</span>
      <span>:</span>
      <span>{minutes}</span>
      <span>:</span>
      <span>{seconds}</span>
    </div>
  );
};
