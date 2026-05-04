import { useEffect, useRef, useState } from "react";
import lang from "../helper/lang";
import useLazyEffect from "../hooks/useLazyEffect";

export default function GalleryItem({
    title = lang.gallery.ui.imageStandard.title,
    src,
    prompt,
}) {
    const [activeTab, setActiveTab] = useState("image");
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showCopied, setShowCopied] = useState(false);
    const { intersectionElementRef, shouldDo } = useLazyEffect();

    // Handle escape button
    useEffect(() => {
        const ele = intersectionElementRef.current;
        if (ele === null) {
            return;
        }

        function handleEscClick(e) {
            if (e.key === "Escape") {
                e.preventDefault();
                setOpen(false);
            }
        }

        addEventListener("keydown", handleEscClick);
        return () => removeEventListener("keydown", handleEscClick);
    }, []);

    function showImgFull() {
        setShowToast(true);
        setOpen(true);

        let t = setTimeout(() => {
            setShowToast(false);
            clearTimeout(t);
        }, 1000);
    }

    function handleCopy() {
        navigator.clipboard.writeText(prompt).catch(() => {});

        setCopied(true);
        setShowCopied(true);

        let t = setTimeout(function resetToast() {
            setCopied(false);
            setShowCopied(false);
            clearTimeout(t);
        }, 1000);
    }

    return (
        <>
            {/* Card */}
            <div
                ref={intersectionElementRef}
                className={`
                    overflow-x-hidden
                    group relative h-[300px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-secondary)] shadow-[0_4px_20px_var(--color-shadow)]
                    basis-full md:basis-[calc(50%-3rem)] lg:basis-[calc(33.333333%-3rem)]
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
                            onClick={function () {
                                setActiveTab("image");
                            }}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "image"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img
                                src="/public/icons/grid-icon.svg"
                                className="h-3 w-3"
                            />
                            {lang.gallery.ui.imageStandard.imgTab}
                        </button>

                        <button
                            onClick={function () {
                                setActiveTab("prompt");
                            }}
                            className={`flex items-center gap-[5px] rounded-full px-3 py-1 text-[0.7rem] font-medium transition-all ${
                                activeTab === "prompt"
                                    ? "bg-[var(--color-accent-strong)] text-white"
                                    : "text-[var(--color-primary-soft)]"
                            }`}
                        >
                            <img
                                src="/public/icons/prompt-tab-icon.svg"
                                className="h-3 w-3"
                            />
                            {lang.gallery.ui.imageStandard.promptTab}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex h-[calc(100%)] flex-col overflow-hidden relative">
                    {/* Image Tab */}
                    <div
                        className={`${activeTab === "image" ? "flex" : "hidden"} relative flex-1 overflow-hidden`}
                    >
                        {shouldDo ? (
                            <img
                                src={src}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.05]"
                            />
                        ) : (
                            <div className="w-full flex justify-center">
                                <div className="w-full aspect-[4/5] bg-[var(--color-contrast-cool)]/30 animate-pulse" />
                            </div>
                        )}

                        <div className="absolute inset-0 bg-black/10 transition group-hover:bg-black/25" />

                        {/* hover action */}
                        <button
                            onClick={showImgFull}
                            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl bg-[var(--color-accent-strong)] text-white opacity-0 transition group-hover:opacity-100"
                        >
                            <img
                                src="/public/icons/grid-icon.svg"
                                className="h-[18px] w-[18px]"
                            />
                        </button>
                    </div>

                    {/* Prompt Tab */}
                    {activeTab === "prompt" ? (
                        <div
                            onClick={handleCopy}
                            className={`
                                flex flex-1 p-[18px] absolute inset-0 overflow-auto h-[240px]!
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
                                        src={
                                            copied
                                                ? "/icons/check-icon.svg"
                                                : "/icons/copy-icon.svg"
                                        }
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

            {/* Modal */}
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center">
                    {/* backdrop */}
                    <div
                        onClick={function () {
                            setOpen(false);
                        }}
                        className="absolute inset-0 bg-black/60"
                    />

                    {/* modal */}
                    <div className="relative z-[101] flex h-[85vh] w-[90vw] max-w-5xl flex-col overflow-auto rounded-2xl bg-[var(--color-bg-secondary)] shadow-2xl">
                        {/* header */}
                        <div className="flex sticky top-0 bg-[var(--color-bg-secondary)] items-center justify-between border-b border-[var(--color-border)] px-4 py-3">
                            <button
                                onClick={function () {
                                    setOpen(false);
                                }}
                            >
                                <img
                                    src="/public/icons/close-icon.svg"
                                    className="h-[18px] w-[18px]"
                                />
                            </button>
                        </div>

                        {/* image */}
                        <div className="flex flex-1 items-center justify-center bg-black">
                            <img
                                src={src}
                                className="max-h-full max-w-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Toast - open message */}
            <div
                className={`fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 rounded-full bg-[var(--color-primary)] px-[18px] py-2 text-[0.75rem] text-[#f5efe6] transition-all ${
                    showToast
                        ? "translate-y-0 opacity-100"
                        : "translate-y-2 opacity-0"
                }`}
            >
                {lang.gallery.ui.clickEscToast}
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
