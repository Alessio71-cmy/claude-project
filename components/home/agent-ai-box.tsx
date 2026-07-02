import Link from 'next/link'
import { Section } from '@/components/ui/container'
import { Reveal } from '@/components/motion/reveal'
import { ArrowUpRight } from '@/components/ui/icons'
import AgentAiIcon from '@/components/icons/agent-ai-icon'
import { agentAiBox } from '@/lib/content/it/home'

/** Box Agent AI (5.1.5): teaser verso la pagina dedicata, tinta viola. */
export function AgentAiBox() {
  return (
    <Section id="agent-ai" data-service="agent-ai">
      <Reveal>
        <Link
          href={agentAiBox.cta.href}
          className="group grid overflow-hidden rounded-3xl transition-transform duration-300 lg:hover:scale-[1.01] xl:grid-cols-2"
          style={{ backgroundColor: 'var(--support-viola)' }}
        >
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <p className="text-small flex items-center gap-3 font-medium uppercase tracking-[0.25em] text-bg-dark/90">
                {agentAiBox.eyebrow}
                <span className="rounded-full bg-bg-dark px-2.5 py-1 text-[10px] font-bold uppercase leading-none text-support-viola">
                  {agentAiBox.badge}
                </span>
              </p>
              <h2 className="h2-main mt-6 max-w-xl !text-bg-dark">{agentAiBox.title}</h2>
              <p className="text-base mt-6 max-w-lg text-bg-dark/90">{agentAiBox.description}</p>
            </div>
            <span className="button button--solid-dark mt-10 self-start">
              {agentAiBox.cta.label}
              <span className="button__icon">
                <ArrowUpRight />
              </span>
            </span>
          </div>

          <div className="relative flex min-h-[16rem] items-center justify-center overflow-hidden p-8 md:min-h-[20rem]">
            <div className="w-full max-w-md transition-transform duration-500 group-hover:scale-105">
              <AgentAiIcon />
            </div>
          </div>
        </Link>
      </Reveal>
    </Section>
  )
}
