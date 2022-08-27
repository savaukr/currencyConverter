import React, { useEffect, useState } from "react";
import * as dayjs from "dayjs";

type Props = {
  className: string;
};
function Today({ className }: Props) {
  const [dateNow, setDateNow] = useState<string>(
    dayjs(new Date()).format("DD.MM.YYYY HH:MM")
  );
  useEffect(() => {
    const timerId = setInterval(
      () => setDateNow(dayjs(new Date()).format("DD.MM.YYYY  h:mm:ss")),
      1000
    );
    return () => clearInterval(timerId);
  }, []);
  return <div className={className}>{dateNow}</div>;
}

export default Today;
