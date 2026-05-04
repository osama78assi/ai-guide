import { useRef, useState } from "react";
import useLazyEffect from "../hooks/useLazyEffect";

export default function StepCard({
    number,
    title,
    description,
    bad,
    badLabel = "✗",
    good,
    goodLabel = "✓",
    onClick,
    classes,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const bodyRef = useRef();

    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: {
            root: null,
            threshold: 0.2,
        },
    });

    function handleClick() {
        if (!bodyRef.current) return;

        if (isOpen) {
            bodyRef.current.style.height = "0px";
        } else {
            let totalHeight = 0;

            [...bodyRef.current.children].forEach((item) => {
                totalHeight += item.getBoundingClientRect().height;
            });

            bodyRef.current.style.height = `${totalHeight}px`;
        }

        setIsOpen(!isOpen);
        onClick?.();
    }

    return (
        <div
            ref={intersectionElementRef}
            className={`
                relative rounded-2xl border-[1.5px]
                border-[var(--color-border)] bg-[var(--color-bg-secondary)]
                shadow-[0_2px_8px_var(--color-shadow)]
                hover:-translate-y-0.5 hover:shadow-[0_6px_18px_var(--color-shadow)]
                select-none
                transition-all duration-800 ease-out
                ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                ${classes || ""}
            `}
        >
            <div
                className="flex flex-wrap items-start gap-4 cursor-pointer p-6"
                onClick={handleClick}
            >
                <div className="flex justify-between w-full">
                    <div className="flex items-center gap-5">
                        <span
                            className="text-5xl font-bold leading-none min-w-[3rem] flex items-center text-center shrink-0"
                            style={{
                                fontFamily: "'Ribeye Marrow', serif",
                                color: "var(--color-accent-strong)",
                            }}
                        >
                            {number}
                        </span>

                        <h3 className="text-lg font-semibold text-[var(--color-text-secondary)]">
                            {title}
                        </h3>
                    </div>

                    {/* Arrow */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="shrink-0 mt-1 transition-transform duration-300"
                        style={{
                            width: "2rem",
                            height: "2rem",
                            transform: isOpen
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                            fill: "var(--color-text-primary)",
                        }}
                    >
                        <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                    </svg>
                </div>

                <p className="text-sm leading-7 text-[var(--color-text-primary)]">
                    {description}
                </p>
            </div>

            <div
                ref={bodyRef}
                className="transition-[height] duration-300 ease-in-out h-0 overflow-hidden box-border"
            >
                {(bad || good) && (
                    <div className="mx-6 mb-6 border border-white/10 p-4">
                        <div className="rounded-xl overflow-hidden">
                            {bad && (
                                <div className="flex gap-3 items-start flex-row-reverse px-4 py-3 bg-[var(--color-error-bg)]">
                                    <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 bg-[var(--color-error-label-bg)] text-[var(--color-error-label-text)]">
                                        {badLabel}
                                    </span>

                                    <p className="text-[0.84rem] leading-relaxed text-right flex-1 text-[var(--color-error-text)]">
                                        {bad}
                                    </p>
                                </div>
                            )}

                            {good && (
                                <div className="flex gap-3 items-start flex-row-reverse px-4 py-3 bg-[var(--color-success-bg)]">
                                    <span className="text-[0.65rem] font-bold px-2 py-0.5 rounded-full whitespace-nowrap mt-0.5 bg-[var(--color-success-label-bg)] text-[var(--color-success-label-text)]">
                                        {goodLabel}
                                    </span>

                                    <p className="text-[0.84rem] leading-relaxed text-right flex-1 text-[var(--color-success-text)]">
                                        {good}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
