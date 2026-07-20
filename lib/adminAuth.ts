// Edge-safe crypto (SubtleCrypto — works in both Edge runtime and Node.js 18+)

async function signHmac(payload: string, secret: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(payload))
  return btoa(Array.from(new Uint8Array(sig)).map(b => String.fromCharCode(b)).join(''))
}

export async function createSessionToken(secret: string): Promise<string> {
  const ts = Date.now().toString()
  const sig = await signHmac(ts, secret)
  return `${ts}.${sig}`
}

export async function verifySessionToken(token: string, secret: string): Promise<boolean> {
  const dot = token.lastIndexOf('.')
  if (dot === -1) return false
  const ts = token.slice(0, dot)
  const sig = token.slice(dot + 1)

  // Verify age — reject tokens older than 7 days
  const age = Date.now() - Number(ts)
  if (isNaN(age) || age < 0 || age > 7 * 24 * 60 * 60 * 1000) return false

  // Constant-time signature check via HMAC re-sign
  const expected = await signHmac(ts, secret)
  const ea = Uint8Array.from(atob(expected), c => c.charCodeAt(0))
  const sa = Uint8Array.from(atob(sig), c => c.charCodeAt(0))
  if (ea.length !== sa.length) return false
  let diff = 0
  for (let i = 0; i < ea.length; i++) diff |= ea[i] ^ sa[i]
  return diff === 0
}

// Constant-time password comparison via HMAC (edge-safe, no timingSafeEqual)
export async function safeCompare(a: string, b: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const [sigA, sigB] = await Promise.all([
    crypto.subtle.sign('HMAC', key, enc.encode(a)),
    crypto.subtle.sign('HMAC', key, enc.encode(b)),
  ])
  const ua = new Uint8Array(sigA)
  const ub = new Uint8Array(sigB)
  if (ua.length !== ub.length) return false
  let diff = 0
  for (let i = 0; i < ua.length; i++) diff |= ua[i] ^ ub[i]
  return diff === 0
}
