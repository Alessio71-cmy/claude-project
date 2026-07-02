import type { ComponentType } from 'react'
import VoipWaveform from './voip-waveform'
import NetworkCircle from './network-circle'
import HighConnectivity from './high-connectivity'
import WirelessConnection from './wireless-connection'
import IotIcon from './iot'
import AgentAiIcon from './agent-ai-icon'
import CybersecurityIcon from './cybersecurity-icon'
import IdentityIcon from './identity-icon'
import CaseStudyIcon from './case-study-icon'
import type { ServiceKey } from '@/lib/site'

export {
  VoipWaveform,
  NetworkCircle,
  HighConnectivity,
  WirelessConnection,
  IotIcon,
  AgentAiIcon,
  CybersecurityIcon,
  IdentityIcon,
  CaseStudyIcon,
}

/** Icona SVG animata associata a ogni servizio (animazioni validate da ashen). */
export const serviceIcons: Record<ServiceKey, ComponentType<{ className?: string }>> = {
  connettivita: HighConnectivity,
  voip: VoipWaveform,
  iot: IotIcon,
  'core-network': NetworkCircle,
  wireless: WirelessConnection,
  'agent-ai': AgentAiIcon,
  cyberalps: CybersecurityIcon,
}
