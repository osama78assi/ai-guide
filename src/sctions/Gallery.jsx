import lang from "../helper/lang";
import GalleryItem from "../components/GalleryItem";
import SectionHeader from "../components/SectionHeader";
import Container from "../components/Container";
import useLazyEffect from "../hooks/useLazyEffect";
import GalleryItemVideo from "../components/GalleryItemVideo";

export default function Gallery() {
    const { intersectionElementRef, shouldDo } = useLazyEffect({
        observerOptions: {
            root: null,
            threshold: 0.2,
        },
    });

    return (
        <div
            ref={intersectionElementRef}
            className="py-10 bg-(--color-primary-soft) overflow-hidden"
        >
            <div className="py-5">
                <SectionHeader
                    id="gallery"
                    header={lang.gallery.header}
                    content={lang.gallery.content}
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

            {/* Gallery */}
            <Container>
                <div className="flex flex-wrap justify-between gap-y-10">
                    {lang.gallery.images.map((item) => (
                        <GalleryItem key={item.src} {...item} />
                    ))}

                    <GalleryItemVideo
                    promptDir="ltr"
                        cover={lang.gallery.video.cover}
                        prompt={lang.gallery.video.prompt}
                        src={lang.gallery.video.src}
                        title={lang.gallery.video.title}
                    />
                </div>
            </Container>
        </div>
    );
}
