import { useEffect, useState } from 'react';

function format(timeZone) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone,
  }).format(new Date());
}

// Current wall-clock time in a given IANA time zone, refreshed every 20s.
export function useLocalTime(timeZone) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const id = setInterval(() => setTime(format(timeZone)), 20_000);
    return () => clearInterval(id);
  }, [timeZone]);

  return time;
}
