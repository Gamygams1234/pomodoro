import React, { useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Settings.scss";
import clsx from "clsx";

function Settings({ settings, saveSettings, closeModal }) {
  const [newSettings, setNewSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSettings({ ...newSettings, [name]: parseInt(value) });
  };

  const changeFont = (font) => {
    setNewSettings({ ...newSettings, font: font });
  };

  const changeColor = (color) => {
    setNewSettings({ ...newSettings, color: color });
  };

  return (
    <div className="settings">
      <div className="top">
        <h2 className="fw-700">Settings</h2>{" "}
        <span className="close" onClick={closeModal}>
          &times;
        </span>
      </div>
      <div className="line"></div>
      <div className="setting-group time-setting-group">
        <div className="details">
          <div className="details-top">
            <h3>Time (minutes)</h3>
          </div>
        </div>
        <label>
          <div className="indicator">pomodoro</div>
          <input type="number" min="0" name="pomodoro" value={newSettings.pomodoro} onChange={handleChange} />
        </label>
        <label>
          <div className="indicator">short break</div>
          <input type="number" min="0" name="shortBreak" value={newSettings.shortBreak} onChange={handleChange} />
        </label>
        <label>
          <div className="indicator">long break</div>
          <input type="number" min="0"  name= "longBreak" value={newSettings.longBreak} onChange={handleChange} />
        </label>
      </div>

      <div className="line"></div>
      <div className="setting-group ">
        <div className="details">
          <div className="details-top">
            <h3>Font</h3>
          </div>
        </div>

        <div className="font-settings buttons">
          <div
            className={clsx("button kumbh-sans", {
              active: newSettings.font === "Kumbh Sans",
            })}
            onClick={() => changeFont("Kumbh Sans")}
          >
            Aa
          </div>
          <div
            className={clsx("button roboto-slab", {
              active: newSettings.font === "Roboto Slab",
            })}
            onClick={() => changeFont("Roboto Slab")}
          >
            Aa
          </div>
          <div
            className={clsx("button space-mono", {
              active: newSettings.font === "Space Mono",
            })}
            onClick={() => changeFont("Space Mono")}
          >
            Aa
          </div>
        </div>
      </div>

      <div className="line"></div>

      {/* color */}
      <div className="setting-group ">
        <div className="details">
          <div className="details-top">
            <h3>Color</h3>
          </div>
        </div>

        <div className="color-settings buttons">
          <div
            className={clsx("button coral-btn", {
              active: newSettings.color === "coral",
            })}
            onClick={() => changeColor("coral")}
          >
            <div className="check">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
          <div
            className={clsx("button skyblue-btn", {
              active: newSettings.color === "sky-blue",
            })}
            onClick={() => changeColor("sky-blue")}
          >
            <div className="check">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>

          <div
            className={clsx("button periwinkle-btn", {
              active: newSettings.color === "periwinkle",
            })}
            onClick={() => changeColor("periwinkle")}
          >
            <div className="check">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
        </div>
      </div>

      <button className="save" onClick={() => saveSettings(newSettings)}>
        Apply
      </button>
    </div>
  );
}

export default Settings;
