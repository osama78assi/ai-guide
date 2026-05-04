import React from "react";
import lang from "../helper/lang";
import SectionHeader from "../components/SectionHeader";
import useLazyEffect from "../hooks/useLazyEffect";

export default function Intro() {
    const { intersectionElementRef, shouldDo } = useLazyEffect({observerOptions: {threshold: 0.5}});

    return (
        <div
            className="py-20 bg-(--color-bg-primary)"
            ref={intersectionElementRef}
        >
            {/* Header (split animation instead of SectionHeader internal) */}
            <div className="text-center mb-10">
                <h2
                    className={`
                        text-3xl md:text-4xl font-semibold text-(--color-text-secondary)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
                    `}
                >
                    {lang.intro.header}
                </h2>

                <p
                    className={`
                        mt-4 text-(--color-text-primary)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                    `}
                >
                    {lang.intro.content}
                </p>
            </div>

            {/* Image Section */}
            <div className="relative w-full">
                {/* small to medium screen */}
                <div className="block lg:hidden mt-12 px-6">
                    <div className="relative w-full h-[320px] sm:h-[380px] rounded-2xl overflow-hidden bg-(--color-accent-soft)">
                        <img
                            src="/imgs/landing.avif"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-(--color-overlay-beige)" />
                    </div>
                </div>

                {/* large screen stack */}
                <div className="hidden lg:block relative w-[630px] mx-auto mt-12 rounded-2xl">
                    {/* back images */}
                    <div
                        className={`
                            absolute z-2 w-[600px] left-0 rounded-2xl overflow-hidden
                            transition-all duration-800 ease-out
                            ${shouldDo ? "opacity-100 translate-y-0 rotate-1" : "opacity-0 translate-y-16 rotate-6"}
                        `}
                    >
                        <img src="/imgs/stack-1.avif" className="w-full" />
                    </div>

                    <div
                        className={`
                            absolute z-1 w-[600px] left-0 rounded-2xl overflow-hidden
                            transition-all duration-800 ease-out
                            ${shouldDo ? "opacity-100 translate-y-0 rotate-6" : "opacity-0 translate-y-20 rotate-12"}
                        `}
                    >
                        <img src="/imgs/stack-2.avif" className="w-full" />
                    </div>

                    {/* main image */}
                    <div
                        className={`
                            relative z-3 w-[600px] h-[400px] rounded-2xl overflow-hidden shadow-2xl bg-(--color-accent-soft)
                            transition-all duration-800 ease-out
                            ${shouldDo ? "opacity-100 translate-y-0 rotate-[-3deg]" : "opacity-0 translate-y-24 rotate-0"}
                        `}
                    >
                        {shouldDo ? (
                            <>
                                <img
                                    src="/imgs/landing.avif"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-(--color-overlay-beige)" />
                            </>
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="w-full aspect-[4/5] bg-[var(--color-contrast-cool)]/30 animate-pulse rounded-xl" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}   