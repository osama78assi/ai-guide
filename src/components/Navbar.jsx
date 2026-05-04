import lang from "../helper/lang";
import NavBarItem from "./NavbarItem";

export default function Navbar() {
    return (
        <div className="bg-(--color-bg-primary) text-(--color-text-primary) flex justify-between items-center px-4 py-3 h-[80px] relative shadow-[0px_10px_20px_#38302482] z-20">
            <div role="button" className="cursor-pointer">
                <img
                    src="/public/logo.svg"
                    alt="image"
                    className="object-contain h-[50px] rounded-xl"
                />
            </div>
            <div>
                <ul className="flex gap-5">
                    {lang.navbar.map((e) => 
                        <NavBarItem key={e.key} to={`#${e.id}`}>
                            {e.label}
                        </NavBarItem>
                    )}
                </ul>
            </div>
        </div>
    );
}
