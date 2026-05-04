import Container from "./Container";

export default function SectionHeader({
    id,
    header,
    content,
    className,
    headerClasses = "text-(--color-text-secondary)",
    contentClasses = "text-(--color-text-primary)",
}) {
    return (
        <Container>
            <div className={`bg-red bg-300 ${className ? className : ""}`}>
                <div
                    className={`relative flex gap-6 mx-auto w-fit  ${headerClasses}`}
                >
                    <img src="/public/icons/star.svg" className="2-12 h-12" />

                    <div id={id} className="absolute -top-[50%] h-10 w-full" />

                    <h1 className={`text-4xl mb-10 font-semibold`}>{header}</h1>
                </div>

                <p className={`text-xl ${contentClasses}`}>{content}</p>
            </div>
        </Container>
    );
}
