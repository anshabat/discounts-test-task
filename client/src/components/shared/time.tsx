type Props = {
  dateObj: Date;
};

function Time(props: Props) {
  const { dateObj } = props;
  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "2-digit",
  });

  return <div className="text-gray-400 text-base font-normal">{date}</div>;
}

export default Time;
