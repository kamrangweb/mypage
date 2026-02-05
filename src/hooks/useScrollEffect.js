import { useEffect } from 'react';

export const useScrollEffect = () => {
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.port-header-change');
      if (!header) return;

      if (window.scrollY > 50) {
        header.classList.add('scrolled');
        header.style.position = 'fixed';
        header.style.padding = '0px';
        header.style.height = '65px';
      } else {
        header.classList.remove('scrolled');
        header.style.position = 'relative';
        header.style.padding = '1px 10px';
        header.style.height = 'auto';
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

export const useScrollProgress = () => {
  useEffect(() => {
    const calcScrollValue = () => {
      const scrollProgress = document.getElementById("progress");
      const progressValue = document.getElementById("progress-value");
      if (!scrollProgress || !progressValue) return;

      const pos = document.documentElement.scrollTop;
      const calcHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollValue = Math.min(Math.round((pos * 100) / calcHeight), 100);

      scrollProgress.style.display = pos > 100 ? "grid" : "none";
      scrollProgress.style.background = `conic-gradient(#006A71 ${scrollValue}%, #44A08D ${scrollValue}%)`;
    };

    window.addEventListener("scroll", calcScrollValue);
    calcScrollValue();
    return () => window.removeEventListener("scroll", calcScrollValue);
  }, []);
};
