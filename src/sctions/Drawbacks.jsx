import lang from "../helper/lang";
import ListItemSection from "../components/ListItemSection";
import SectionHeader from "../components/SectionHeader";
import useLazyEffect from "../hooks/useLazyEffect";

export default function Drawbacks() {
    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: {
            root: null,
            threshold: 0.2,
        },
    });

    return (
        <div
            className="py-10 bg-(--color-bg-primary) overflow-x-hidden"
            ref={intersectionElementRef}
        >
            {/* Section Header */}
            <div className="py-5">
                <SectionHeader
                    id="disadvantages"
                    header={lang.drawbacks.header}
                    content={lang.drawbacks.content}
                    headerClasses={`
                        text-(--color-text-secondary)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
                    `}
                    contentClasses={`
                        text-(--color-text-primary)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                    `}
                />
            </div>

            {/* List */}
            <div className="flex flex-col gap-10">
                {lang.drawbacks.list.map((item, i) => (
                    <ListItemSection
                        key={item.src}
                        content={item.content}
                        number={item.number}
                        title={item.title}
                        src={item.src}
                        animationDirection={i % 2 ? "ltr" : "rtl"}
                        switchImgPos={i % 2}
                        cardClasses="bg-(--color-primary-soft)"
                        numberClasses="text-(--color-surface)"
                        titleClasses="text-(--color-surface)"
                        contentClasses="text-(--color-bg-primary)"
                    />
                ))}
            </div>
        </div>
    );
}