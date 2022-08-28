import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";

type Props = {
  className: string;
  setTimeFetchRate: (timeFetchRate: boolean) => void;
};
function Today({ className, setTimeFetchRate }: Props) {
  const [dateNow, setDateNow] = useState<string>(
    dayjs(new Date()).format("DD.MM.YYYY HH:MM")
  );
  useEffect(() => {
    const timerId = setInterval(() => {
      const date = new Date();
      if (
        date.getHours() === 0 &&
        date.getMinutes() === 0 &&
        date.getSeconds() === 0
      )
        setTimeFetchRate(true);
      setDateNow(dayjs(date).format("DD.MM.YYYY  h:mm:ss"));
    }, 1000);
    return () => clearInterval(timerId);
  }, []);
  return <div className={className}>{dateNow}</div>;
}

export default Today;
