import React, { useState, useEffect, useRef } from "react";
import "./Timer.scss";
import bellSound from '../assets/bell-172780.mp3'; // Update the path accordingly

function Timer({ settings }) {
  const [timeLeft, setTimeLeft] = useState(settings[settings.currentSetting] * 60);
  const [isActive, setIsActive] = useState(false);
  const totalTime = settings[settings.currentSetting] * 60;
  const bellRef = useRef(null);

  // Function to reset the timer
  const resetTimer = () => {
    setTimeLeft(settings[settings.currentSetting] * 60);
    setIsActive(false);
  };

  // Use effect to reset the timer whenever settings change
  useEffect(() => {
    resetTimer();
  }, [settings]);

  // Play sound when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0) {
      bellRef.current.play();
    }
  }, [timeLeft]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false); // Stop the timer when it reaches 0
    } else if (!isActive && timeLeft !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const progress = (timeLeft / totalTime) * circumference;

  const handleIndicatorClick = () => {
    bellRef.current.play();
    if (timeLeft === 0) {
      resetTimer();
    } else {
      setIsActive(!isActive);
    }
  };

  return (
    <div className="timer-border">
      <div className="timer" style={{ color: settings.color }}>
        <svg className="progress-circle" width="220" height="220" viewBox="0 0 100 100">
          <circle className="progress-circle-bg" stroke="#161932" strokeWidth="4" fill="none" cx="50" cy="50" r={radius} />
          <circle
            className="progress-circle-fg"
            stroke={settings.color=== "coral" ? "#f87070": settings.color==="sky-blue" ? "#70f3f8" : "#d881f8"}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            cx="50"
            cy="50"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
              transformOrigin: "50% 50%",
              transform: "rotate(90deg) scale(-1, 1)", // Rotate and flip to mirror
              transition: "stroke-dashoffset 1s linear", // Smooth transition for offset
            }}
          />
        </svg>
        <div className="time fw-700">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="indicator" onClick={handleIndicatorClick}>
          {timeLeft === 0 ? "Restart" : isActive ? "Pause" : "Start"}
        </div>
        <audio ref={bellRef} src={bellSound} />
      </div>
    </div>
  );
}

export default Timer;
