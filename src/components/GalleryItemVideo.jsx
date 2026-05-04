import { useEffect, useRef, useState } from "react";
import lang from "../helper/lang";
import useLazyEffect from "../hooks/useLazyEffect";

export default function GalleryItemVideo({
    title = lang.gallery.ui.videoStandard.title,
    src,
    cover,
    prompt,
    promptDir = "rtl",
}) {
    const [activeTab, setActiveTab] = useState("video");
    const [copied, setCopied] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    const videoRef = useRef(null);
    const timeoutRef = useRef(null);

    const { intersectionElementRef, shouldDo } = useLazyEffect();

    useEffect(function cleanupEffect() {
        return function cleanup() {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    function handleCopy() {
        navigator.clipboard.writeText(prompt).catch(() => {});

        setCopied(true);
        setShowCopied(true);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(function () {
            setCopied(false);
            setShowCopied(false);
        }, 1000);
    }

    function handlePlayVideo() {
        setVideoLoaded(true);
        setTimeout(function () {
            if (videoRef.current) videoRef.current.play().catch(() => {});
        }, 0);
    }

    return (
        <>
            {/* Card */}
            <div
                ref={intersectionElementRef}
                className={`
                    overflow-x-hidden
                    group relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[0_4px_20px_var(--color-shadow)]
                    basis-full md:basis-[50%] mx-auto
                    transition-all duration-700 ease-out
                    ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                `}
            >
                {/* Header */}
                <div className="flex items-center justify-between gap-3 border-b border-[var(--color-border)] px-[18px] py-[13px]">
                    <h3 className="text-[0.88rem] font-semibold tracking-[0.01em] text-[var(--color-text-secondary)]">
                        {title}
                    </h3>

                    <div className="flex items-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] p-[3px]">
                        <button
                            onClick={function () { setActiveTab("video"); }}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "video"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img src="/public/icons/play-tab-icon.svg" className="h-3 w-3" />
                            {lang.gallery.ui.videoStandard.videoTab}
                        </button>

                        <button
                            onClick={function () { setActiveTab("prompt"); }}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "prompt"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img src="/public/icons/prompt-tab-icon.svg" className="h-3 w-3" />
                            {lang.gallery.ui.videoStandard.promptTab}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex min-h-0 flex-col relative">

                    {/* Video Tab */}
                    <div className="aspect-video w-full bg-black">
                        {!videoLoaded && shouldDo ? (
                            // Cover + play button
                            <button
                                onClick={handlePlayVideo}
                                className="group/play relative h-full w-full overflow-hidden"
                            >
                                {cover ? (
                                    <img
                                        src={cover}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover/play:scale-[1.05]"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-[var(--color-contrast-cool)]/30" />
                                )}
                                <div className="absolute inset-0 bg-black/30 transition group-hover/play:bg-black/45" />
                                <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--color-accent-strong)] shadow-[0_8px_24px_#b85c3860] transition-transform duration-200 group-hover/play:scale-110">
                                    <img
                                        src="/public/icons/video-cover-play-icon.svg"
                                        className="ml-[3px] h-5 w-5"
                                    />
                                </div>
                            </button>
                        ) : !videoLoaded && !shouldDo ? (
                            // Skeleton before lazy load
                            <div className="w-full h-full bg-[var(--color-contrast-cool)]/30 animate-pulse" />
                        ) : (
                            // Actual video with native controls
                            <video
                                ref={videoRef}
                                src={src}
                                controls
                                autoPlay
                                className="h-full w-full object-contain"
                            />
                        )}
                    </div>

                    {/* Prompt Tab — floats over the video, same as TutorialCard */}
                    {activeTab === "prompt" ? (
                        <div
                            dir={promptDir}
                            onClick={handleCopy}
                            className={`
                                absolute inset-0 flex flex-1 flex-col bg-[var(--color-bg-secondary)] overflow-auto p-[18px]
                                transition-all duration-700 ease-out
                                ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                            `}
                        >
                            <div className="flex flex-1 gap-2 rounded-xl h-fit border border-[var(--color-border)] bg-[var(--color-surface)] p-[14px_16px]">
                                <button
                                    className={`shrink-0 basis-[1.7rem] flex h-7 w-7 items-center justify-center rounded-lg border border-[var(--color-border)] ${
                                        copied
                                            ? "bg-[var(--color-accent-strong)] text-white"
                                            : "bg-[var(--color-bg-secondary)] text-[var(--color-accent-main)]"
                                    }`}
                                >
                                    <img
                                        src={copied ? "/icons/check-icon.svg" : "/icons/copy-icon.svg"}
                                        className="h-[13px] w-[13px]"
                                    />
                                </button>

                                <p className="basis-auto text-[0.84rem] italic leading-[1.7] text-[var(--color-text-secondary)]">
                                    {prompt}
                                </p>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Toast - copy prompt */}
            <div
                className={`fixed bottom-6 left-1/2 z-[99] -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-[18px] py-2 text-[0.75rem] text-[#f5efe6] transition-all ${
                    showCopied
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                }`}
            >
                {lang.gallery.ui.copyToast}
            </div>
        </>
    );
}