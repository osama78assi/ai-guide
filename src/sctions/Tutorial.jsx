import lang from "../helper/lang";
import SectionHeader from "../components/SectionHeader";
import StepCard from "../components/StepCard";
import useLazyEffect from "../hooks/useLazyEffect";

export default function Tutorial() {
    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: {
            root: null,
            threshold: 0.2,
        },
    });

    return (
        <div
            ref={intersectionElementRef}
            className="py-10 bg-(--color-primary-soft)"
        >
            {/* Section Header */}
            <div
                className={`
                    py-5
                    transition-all duration-800 ease-out
                    ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
                `}
            >
                <SectionHeader
                    id="tutorial"
                    header={lang.tutorial.header}
                    content={lang.tutorial.content}
                    headerClasses="text-(--color-surface)"
                    contentClasses="text-(--color-bg-primary)"
                />
            </div>

            {/* Cards */}
            <div className="flex flex-wrap justify-center py-5 gap-5">
                {lang.tutorial.list.map((item) => (
                    <div
                        key={item.number}
                        className={`
                            basis-[95%] mx-auto
                            transition-all duration-800 ease-out
                            ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
                        `}
                    >
                        <StepCard
                            title={item.title}
                            description={item.description}
                            good={item.good}
                            number={item.number}
                            bad={item.bad}
                            goodLabel={item.goodLabel}
                            badLabel={item.badLabel}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
