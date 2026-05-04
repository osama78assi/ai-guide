import lang from "../helper/lang";
import ListItemSection from "../components/ListItemSection";
import SectionHeader from "../components/SectionHeader";
import useLazyEffect from "../hooks/useLazyEffect";

export default function Advantages() {
    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: {
            root: null,
            threshold: 0.2,
        },
    });

    return (
        <div
            className="py-10 bg-(--color-primary-soft) overflow-x-hidden"
            ref={intersectionElementRef}
        >
            {/* Header container */}
            <div
                className="py-5"
            >
                <SectionHeader
                    id="advantages"
                    header={lang.advantages.header}
                    content={lang.advantages.content}
                    headerClasses={`
                        text-(--color-surface)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
                    `}
                    contentClasses={`
                        text-(--color-bg-primary)
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                    `}
                />
            </div>

            {/* List */}
            <div className="flex flex-col gap-10">
                {lang.advantages.list.map((item, i) => (
                    <ListItemSection
                        key={item.src}
                        content={item.content}
                        number={item.number}
                        title={item.title}
                        src={item.src}
                        animationDirection={i % 2 ? "ltr" : "rtl"}
                        switchImgPos={i % 2}
                    />
                ))}
            </div>
        </div>
    );
}
