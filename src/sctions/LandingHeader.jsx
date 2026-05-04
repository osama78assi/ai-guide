import Container from "../components/Container";
import lang from "../helper/lang";
import useLazyEffect from "../hooks/useLazyEffect";

export default function LandingHeader() {
    const { intersectionElementRef, shouldDo } = useLazyEffect();

    return (
        <div className="relative h-[calc(100dvh-80px)]">
            <img
                src="/imgs/landing-2.avif"
                className="w-full h-full object-cover"
                alt="landing"
            />

            <div
                ref={intersectionElementRef}
                className="absolute inset-0 pt-28 md:pt-36 lg:pt-[14rem] text-(--color-text-secondary)"
            >
                <Container>
                    <h1
                        className={`
                            text-4xl sm:text-5xl lg:text-7xl mb-8 lg:mb-10 font-semibold
                            transition-all duration-500 ease-out
                            ${shouldDo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}
                        `}
                    >
                        {lang.landing.header}
                    </h1>

                    <p
                        className={`
                            w-[90%] md:w-[450px] lg:w-[500px] ms-0 md:ms-8 lg:ms-16
                            text-xl text-(--color-text-primary)
                            transition-all duration-500 ease-out
                            ${shouldDo ? "opacity-100 translate-x-0" : "opacity-0 translate-x-100"}
                        `}
                    >
                        {lang.landing.content}
                    </p>
                </Container>
            </div>
        </div>
    );
}
