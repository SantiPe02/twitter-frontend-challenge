import { useEffect } from "react";

export const useInfiniteScroll = (
  ref: React.MutableRefObject<HTMLDivElement | null>,
  onScrollCallback: () => void,
  observerOptions: IntersectionObserverInit
) => {
  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        onScrollCallback();
      }
    }, observerOptions);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [observerOptions, onScrollCallback, ref]);
};
