import * as React from 'react';

const CountDown = ({ hours = 0, minutes = 0, seconds = 0, callback }) => {
    const [paused, setPaused] = React.useState(false);
    const [over, setOver] = React.useState(false);
    const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);
  
    const tick = () => {
      if (paused || over) return;
      if (h === 0 && m === 0 && s === 0) setOver(true);
      else if (m === 0 && s === 0) {
        setTime([h - 1, 59, 59]);
      } else if (s == 0) {
        setTime([h, m - 1, 59]);
      } else {
        setTime([h, m, s - 1]);
      }
    };
  
    const reset = () => {
      setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
      setPaused(false);
      setOver(false);
    };
  
    React.useEffect(() => {
      const timerID = setInterval(() => tick(), 1000);
      return () => clearInterval(timerID);
    });
  
    return callback(s.toString().padStart(2, '0'));
};

export { CountDown };
  
  