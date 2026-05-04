import useLazyEffect from "../hooks/useLazyEffect";

export default function ListItemSection({
    number,
    title,
    content,
    switchImgPos = true,
    animationDirection = "ltr", // "ltr" | "rtl"
    src,
    alt = "image",
    cardClasses = "bg-(--color-bg-primary)",
    numberClasses = "text-(--color-accent-strong)",
    titleClasses = "text-(--color-text-secondary)",
    contentClasses = "text-(--color-text-primary)",
}) {
    const { intersectionElementRef, shouldDo } = useLazyEffect({observerOptions: {threshold: 0.2}});

    const isLTR = animationDirection === "ltr";

    const hiddenX = isLTR ? "-translate-x-48" : "translate-x-48";

    return (
        <div
            ref={intersectionElementRef}
            className={`
                flex-wrap info-container rounded-xl mx-auto flex flex-col
                ${switchImgPos ? "md:flex-row" : "md:flex-row-reverse"}
                ${cardClasses}
                transition-all duration-800 ease-out
                ${shouldDo ? "opacity-100 translate-x-0" : `opacity-0 ${hiddenX}`}
            `}
        >
            {/* TEXT */}
            <div
                className={`
                    p-5 flex-1
                    transition-all duration-800 ease-out
                    ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                `}
            >
                <span
                    className={`
                        w-fit! font-['Ribeye_Marrow']! text-6xl font-semibold
                        ${numberClasses}
                    `}
                >
                    {number}
                </span>

                <div className="mt-4">
                    <h2 className={`text-2xl mb-6 ${titleClasses}`}>
                        {title}
                    </h2>

                    <p className={`leading-7 ${contentClasses}`}>
                        {content}
                    </p>
                </div>
            </div>

            {/* IMAGE */}
            <div className="basis-auto w-full h-120 md:w-auto md:h-125 p-3 lg:text-blue-50">
                {shouldDo ? (
                    <img
                        src={src}
                        alt={alt}
                        className="rounded-xl h-full mx-auto object-contain transition-all duration-800 ease-out opacity-100"
                    />
                ) : (
                    <div className="h-full flex justify-center">
                        <div className="h-full aspect-[4/5] bg-[var(--color-contrast-cool)]/30 animate-pulse rounded-xl" />
                    </div>
                )}
            </div>
        </div>
    );
}