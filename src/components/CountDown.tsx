// components/Countdown.js
import { useEffect, useState } from 'react';
import { parse, formatDistanceToNow } from 'date-fns';

const CountDown: React.FC<{ targetDateString: string }> = ({
  targetDateString
}) => {
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const targetDate = parse(targetDateString, 'yyyy-MM-dd', new Date());

    const updateCountdown = () => {
      //   const now : Date = new Date();
      const countdownText = formatDistanceToNow(targetDate, {
        addSuffix: true
      });
      setCountdown(countdownText);
    };

    updateCountdown();
    const intervalId = setInterval(updateCountdown, 1000);

    return () => clearInterval(intervalId);
  }, [targetDateString]);

  return (
    <div>
      <p>{countdown}</p>
    </div>
  );
};

export default CountDown;
