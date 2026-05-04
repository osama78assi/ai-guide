import Container from "../components/Container";
import SectionHeader from "../components/SectionHeader";
import TutorialCard from "../components/TutorialCard";
import lang from "../helper/lang";
import useLazyEffect from "../hooks/useLazyEffect";

export default function VideosTutorial() {
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
                    id="tutorialVideos"
                    className="my-10!"
                    header={lang.tutorial.video.title}
                    content={lang.tutorial.video.content}
                    headerClasses={`
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-20"}
                    `}
                    contentClasses={`
                        transition-all duration-800 ease-out
                        ${shouldDo ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"}
                    `}
                />
            </div>

            <Container>
                <div className="flex flex-wrap justify-center gap-5">
                    {lang.tutorial.videos.map((v, i) => (
                        <TutorialCard key={v.id} {...v} animationDirection={i % 2 ? "ltr" : "rtl"} />
                    ))}
                </div>
            </Container>
        </div>
    );
}
