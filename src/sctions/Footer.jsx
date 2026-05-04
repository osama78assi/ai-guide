import lang from "../helper/lang";
import FooterNavbarItem from "../components/FooterNavbarItem";

export default function Footer() {
    return (
        <footer className="bg-(--color-bg-primary) text-(--color-text-primary) border-t border-(--color-border)">
            <div className="flex flex-col md:flex-row gap-10 px-10 py-12">
                {/* LOGO */}
                <div className="md:w-1/3 flex items-center justify-center">
                    <img
                        src="/public/logo.svg"
                        alt="logo"
                        className="h-[110px] w-auto object-contain"
                    />
                </div>

                {/* CONTENT */}
                <div className="md:w-1/3 flex items-center justify-end text-right text-(--color-text-secondary) text-[14px] leading-relaxed">
                    {lang.footer.description}
                </div>

                {/* VERTICAL NAVBAR */}
                <div className="md:w-1/3 flex justify-center">
                    <ul className="flex flex-col gap-3 w-[50%]">
                        {lang.footer.links.map((item) => (
                            <FooterNavbarItem
                                key={item.key}
                                to={`#${item.id}`}
                                className="w-full"
                            >
                                {item.label}
                            </FooterNavbarItem>
                        ))}
                    </ul>
                </div>
            </div>

            {/* bottom bar */}
            <div className="px-10 py-4 text-center border-t border-(--color-border) text-[12px] text-(--color-text-secondary)">
                {lang.footer.bar}
            </div>
        </footer>
    );
}
