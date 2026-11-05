import { useEffect, useRef, useState, type HTMLAttributes } from 'react';
import { Icon } from '@/components/ui/icon';
import { TextParagraph } from '@/components/ui/text-paragraph';
import { cn } from '@/lib/utils';

const PROMPT = "Dear Claude, build a dashboard like the one in my attached sketch. Write specs and annotations for what you added. Follow all architectural rules from PROTOVIBE_AGENTS.md. ";

export function AgentPromptPreview({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  const root = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setInterval> | undefined;
    const reveal = () => {
      setStarted(true);
      if (reducedMotion.matches) {
        setCount(PROMPT.length);
        return;
      }
      const start = performance.now();
      timer = setInterval(() => {
        const next = Math.min(PROMPT.length, Math.max(0, Math.floor((performance.now() - start - 1900) / 23)));
        setCount(next);
        if (next === PROMPT.length) clearInterval(timer);
      }, 32);
    };
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        reveal();
      }
    }, { threshold: 0.3 });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); clearInterval(timer); };
  }, []);

  return (
    <div {...props} ref={root} data-started={started} data-complete={count === PROMPT.length} className={cn('agent-prompt-preview flex w-full min-w-0 flex-col gap-3 rounded-xl bg-background-secondary p-4 text-left sm:p-8', className)}>
{/* pv-editable-zone-start:v80bqy */}
{/* pv-block-start:he9und */}
<div data-pv-block="he9und" aria-hidden="true" className="flex flex-wrap items-center gap-1.5 text-foreground-secondary">{/* pv-editable-zone-start:r82c4s */}
{/* pv-block-start:hmnl0a */}
<div data-pv-block="hmnl0a" className="flex min-w-0 items-center gap-1 rounded bg-background-tertiary px-2 py-1 ">{/* pv-editable-zone-start:5tsn5t */}
{/* pv-block-start:ghiu63 */}
<Icon data-pv-block="ghiu63" iconSymbol="mdi:laptop" size="sm" className="" />
{/* pv-block-end:ghiu63 */}
{/* pv-block-start:e83y6q */}
<TextParagraph data-pv-block="e83y6q" typography="small" className="truncate">Local</TextParagraph>
{/* pv-block-end:e83y6q */}
{/* pv-editable-zone-end:5tsn5t */}</div>
{/* pv-block-end:hmnl0a */}
{/* pv-block-start:hj1f34 */}
<div data-pv-block="hj1f34" className="flex min-w-0 items-center gap-1 rounded bg-background-tertiary px-2 py-1 max-w-full">{/* pv-editable-zone-start:v1xyye */}
{/* pv-block-start:3e75lc */}
<Icon data-pv-block="3e75lc" iconSymbol="mdi:folder-outline" size="sm" className="" />
{/* pv-block-end:3e75lc */}
{/* pv-block-start:zr03jx */}
<TextParagraph data-pv-block="zr03jx" typography="small" className="truncate">
  Project folder
</TextParagraph>
{/* pv-block-end:zr03jx */}
{/* pv-editable-zone-end:v1xyye */}</div>
{/* pv-block-end:hj1f34 */}
{/* pv-block-start:lvwl73 */}
<div data-pv-block="lvwl73" className="flex min-w-0 items-center gap-1 rounded bg-background-tertiary px-2 py-1 ">{/* pv-editable-zone-start:w9uwdp */}
{/* pv-block-start:rfn4q6 */}
<Icon data-pv-block="rfn4q6" iconSymbol="mdi:source-branch" size="sm" className="" />
{/* pv-block-end:rfn4q6 */}
{/* pv-block-start:dczx87 */}
<TextParagraph data-pv-block="dczx87" typography="small" className="truncate">main</TextParagraph>
{/* pv-block-end:dczx87 */}
{/* pv-editable-zone-end:w9uwdp */}</div>
{/* pv-block-end:lvwl73 */}
{/* pv-block-start:lupskw */}
<TextParagraph data-pv-block="lupskw" typography="small" className="hidden sm:block">worktree</TextParagraph>
{/* pv-block-end:lupskw */}
{/* pv-block-start:km21pb */}
<Icon data-pv-block="km21pb" iconSymbol="material-icon-theme:claude" size="md" className="ml-auto" />
{/* pv-block-end:km21pb */}
{/* pv-editable-zone-end:r82c4s */}</div>
{/* pv-block-end:he9und */}
{/* pv-block-start:cgtau1 */}
<div data-pv-block="cgtau1" className="relative flex flex-col gap-4 rounded-xl border border-border-default bg-background-secondary p-3 sm:p-4">{/* pv-editable-zone-start:jjdqu6 */}

{/* pv-block-start:f5sujz */}
<div data-pv-block="f5sujz" role="img" aria-label="Attached dashboard sketch" className="agent-prompt-attachment h-16 w-[6.4rem] sm:h-[5.6rem] sm:w-[8.8rem] rounded border border-border-default bg-background-default bg-[url('/src/images/from-protovibe/dashboard-sketch.webp')] bg-contain bg-center bg-no-repeat" />
{/* pv-block-end:f5sujz */}
{/* pv-block-start:e9bzgy */}
<div data-pv-block="e9bzgy" className="relative grid min-w-0">{/* pv-editable-zone-start:2ay4nz */}
{/* pv-block-start:nsbmsk */}
<TextParagraph data-pv-block="nsbmsk" className="invisible col-start-1 row-start-1 whitespace-pre-line [overflow-wrap:anywhere]" aria-hidden="true">{PROMPT}</TextParagraph>
{/* pv-block-end:nsbmsk */}
{/* pv-block-start:3h3nnp */}
<TextParagraph data-pv-block="3h3nnp" aria-hidden="true" data-typing={count > 0 && count < PROMPT.length} className="agent-prompt-copy col-start-1 row-start-1 whitespace-pre-line [overflow-wrap:anywhere]">{PROMPT.slice(0, count)}</TextParagraph>
{/* pv-block-end:3h3nnp */}
{/* pv-block-start:dv6h1t */}
<TextParagraph data-pv-block="dv6h1t" className="sr-only">{PROMPT}</TextParagraph>
{/* pv-block-end:dv6h1t */}
{/* pv-editable-zone-end:2ay4nz */}</div>
{/* pv-block-end:e9bzgy */}

{/* pv-block-start:4hm0y1 */}
<Icon data-pv-block="4hm0y1" iconSymbol="mdi:keyboard-return" size="sm" className="self-end text-foreground-secondary" />
{/* pv-block-end:4hm0y1 */}
{/* pv-block-start:vmdy9b */}
<Icon data-pv-block="vmdy9b" iconSymbol="mdi:cursor-default" aria-hidden="true" className="agent-prompt-pointer pointer-events-none absolute left-16 top-16 text-foreground-strong" />
{/* pv-block-end:vmdy9b */}
{/* pv-editable-zone-end:jjdqu6 */}</div>
{/* pv-block-end:cgtau1 */}
{/* pv-block-start:1riqzi */}
<div data-pv-block="1riqzi" aria-hidden="true" className="flex flex-wrap items-center gap-3 text-foreground-secondary">{/* pv-editable-zone-start:mghoxk */}
{/* pv-block-start:0u21v0 */}
<Icon data-pv-block="0u21v0" iconSymbol="mdi:plus" size="sm" className="" />
{/* pv-block-end:0u21v0 */}
{/* pv-block-start:cbodtn */}
<Icon data-pv-block="cbodtn" iconSymbol="mdi:microphone-outline" size="sm" className="" />
{/* pv-block-end:cbodtn */}
{/* pv-block-start:3m3jrf */}
<Icon data-pv-block="3m3jrf" iconSymbol="mdi:chevron-down" size="sm" className="" />
{/* pv-block-end:3m3jrf */}
{/* pv-block-start:nf6jsp */}
<TextParagraph data-pv-block="nf6jsp" typography="small" className="">Auto</TextParagraph>
{/* pv-block-end:nf6jsp */}
{/* pv-block-start:4yjgs8 */}
<TextParagraph data-pv-block="4yjgs8" typography="small" className="ml-auto">Opus 5</TextParagraph>
{/* pv-block-end:4yjgs8 */}
{/* pv-block-start:qyv2r4 */}
<TextParagraph data-pv-block="qyv2r4" typography="small" className="">Medium</TextParagraph>
{/* pv-block-end:qyv2r4 */}
{/* pv-block-start:4poqnk */}
<Icon data-pv-block="4poqnk" iconSymbol="mdi:circle-outline" size="sm" className="" />
{/* pv-block-end:4poqnk */}
{/* pv-editable-zone-end:mghoxk */}</div>
{/* pv-block-end:1riqzi */}
{/* pv-editable-zone-end:v80bqy */}
    </div>
  );
}
