import { NextResponse } from 'next/server'
import { site } from '@/lib/site'

/**
 * Endpoint del form contatti.
 * Con RESEND_API_KEY configurata invia l'email via Resend (REST, senza SDK);
 * senza chiave risponde 503 e il client propone il fallback mailto.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 })
  }

  const required = ['nome', 'cognome', 'email', 'telefono', 'via', 'civico', 'oggetto', 'messaggio']
  for (const field of required) {
    if (typeof body[field] !== 'string' || !(body[field] as string).trim()) {
      return NextResponse.json({ ok: false, error: `missing_${field}` }, { status: 400 })
    }
  }
  if (body.privacy !== true) {
    return NextResponse.json({ ok: false, error: 'missing_privacy' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json({ ok: false, error: 'mailer_not_configured' }, { status: 503 })
  }

  const esc = (v: unknown) =>
    String(v ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' })[c] as string)

  const html = `
    <h2>Nuova richiesta dal sito</h2>
    <p><strong>Oggetto:</strong> ${esc(body.oggetto)}</p>
    <p><strong>Da:</strong> ${esc(body.nome)} ${esc(body.cognome)} (${esc(body.tipologia) || 'tipologia non indicata'})</p>
    ${body.azienda ? `<p><strong>Azienda/Ente:</strong> ${esc(body.azienda)}${body.ruolo ? ` — ${esc(body.ruolo)}` : ''}</p>` : ''}
    <p><strong>Email:</strong> ${esc(body.email)} · <strong>Tel:</strong> ${esc(body.telefono)}</p>
    <p><strong>Indirizzo:</strong> ${esc(body.via)} ${esc(body.civico)}</p>
    <hr />
    <p style="white-space:pre-wrap">${esc(body.messaggio)}</p>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || `KonnectAlps Sito <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO || site.email],
      reply_to: body.email,
      subject: `[Sito] ${body.oggetto}`,
      html,
    }),
  })

  if (!res.ok) {
    return NextResponse.json({ ok: false, error: 'mailer_error' }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
