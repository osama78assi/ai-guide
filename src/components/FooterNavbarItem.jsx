export default function FooterNavbarItem({ to = "/", children }) {
    return (
        <a
            href={to}
            className="relative group inline-flex items-center px-3 py-2 text-[14px] font-medium tracking-wide text-(--color-text-primary) transition-all duration-300 ease-out hover:text-(--color-primary)"
        >
            {/* text */}
            <span className="relative z-10">
                {children}
            </span>

            {/* background hover layer (same as navbar item) */}
            <span className="absolute inset-0 rounded-t-xl bg-(--color-overlay-beige) opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />

            {/* centered expanding line (same behavior as navbar item) */}
            <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-(--color-accent-strong) transition-all duration-300 ease-out group-hover:w-full" />
        </a>
    );
}