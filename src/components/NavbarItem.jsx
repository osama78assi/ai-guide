export default function NavBarItem({ to = "/", children }) {
    return (
        <li className="relative group list-none">
            <a href={to} className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden text-[15px] font-medium tracking-wide text-(--color-text-primary) transition-all duration-300 ease-out hover:text-(--color-primary)">
                <span className="relative z-10">
                    {children}
                </span>

                <span className="absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-(--color-accent-strong) transition-all duration-300 ease-out group-hover:w-full" />

                <span className="absolute inset-0 rounded-t-xl bg-(--color-overlay-beige) opacity-0 scale-90 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100" />
            </a>
        </li>
    );
}