import { createContext, useContext, useEffect, useRef, useState } from "react";

const AudioContext = createContext();

function AudioProvider({ children }) {
    const [musicEnabled, setMusicEnabled] = useState(false);
    const [clickSoundEnabled, setClickSoundEnabled] = useState(false);

    const musicRef = useRef(null);

    useEffect(function () {
        musicRef.current = new Audio("/sounds/bg-music.mp3");
        musicRef.current.volume = 0.1;
        musicRef.current.loop = true;
    }, []);

    useEffect(function () {
        if (!musicRef.current) return;

        if (musicEnabled) musicRef.current.play();
        else musicRef.current.pause();
    }, [musicEnabled]);

    useEffect(function () {
        function handleGlobalClick() {
            if (!clickSoundEnabled) return;

            const audio = new Audio("/sounds/clicking_sound.wav");
            audio.volume = 0.05;
            audio.play();
        }

        document.addEventListener("click", handleGlobalClick);

        return function () {
            document.removeEventListener("click", handleGlobalClick);
        };
    }, [clickSoundEnabled]);

    function toggleMusic() {
        setMusicEnabled(function (prev) {
            return !prev;
        });
    }

    function toggleClickSound() {
        setClickSoundEnabled(function (prev) {
            return !prev;
        });
    }

    return (
        <AudioContext.Provider
            value={{
                musicEnabled,
                clickSoundEnabled,
                toggleMusic,
                toggleClickSound,
            }}
        >
            {children}
        </AudioContext.Provider>
    );
}

export function useAudio() {
    const value = useContext(AudioContext);
    if (value === undefined)
        throw new Error("useAudio is used outside AudioProvider");
    return value;
}

export default AudioProvider;