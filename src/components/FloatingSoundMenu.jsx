import { useState } from "react";
import { useAudio } from "../context/AudioProvider";

function FloatingSoundMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const { musicEnabled, clickSoundEnabled, toggleMusic, toggleClickSound } =
        useAudio();

    const handleToggleMenu = () => {
        setIsOpen(function (prev) {
            return !prev;
        });
    };

    const itemButton =
        "absolute right-0 w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all duration-300 bg-[var(--color-surface)]";

    const iconClass = "w-5 h-5 block";

    const settingsButton =
        "w-12 h-12 rounded-full flex items-center justify-center bg-[var(--color-surface)] shadow-lg shadow-[0px_0px_10px_#333]";

    return (
        <div className="fixed bottom-6 right-6 z-50 rtl">
            <button
                onClick={toggleMusic}
                className={`
                    ${itemButton} flex items-center justify-center
                    ${
                        isOpen
                            ? "translate-y-[-80px] opacity-100"
                            : "translate-y-0 opacity-0 pointer-events-none"
                    }
                `}
            >
                <img
                    src={
                        musicEnabled
                            ? "/icons/music-on.svg"
                            : "/icons/music-off.svg"
                    }
                    className={iconClass}
                    alt=""
                />
            </button>

            <button
                onClick={toggleClickSound}
                className={` ${itemButton} flex items-center justify-center
                    ${
                        isOpen
                            ? "translate-y-[-160px] opacity-100"
                            : "translate-y-0 opacity-0 pointer-events-none"
                    }
                `}
            >
                <img
                    src={
                        clickSoundEnabled
                            ? "/icons/sound-on.svg"
                            : "/icons/sound-off.svg"
                    }
                    className={iconClass}
                    alt=""
                />
            </button>

            <button onClick={handleToggleMenu} className={settingsButton}>
                <img
                    src="/icons/setting.svg"
                    className="w-7 h-7 block"
                    alt=""
                />
            </button>
        </div>
    );
}

export default FloatingSoundMenu;
