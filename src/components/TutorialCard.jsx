import { useEffect, useRef, useState } from "react";
import lang from "../helper/lang";
import { useAudio } from "../context/AudioProvider";
import useLazyEffect from "../hooks/useLazyEffect";

export default function TutorialCard({
    title = lang.tutorial.videoStandard.title,
    videoSrc = "",
    cover = "",
    videoDuration = lang.tutorial.videoStandard.videoDuration,
    promptDir = "rtl",
    prompt = lang.tutorial.videoStandard.prompt,
    animationDirection = "rtl",
}) {
    const { musicRef } = useAudio();

    const [activeTab, setActiveTab] = useState("video");
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const videoRef = useRef(null);
    const timeoutRef = useRef(null);

    const musicWasPlayingRef = useRef(false);

    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: { threshold: 0.2 },
    });

    const isLTR = animationDirection === "ltr";

    const hiddenX = isLTR ? "-translate-x-20" : "translate-x-20";

    useEffect(function cleanupEffect() {
        return function cleanup() {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    function handleCopy() {
        navigator.clipboard.writeText(prompt).catch(() => {});

        setCopied(true);
        setShowToast(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(function () {
            setCopied(false);
            setShowToast(false);
        }, 2000);
    }

    function handlePlayVideo() {
        setVideoLoaded(true);

        setTimeout(function () {
            if (videoRef.current) videoRef.current.play().catch(() => {});
        }, 0);
    }

    // To pause the music while watching the video
    function handleVideoPlay() {
        if (!musicRef?.current) return;

        musicWasPlayingRef.current = !musicRef.current.paused;

        if (musicWasPlayingRef.current) {
            musicRef.current.pause();
        }
    }

    function handleVideoEnd() {
        if (musicRef?.current && musicWasPlayingRef.current) {
            musicRef.current.play().catch(() => {});
        }

        musicWasPlayingRef.current = false;
    }

    return (
        <div
            ref={intersectionElementRef}
            className={`
                relative flex basis-full md:basis-[calc(50%-2rem)] flex-col overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[0_4px_20px_var(--color-shadow)]
                transition-all duration-700 ease-out
                ${shouldDo ? "opacity-100 translate-x-0" : `opacity-0 ${hiddenX}`}
            `}
        >
            <div className="flex flex-col">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-3 border-b border-[var(--color-border)] px-[18px] py-[13px]">
                    <h3 className="text-[0.88rem] font-semibold tracking-[0.01em] text-[var(--color-text-secondary)]">
                        {title}
                    </h3>

                    <div className="flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-[3px]">
                        <button
                            onClick={() => setActiveTab("video")}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "video"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img
                                src="/icons/play-tab-icon.svg"
                                className="h-3 w-3"
                            />
                            {lang.tutorial.videoStandard.ui.videoTab}
                        </button>

                        <button
                            onClick={() => setActiveTab("prompt")}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "prompt"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img
                                src="/icons/prompt-tab-icon.svg"
                                className="h-3 w-3"
                            />
                            {lang.tutorial.videoStandard.ui.promptTab}
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 flex-col overflow-hidden relative">
                    <div className="flex relative flex-1 bg-[#1a130a]">
                        {!videoLoaded && cover ? (
                            <button
                                onClick={handlePlayVideo}
                                className={`
                                    group relative h-full w-full overflow-hidden
                                    transition-all duration-700 ease-out
                                    ${shouldDo ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                                `}
                            >
                                <img
                                    src={cover}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40" />
                                <div className="absolute left-1/2 top-1/2 flex h-[72px] w-[72px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent-strong)] shadow-[0_10px_30px_#b85c3880]">
                                    <img
                                        src="/icons/video-cover-play-icon.svg"
                                        className="ml-[3px] h-7 w-7"
                                    />
                                </div>
                            </button>
                        ) : (
                            <video
                                ref={videoRef}
                                src={videoSrc}
                                controls
                                autoPlay
                                onPlay={handleVideoPlay}
                                onEnded={handleVideoEnd}
                                className="h-full w-full object-contain"
                            />
                        )}
                    </div>

                    {activeTab === "prompt" ? (
                        <div
                            className={`
                                absolute inset-0 flex flex-1 flex-col bg-[var(--color-bg-secondary)] overflow-auto p-[18px]
                                transition-all duration-700 ease-out
                                ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                            `}
                        >
                            <p className="mb-2 flex items-center gap-[5px] text-[0.65rem] font-medium uppercase tracking-[0.08em] text-[var(--color-accent-main)]">
                                <span className="block h-[1.5px] w-4 rounded-[2px] bg-[var(--color-accent-soft)]" />
                                {lang.tutorial.videoStandard.ui.promptHint}
                            </p>

                            <div
                                onClick={handleCopy}
                                className="relative flex-1 cursor-pointer rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-[14px_16px]"
                            >
                                <p
                                    dir={promptDir}
                                    className="pr-7 text-[0.84rem] italic leading-[1.7] text-[var(--color-text-secondary)] break-words"
                                >
                                    {prompt}
                                </p>

                                <button
                                    className={`absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] ${
                                        copied
                                            ? "bg-[var(--color-accent-strong)] text-white"
                                            : "bg-[var(--color-bg-secondary)] text-[var(--color-accent-main)]"
                                    }`}
                                >
                                    <img
                                        src={
                                            copied
                                                ? "/icons/check-icon.svg"
                                                : "/icons/copy-icon.svg"
                                        }
                                        className="h-[13px] w-[13px]"
                                    />
                                </button>
                            </div>
                        </div>
                    ) : null}
                </div>

                <div className="flex items-center gap-1.5 border-t border-[var(--color-border)] px-[18px] pb-[14px] pt-[10px]">
                    <div
                        className={`h-1.5 rounded-[3px] transition-all ${
                            activeTab === "video"
                                ? "w-[18px] bg-[var(--color-accent-strong)]"
                                : "w-[6px] bg-[var(--color-border)]"
                        }`}
                    />

                    <div
                        className={`h-1.5 rounded-[3px] transition-all ${
                            activeTab === "prompt"
                                ? "w-[18px] bg-[var(--color-accent-strong)]"
                                : "w-[6px] bg-[var(--color-border)]"
                        }`}
                    />

                    <span className="ml-auto text-[0.68rem] text-[var(--color-accent-main)] opacity-80">
                        {activeTab === "video"
                            ? lang.tutorial.videoStandard.ui.watchHint
                            : lang.tutorial.videoStandard.ui.promptHint}
                    </span>

                    <span className="rounded-full border border-[#c2a87830] bg-[#1a130acc] px-2 py-[2px] text-[0.65rem] text-[#c2a878]">
                        {videoDuration}
                    </span>
                </div>
            </div>

            <div
                className={`
                    fixed bottom-6 left-1/2 z-[99] -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-[18px] py-2 text-[0.75rem] text-[#f5efe6]
                    transition-all duration-500 ease-out
                    ${
                        showToast
                            ? "translate-y-0 opacity-100"
                            : "translate-y-2 opacity-0"
                    }
                `}
            >
                {lang.tutorial.videoStandard.ui.copiedToast}
            </div>
        </div>
    );
}
