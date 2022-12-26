import React from "react";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import dance from "../assets/dance-music.mp3";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi";
import { IconContext } from "react-icons";

export default function Player() {
  const [isPlay, setIsPlay] = useState(false);

  const [time, setTime] = useState({
    min: "",
    sec: "",
  });
  
  const [currTime, setCurrTime] = useState({
    min: "",
    sec: "",
  });

  const [seconds, setSeconds] = useState();

  const [play, { pause, duration, sound }] = useSound(dance);

  useEffect(() => {
    if (duration) {
      const sec = duration / 1000;
      const min = Math.floor(sec / 60);
      const secRemain = Math.floor(sec % 60);
      setTime({
        min: min,
        sec: secRemain,
      });
    }
  }, [isPlay]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min = Math.floor(sound.seek([]) / 60);
        const sec = Math.floor(sound.seek([]) % 60);
        setCurrTime({
          min,
          sec,
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [sound]);

  const playingButton = () => {
    if (isPlay) {
      pause();
      setIsPlay(false);
    } else {
      play();
      setIsPlay(true);
    }
  };

  return (
    <div className="component">
      <h2>Play Your Music!🎶</h2>
      <img className="songCover" src="https://picsum.photos/300/300" />
      <div>
        <h3 className="title">Dance Music</h3>
        <p className="subTitle">Dance, dance music...</p>
      </div>
      <div>
        <div className="time">
          <h3>
            {currTime.min}:{currTime.sec}
          </h3>
          <h3>
            {time.min}:{time.sec}
          </h3>
        </div>
        <input
          type="range"
          min="0"
          max={duration / 1000}
          default="0"
          value={seconds}
          className="timeline"
          onChange={(e) => {
            sound.seek([e.target.value]);
          }}
        />
      </div>
      <div>
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#0d3b9e" }}>
            <BiSkipPrevious />
          </IconContext.Provider>
        </button>
        {!isPlay ? (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#0d3b9e" }}>
              <AiFillPlayCircle />
            </IconContext.Provider>
          </button>
        ) : (
          <button className="playButton" onClick={playingButton}>
            <IconContext.Provider value={{ size: "3em", color: "#0d3b9e" }}>
              <AiFillPauseCircle />
            </IconContext.Provider>
          </button>
        )}
        <button className="playButton">
          <IconContext.Provider value={{ size: "3em", color: "#0d3b9e" }}>
            <BiSkipNext />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}
