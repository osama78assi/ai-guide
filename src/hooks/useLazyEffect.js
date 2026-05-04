import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function useLazyEffect({
    observerOptions = {
        root: null, // Check intersection with viewport
        threshold: 0, // As soon as possible
    },
} = {}) {
    const intersectionElementRef = useRef(null);
    const [shouldDo, setHowDo] = useState(false);

    useEffect(() => {
        // Avoid Ref stale state
        const element = intersectionElementRef.current;
        if (!element) return;

        async function observerCallback(entries, observer) {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    // This must re-render to be able to do something
                    setHowDo(true);

                    // Stop observing
                    observer.unobserve(entry.target);
                }
            }
        }

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions,
        );
        observer.observe(element); // Observe the element

        return () => {
            observer.unobserve(element);
            observer.disconnect();
        };
    }, []);

    return { intersectionElementRef,  shouldDo };
}
