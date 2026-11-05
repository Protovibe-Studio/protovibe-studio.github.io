import { useEffect, useRef, type HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { TextParagraph } from '@/components/ui/text-paragraph';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';

const INTRO_VIDEO_ID: string = '0uwyrQXzK7A';

export function HeroIntro({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const { state, setQueryParams } = useStore();
  const isOpen = state.queryParams.introVideo === 'true';
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const close = () => setQueryParams({ introVideo: null });

  useEffect(() => {
    if (!isOpen) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      triggerRef.current?.querySelector('button')?.focus({ preventScroll: true });
    };
  }, [isOpen]);

  return (
    <div {...props} ref={triggerRef} className={cn('absolute inset-0 z-20 flex items-center justify-center pointer-events-none', className)}>
      {/* pv-editable-zone-start:ivz001 */}
        {/* pv-block-start:ivb009 */}
        <button data-pv-block="ivb009" type="button" aria-label="Watch the Protovibe intro video" aria-haspopup="dialog" onClick={() => setQueryParams({ introVideo: 'true' })} className="absolute inset-0 pointer-events-auto cursor-pointer rounded-lg border-0 bg-transparent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground-on-primary" />
        {/* pv-block-end:ivb009 */}
        {/* pv-block-start:ivb001 */}
        <div data-pv-block="ivb001" className="relative flex items-center justify-center self-end top-6">
          {/* pv-editable-zone-start:ivz002 */}
            {/* pv-block-start:ivb002 */}
            <button data-pv-block="ivb002" type="button" aria-label="Play 2-min intro" aria-haspopup="dialog" onClick={() => setQueryParams({ introVideo: 'true' })} className="hero-intro-play pointer-events-auto relative flex items-center justify-center rounded-full border-0 bg-background-primary text-foreground-on-primary cursor-pointer transition-colors hover:bg-background-primary-hover active:bg-background-primary-pressed focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-foreground-on-primary shadow-md h-14 w-36">
              {/* pv-editable-zone-start:ivz005 */}
                {/* pv-block-start:ivb008 */}
                <Icon data-pv-block="ivb008" iconSymbol="mdi:play" size="2xl" aria-hidden="true" className="relative z-10 translate-x-0.5" />
                {/* pv-block-end:ivb008 */}
              {/* pv-editable-zone-end:ivz005 */}
            </button>
            {/* pv-block-end:ivb002 */}
            {/* pv-block-start:ivb003 */}
            <TextParagraph data-pv-block="ivb003" typography="semibold-primary" className="absolute top-full whitespace-nowrap rounded-full py-0.5 px-2 mt-2 text-sm text-foreground-secondary">
              2-min video
            </TextParagraph>
            {/* pv-block-end:ivb003 */}
          {/* pv-editable-zone-end:ivz002 */}
        </div>
        {/* pv-block-end:ivb001 */}
        {/* pv-block-start:ivb004 */}
        {isOpen && typeof document !== 'undefined' && createPortal(
          <dialog data-pv-block="ivb004" ref={dialogRef} aria-label="Protovibe Studio — 2-min intro" className="hero-intro-dialog" onCancel={(event) => { event.preventDefault(); close(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
            {/* pv-editable-zone-start:ivz003 */}
              {/* pv-block-start:ivb005 */}
              <Button data-pv-block="ivb005" type="button" autoFocus iconOnly leftIcon="mdi:close" aria-label="Close intro video" onClick={close} color="neutral" className="absolute right-4 top-4 rounded-full data-[size=md]:h-12 data-[icon-only=true]:data-[size=md]:w-12 border border-border-default focus-visible:outline-2 focus-visible:outline-foreground-on-primary" />
              {/* pv-block-end:ivb005 */}
              {/* pv-block-start:ivb006 */}
              <div data-pv-block="ivb006" className="hero-intro-player bg-background-default rounded-lg overflow-hidden border border-border-default shadow-2xl">
                {/* pv-editable-zone-start:ivz004 */}
                  {/* pv-block-start:ivb007 */}
                  {INTRO_VIDEO_ID ? (
                    <iframe data-pv-block="ivb007" title="Protovibe Studio — 2-min intro" src={`https://www.youtube.com/embed/${INTRO_VIDEO_ID}?autoplay=1&playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="h-full w-full border-0" />
                  ) : (
                    <TextParagraph data-pv-block="ivb007" typography="secondary" className="h-full flex items-center justify-center p-8 text-center">Intro video coming soon.</TextParagraph>
                  )}
                  {/* pv-block-end:ivb007 */}
                {/* pv-editable-zone-end:ivz004 */}
              </div>
              {/* pv-block-end:ivb006 */}
            {/* pv-editable-zone-end:ivz003 */}
          </dialog>, document.body
        )}
        {/* pv-block-end:ivb004 */}
      {/* pv-editable-zone-end:ivz001 */}
    </div>
  );
}
