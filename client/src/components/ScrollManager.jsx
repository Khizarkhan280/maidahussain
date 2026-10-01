import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const KEY = "scroll-pos";
const RESTORE_DELAY = 600; // ms to wait before scrolling back

// we handle scroll restoration ourselves, so the browser doesn't jump on its own
if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
}

const isReload = () =>
    performance.getEntriesByType("navigation")[0]?.type === "reload";

export default function ScrollManager() {
    const { pathname } = useLocation();
    const initialPath = useRef(pathname);
    const leftInitialPage = useRef(false);

    // 1. remember the scroll position when the page is reloaded / closed / hidden
    useEffect(() => {
        const save = () => {
            try {
                sessionStorage.setItem(
                    KEY,
                    JSON.stringify({
                        path: window.location.pathname,
                        x: window.scrollX,
                        y: window.scrollY,
                    })
                );
            } catch {
                /* storage unavailable, ignore */
            }
        };
        const onVisibility = () => {
            if (document.visibilityState === "hidden") save();
        };

        window.addEventListener("pagehide", save);
        document.addEventListener("visibilitychange", onVisibility);
        return () => {
            window.removeEventListener("pagehide", save);
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    // 2. on every page: restore (reload only) or start from the top
    useEffect(() => {
        if (pathname !== initialPath.current) leftInitialPage.current = true;

        if (!leftInitialPage.current && isReload()) {
            let saved = null;
            try {
                saved = JSON.parse(sessionStorage.getItem(KEY));
            } catch {
                /* ignore */
            }

            if (saved && saved.path === pathname && saved.y > 0) {
                let timer;

                const go = () => {
                    timer = setTimeout(() => {
                        window.scrollTo({ top: saved.y, left: saved.x || 0, behavior: "smooth" });
                    }, RESTORE_DELAY);
                };

                if (document.readyState === "complete") {
                    go();
                } else {
                    window.addEventListener("load", go, { once: true });
                }

                return () => {
                    clearTimeout(timer);
                    window.removeEventListener("load", go);
                };
            }
        }

        // new page / normal visit: always start at the top (instant, not animated)
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, [pathname]);

    return null;
}