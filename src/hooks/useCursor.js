import { useEffect } from 'react';

export const useCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    if (!cursor) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      cursor.style.top = y + "px";
      cursor.style.left = x + "px";
      cursor.style.display = 'block';
    };

    const handleMouseOut = () => {
      cursor.style.display = 'none';
    };

    const interactiveElements = document.querySelectorAll('a, button, .column-nav-links, input, textarea');
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => cursor.classList.add('active'));
      element.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);
};
