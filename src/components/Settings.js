import React, { useState } from "react";
import "./Settings.scss";
function Settings({ settings, saveSettings, closeModal }) {
  const [newSettings, setNewSettings] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSettings({ ...newSettings, [name]: value });
  };

  return (
    <div className="settings">
      <div className="top">
        <h2 className= "fw-700">Settings</h2>{" "}
        <span className="close" onClick={closeModal}>
          &times;
        </span>
      </div>

      <div className="details">

        <div className="details-top">

          <h3>Time (minutes)</h3>
        </div>
      </div>
      <label>
        Pomodoro:
        <input type="number" name="pomodoro" value={newSettings.pomodoro} onChange={handleChange} />
      </label>
      <label>
        Short Break:
        <input type="number" name="shortBreak" value={newSettings.shortBreak} onChange={handleChange} />
      </label>
      <label>
        Long Break:
        <input type="number" name="longBreak" value={newSettings.longBreak} onChange={handleChange} />
      </label>
      <label>
        Font:
        <select name="font" value={newSettings.font} onChange={handleChange}>
          <option value="Kumbh Sans">Kumbh Sans</option>
          <option value="Roboto Slab">Roboto Slab</option>
          <option value="Space Mono">Space Mono</option>
        </select>
      </label>
      {/* <label>
        Color:
        <input type="color" name="color" value={newSettings.color} onChange={handleChange} />
      </label> */}
      <button className="save" onClick={() => saveSettings(newSettings)}>Apply</button>
    </div>
  );
}

export default Settings;
