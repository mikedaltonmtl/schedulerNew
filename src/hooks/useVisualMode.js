import { useState } from "react";

export default function useVisualMode(initialMode) {

  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 2), newMode] : [...prev, newMode]);
  };

  const back = function() {
    setHistory(prev => prev.length < 2 ? prev : prev.slice(0, prev.length - 1));
  };

  return { mode: history[history.length - 1], transition, back };

};