import type { Metadata } from 'next'
import { Section } from '@/components/ui/container'
import { Button } from '@/components/ui/button'
import { TitleRow } from '@/components/ui/title-row'
import { Reveal, RevealGroup, RevealItem } from '@/components/motion/reveal'
import { AgentAiDemo } from '@/components/agent-ai/demo'
import { AgentAiUseCases } from '@/components/agent-ai/use-cases'
import AgentAiIcon from '@/components/icons/agent-ai-icon'
import { agentAi } from '@/lib/content/it/agent-ai'

export const metadata: Metadata = {
  title: agentAi.seo.title,
  description: agentAi.seo.description,
}

export default function AgentAiPage() {
  return (
    <div data-service="agent-ai">
      {/* Hero */}
      <Section className="pt-36 md:pt-44">
        <div className="grid items-center gap-10 xl:grid-cols-12">
          <div className="xl:col-span-7">
            <Reveal>
              <p className="text-small flex items-center gap-3 font-medium uppercase tracking-[0.25em] text-support-viola">
                {agentAi.eyebrow}
                <span className="rounded-full bg-support-viola px-2.5 py-1 text-[10px] font-bold uppercase leading-none text-bg-dark">
                  {agentAi.badge}
                </span>
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="h1-main mt-6">{agentAi.h1}</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-base mt-8 max-w-2xl opacity-80">{agentAi.subtitle}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href="/contatti?servizio=agent-ai">Richiedi accesso Beta</Button>
                <Button href="#demo" variant="ghost-light">
                  Ascolta la demo
                </Button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="hidden xl:col-span-5 xl:block">
            <div
              className="flex min-h-[18rem] items-center justify-center rounded-3xl p-8"
              style={{ backgroundColor: 'var(--support-viola)' }}
            >
              <div className="w-full max-w-sm">
                <AgentAiIcon />
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Demo audio */}
      <Section id="demo" className="pt-4">
        <TitleRow
          eyebrow={agentAi.demo.eyebrow}
          title={agentAi.demo.heading}
          text={agentAi.demo.description}
        />
        <Reveal className="mt-12">
          <AgentAiDemo languages={agentAi.demo.languages} />
          <p className="text-small mt-4 opacity-65">{agentAi.demo.privacyNote}</p>
        </Reveal>
      </Section>

      {/* Capacità */}
      <Section className="pt-4">
        <TitleRow title={agentAi.capabilities.heading} text={agentAi.capabilities.description} />
        <RevealGroup className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {agentAi.capabilities.items.map((item) => (
            <RevealItem key={item.title} className="border-t border-current/20 pt-5">
              <h3 className="h4-main">{item.title}</h3>
              <p className="text-small mt-2.5 leading-relaxed opacity-75">{item.text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Section>

      {/* Casi d'uso */}
      <Section className="pt-4">
        <TitleRow title={agentAi.useCases.heading} text={agentAi.useCases.description} />
        <div className="mt-12">
          <AgentAiUseCases tabs={agentAi.useCases.tabs} />
        </div>
      </Section>

      {/* Fiducia */}
      <Section className="py-28 md:py-36">
        <Reveal>
          <p className="h2-main max-w-4xl">“{agentAi.trust.statement}”</p>
          <p className="text-base mt-8 max-w-2xl opacity-75">{agentAi.trust.text}</p>
        </Reveal>
      </Section>

      {/* CTA */}
      <Section className="pb-24 pt-0 md:pb-32">
        <Reveal>
          <div
            className="rounded-3xl p-10 md:p-16"
            style={{ backgroundColor: 'var(--support-viola)' }}
          >
            <div className="grid items-center gap-8 xl:grid-cols-12">
              <div className="xl:col-span-8">
                <h2 className="h2-main !text-bg-dark">{agentAi.cta.title}</h2>
                <p className="text-base mt-5 max-w-2xl text-bg-dark/90">{agentAi.cta.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 xl:col-span-4 xl:justify-end">
                <Button href="/contatti?servizio=agent-ai" variant="solid-dark">
                  Richiedi accesso Beta
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>
    </div>
  )
}
