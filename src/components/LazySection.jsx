'use client'

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';

/**
 * LazySection — Only loads the component when it scrolls into view.
 * Unlike React.lazy alone (which starts downloading immediately),
 * this delays both download AND parse until the user scrolls near the section.
 */
export default function LazySection({ importFn, fallbackHeight = '50vh', rootMargin = '200px' }) {
    const ref = useRef(null);
    const [Component, setComponent] = useState(null);

    useEffect(() => {
        if (!ref.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Start loading the chunk only when visible
                    const LazyComp = lazy(importFn);
                    setComponent(() => LazyComp);
                    observer.disconnect();
                }
            },
            { rootMargin }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [importFn, rootMargin]);

    if (!Component) {
        return <div ref={ref} style={{ minHeight: fallbackHeight }} />;
    }

    return (
        <div ref={ref}>
            <Suspense fallback={<div style={{ minHeight: fallbackHeight }} />}>
                <Component />
            </Suspense>
        </div>
    );
}
