import { useEffect, useRef, useState } from "react"

export default function ScrollToDiv(props) {
    const [scrollTarget, setScrollTarget] = useState(null);
    const ref = useRef(null);

    useEffect(() => {
        if (props.scrollToChild && ref.current) {
            const child = ref.current.children[props.scrollToChild];
            if (child) {
                const targetOffsetTop = child.offsetTop;
                setScrollTarget(targetOffsetTop);
            }
        }
    }, [props.scrollToChild]);

    useEffect(() => {
        if (scrollTarget !== null && ref.current) {
            const element = ref.current;

            let animation = null;
            const animate = () => {
                const scrollPos = element.scrollTop;
                element.scrollTop = scrollPos + (scrollTarget - scrollPos) / 100;
                
                if (Math.abs(scrollPos - scrollTarget) > 1) {
                    animation = requestAnimationFrame(animate);
                }
            };
            
            animation = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animation);
        }
    }, [scrollTarget]);

    return (
        <div {...props} ref={ref}>
            {props.children}
        </div>
    )
}

