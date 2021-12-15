import { useEffect, useMemo, useRef, useState } from "react";
import "./styles.css";

// const Toggler = ({ toggle, onToggle }) => {
//   const [title, setTitle] = useState("");
//   // Corresponding to the ComponentDidUpdate()
//   useEffect(() => {
//     console.log(" run every component render: mount + update");
//   });

//   // componentDidMount()
//   useEffect(() => {
//     console.log("run only on the first render: mount");
//   }, []);

//   useEffect(() => {
//     console.log("run if toggle or title change (and on mount)");
//   }, [toggle, title]);

//   const handleChangeTitle = (event) => {
//     const newValue = event.target.value;
//     setTitle(newValue);
//   };

//   return (
//     <div>
//       <input
//         type={toggle ? "text" : "password"}
//         value={title}
//         onChange={handleChangeTitle}
//       />
//       <button type="button" onClick={onToggle}>
//         {toggle ? "Hide" : "Show"}
//       </button>
//     </div>
//   );
// };

export default function App() {
  const timerRef = useRef(null);
  const countDownDate = new Date("Dec 16, 2021 0:30:00").getTime();
  let currentDate = new Date().getTime();
  let distance = countDownDate - currentDate;
  // const [toggle, onToggle] = useState(false);
  const [timer, setTimer] = useState(distance);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setTimer((currentTimer) => currentTimer - 1000),
      1000
    );
    // componentWillUnMount
    return () => clearInterval(timerRef.current);
  }, []); // eslint-disable-line

  useEffect(() => {
    if (timer <= 0) clearInterval(timerRef.current);
  }, [timer]);

  const stylesFormat = {
    backgroundColor: "black",
    color: "white",
    padding: "3px",
    margin: "0 2px"
  };

  const countdownTimer = useMemo(() => {
    if (timer < 0)
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00"
      };
    const days = Math.floor(timer / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((timer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((timer % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((timer % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, "0");
    return { days, hours, minutes, seconds };
  }, [timer]);

  return (
    <div>
      <div>Thời gian khuyến mãi:</div>
      <div>
        <span style={stylesFormat}>{countdownTimer.days[0]}</span>
        <span style={stylesFormat}>{countdownTimer.days[1]}</span>
        <span>:</span>
        <span style={stylesFormat}>{countdownTimer.hours[0]}</span>
        <span style={stylesFormat}>{countdownTimer.hours[1]}</span>
        <span>:</span>
        <span style={stylesFormat}>{countdownTimer.minutes[0]}</span>
        <span style={stylesFormat}>{countdownTimer.minutes[1]}</span>
        <span>:</span>
        <span style={stylesFormat}>{countdownTimer.seconds[0]}</span>
        <span style={stylesFormat}>{countdownTimer.seconds[1]}</span>
      </div>
    </div>
  );
  // return (
  //   <div className="App">
  //     <Toggler toggle={toggle} onToggle={() => onToggle(!toggle)} />
  //   </div>
  // );
}
