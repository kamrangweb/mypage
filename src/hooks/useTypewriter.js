import { useEffect, useRef } from 'react';

export const useTypewriter = (element, toRotate, period = 2000) => {
  const loopNum = useRef(0);
  const txt = useRef('');
  const isDeleting = useRef(false);
  const timerRef = useRef(null); // Timer'ı kontrol etmek için

  useEffect(() => {
    if (!element) return;

    const tick = () => {
      const i = loopNum.current % toRotate.length;
      const fullTxt = toRotate[i];

      if (isDeleting.current) {
        txt.current = fullTxt.substring(0, txt.current.length - 1);
      } else {
        txt.current = fullTxt.substring(0, txt.current.length + 1);
      }

      const wrap = element.querySelector('.wrap');
      if (wrap) wrap.innerHTML = txt.current;

      // Yazma hızı
      let delta = 150 - Math.random() * 100;

      // Silme hızı (daha hızlı silmesi için)
      if (isDeleting.current) {
        delta /= 2;
      }

      // --- DURAKLAMA MANTIKLARI ---

      // 1. Cümle tamamen yazıldıysa: Period kadar bekle ve silmeye başla
      if (!isDeleting.current && txt.current === fullTxt) {
        delta = period; 
        isDeleting.current = true;
      } 
      // 2. Cümle tamamen silindiyse: Bir anlık dur (örn: 1 saniye) ve yeni cümleye geç
      else if (isDeleting.current && txt.current === '') {
        isDeleting.current = false;
        loopNum.current++;
        delta = 1000; // Burası yeni cümleye geçmeden önceki duraklama süresi (ms)
      }

      timerRef.current = setTimeout(tick, delta);
    };

    tick();

    // Cleanup: Component unmount olduğunda veya bağımlılıklar değiştiğinde timer'ı durdur
    return () => clearTimeout(timerRef.current);
  }, [element, toRotate, period]);
};