import { useEffect, useRef, type HTMLAttributes } from 'react';

// Calibrated in video-assets/hero-preview.html. Times are timeline seconds.
export const atmosphereConfig = {
  atmosphereSize: 94, spacing: 6.3, speed: 2, bgInStart: 0,
  bgInDuration: 3.25, bgOutStart: 15.4, bgOutDuration: 7.85,
  tail: 0, brightness: 59, drift: 12, startSize: 79, midSize: 71, endSize: 156,
} as const;
let blurDisabled = false;
const blurSubscribers = new Set<() => void>();

export function AnimatedAtmosphere(props: HTMLAttributes<HTMLDivElement>) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = root.current!;
    const lights = Array.from(element.querySelectorAll<HTMLElement>('[data-atmosphere-light]'));
    const c = atmosphereConfig;
    const duration = c.bgOutStart + c.bgOutDuration + c.tail;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, last: number | null = null, time = 0, visible = false;
    let frameWindow: number[] = [], slowDuration = 0;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const smooth = (v: number) => { const x = clamp(v); return x*x*x*(x*(x*6-15)+10); };
    const disableBlur = () => { element.style.filter = 'none'; };
    blurSubscribers.add(disableBlur);
    element.style.filter = blurDisabled ? 'none' : 'blur(clamp(35px,6vw,120px))';
    const render = (t: number, staticFrame = false) => {
      const travel = t / duration;
      const fadeIn = (1-Math.cos(Math.PI*clamp((t-c.bgInStart)/c.bgInDuration)))/2;
      const opacity = staticFrame ? 1 : fadeIn*(1-smooth((t-c.bgOutStart)/c.bgOutDuration));
      const growth = (1-Math.cos(Math.PI*travel))/2;
      const control = 2*c.midSize-(c.startSize+c.endSize)/2;
      const size = (1-growth)**2*c.startSize+2*(1-growth)*growth*control+growth**2*c.endSize;
      lights.forEach((light, i) => {
        const crossing = 44.5/(i===0?.72:.75)+2*c.spacing+c.drift;
        const x = i===0 ? -c.spacing+crossing*travel : i===1 ? c.spacing-crossing*travel : 2*Math.sin(travel*Math.PI);
        const y = -(i===0?5:3)*travel;
        const scale = size/100*c.atmosphereSize/100;
        const stretch = 1+.06*Math.sin(travel*Math.PI*1.3+i*.7);
        light.style.transform = `translate(${x}%,${y}%) rotate(${(i===0?7:-6)*travel}deg) scale(${scale*stretch},${scale/stretch})`;
        light.style.opacity = String(opacity*(i===2?.6:1));
      });
    };
    const tick = (now: number) => {
      if (last !== null) {
        const delta = now-last;
        // Judge sustained delivery over a rolling second, not individual frames.
        frameWindow.push(delta);
        let windowDuration = frameWindow.reduce((sum, value) => sum + value, 0);
        while (frameWindow.length > 1 && windowDuration-frameWindow[0] >= 1000) {
          windowDuration -= frameWindow.shift()!;
        }
        if (windowDuration >= 1000 && frameWindow.length >= 10) {
          const averageFrame = windowDuration/frameWindow.length;
          const slowFraction = frameWindow.filter(value => value > 20).length/frameWindow.length;
          slowDuration = averageFrame > 20 && slowFraction >= .5 ? slowDuration+Math.min(delta,100) : 0;
          if (slowDuration >= 2000 && !blurDisabled) {
            blurDisabled = true;
            blurSubscribers.forEach(disable => disable());
          }
        }
        time = (time+delta/1000*c.speed)%duration;
      }
      last = now;
      render(time);
      frame = requestAnimationFrame(tick);
    };
    const sync = () => {
      cancelAnimationFrame(frame); last = null; frameWindow = []; slowDuration = 0;
      if (reduced.matches) render(duration*.5, true);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };
    render(0);
    const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
    observer.observe(element);
    document.addEventListener('visibilitychange', sync);
    reduced.addEventListener('change', sync);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      document.removeEventListener('visibilitychange', sync);
      reduced.removeEventListener('change', sync);
      blurSubscribers.delete(disableBlur);
    };
  }, []);
  return (
    <div {...props} ref={root} aria-hidden="true" data-animated-atmosphere="" style={{ ...props.style, opacity: atmosphereConfig.brightness/100 }}>
      {/* pv-editable-zone-start:atmo01 */}
        {/* pv-block-start:atmo02 */}
        <div data-pv-block="atmo02" data-atmosphere-light="blue" />
        {/* pv-block-end:atmo02 */}
        {/* pv-block-start:atmo03 */}
        <div data-pv-block="atmo03" data-atmosphere-light="violet" />
        {/* pv-block-end:atmo03 */}
        {/* pv-block-start:atmo04 */}
        <div data-pv-block="atmo04" data-atmosphere-light="rose" />
        {/* pv-block-end:atmo04 */}
      {/* pv-editable-zone-end:atmo01 */}
    </div>
  );
}
