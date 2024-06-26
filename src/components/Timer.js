import React, { useState, useEffect } from "react";
import "./Timer.scss";

function Timer({ settings }) {
  const [timeLeft, setTimeLeft] = useState(settings.pomodoro * 60);
  const [isActive, setIsActive] = useState(false);
  const totalTime = settings.pomodoro * 60;
  const darkNavy = "#161932"; // Final color

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => timeLeft - 1);
      }, 1000);
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

  const calculateColor = (timeLeft, totalTime) => {
    const startColor = settings.color === "coral" ? "#F87070" : settings.color === "sky-blue" ? "#70f3f8" : "#d881f8";
    const ratio = timeLeft / totalTime;
    const startRGB = hexToRgb(startColor);
    const endRGB = hexToRgb(darkNavy);
    const currentRGB = {
      r: Math.round(startRGB.r * ratio + endRGB.r * (1 - ratio)),
      g: Math.round(startRGB.g * ratio + endRGB.g * (1 - ratio)),
      b: Math.round(startRGB.b * ratio + endRGB.b * (1 - ratio)),
    };
    return `rgb(${currentRGB.r}, ${currentRGB.g}, ${currentRGB.b})`;
  };

  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  return (
    <div className="timer-border">
      <div className="timer" style={{ color: settings.color }}>
        <svg className="progress-circle" width="220" height="220" viewBox="0 0 100 100">
          <circle className="progress-circle-bg" stroke="#161932" strokeWidth="4" fill="none" cx="50" cy="50" r={radius} />
          <circle
            className="progress-circle-fg"
            stroke={calculateColor(timeLeft, totalTime)}
            strokeWidth="4"
            fill="none"
            cx="50"
            cy="50"
            r={radius}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: circumference - progress,
              transformOrigin: "50% 50%",
              transform: "rotate(90deg) scale(-1, 1)", // Rotate and flip to mirror
              transition: "stroke-dashoffset 1s linear, stroke 1s linear", // Smooth transition for both offset and color
            }}
          />
        </svg>
        <div className="time fw-700">
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </div>
        <div className="indicator" onClick={() => setIsActive(!isActive)}>{isActive ? "Pause" : "Start"}</div>
      </div>
    </div>
  );
}

export default Timer;
