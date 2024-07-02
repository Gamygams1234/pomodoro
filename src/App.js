import React, { useState, useEffect } from "react";
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import Modal from "./components/Modal";

import clsx from "clsx";
import "./App.scss";

function App() {
  const times = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
  };
  const [showModal, setShowModal] = useState(false);
  const [settings, setSettings] = useState({
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    font: "Kumbh Sans",
    color: "coral",
    currentSetting: "pomodoro",
  });


  useEffect(()=>{
    console.log(settings)
  }, [settings])

  const openModal = () => {
    setShowModal(true);
  };
  const pomodoroClasses = clsx(["option" ,  { active: settings.currentSetting === "pomodoro" }]);
  const shortBreakClasses = clsx(["option",    { active: settings.currentSetting === "shortBreak" }]);
  const longBreakClasses = clsx(["option",  { active: settings.currentSetting === "longBreak" }]);

  const closeModal = () => {
    setShowModal(false);
  };

  const classNames = clsx(["App", settings.font.toLowerCase().replace(/\s+/g, "-"), settings.color]);
  const saveSettings = (newSettings) => {
    setSettings(newSettings);
    closeModal();
  };

  return (
    <div className={classNames} style={{ fontFamily: settings.font }}>
      <div className="logo mb-5">
        <img src="./assets/logo.svg" />
      </div>
      <div className="options mb-6">
        <div
          className={pomodoroClasses}
          onClick={() => {
            setSettings({ ...settings, currentSetting: "pomodoro" });
          }}
        >
          Pomodoro
        </div>
        <div
          className={shortBreakClasses}
          onClick={() => {
            setSettings({ ...settings, currentSetting: "shortBreak" });
          }}
        >
          Short Break
        </div>
        <div
          className={longBreakClasses}
          onClick={() => {
            setSettings({ ...settings, currentSetting: "longBreak" });
          }}
        >
          Long Break
        </div>
      </div>
      <div className="timer-outer">
      <Timer settings={settings} />
      </div>
  

      <div className="gear-icon" onClick={openModal}>
        <img src="./assets/icon-settings.svg" />
      </div>
      {showModal && (
        <Modal  closeModal={closeModal} >
          <Settings settings={settings} saveSettings={saveSettings} closeModal={closeModal}/>
        </Modal>
      )}
    </div>
  );
}

export default App;
