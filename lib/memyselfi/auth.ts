import 'server-only'
import { cookies } from 'next/headers'
import {
  scryptSync,
  randomBytes,
  timingSafeEqual,
  createHmac,
} from 'crypto'
import { getAccount, type Account } from './store'

const COOKIE = 'mmi_session'
const MAX_AGE = 60 * 60 * 24 * 30 // 30 days
const SECRET =
  process.env.MMI_SESSION_SECRET || 'memyselfi-dev-secret-rotate-in-prod'

export function hashPassword(password: string): {
  hash: string
  salt: string
} {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 64).toString('hex')
  return { hash, salt }
}

export function verifyPassword(
  password: string,
  hash: string,
  salt: string,
): boolean {
  const candidate = scryptSync(password, salt, 64)
  const known = Buffer.from(hash, 'hex')
  if (candidate.length !== known.length) return false
  return timingSafeEqual(candidate, known)
}

function sign(value: string): string {
  return createHmac('sha256', SECRET).update(value).digest('hex')
}

export function setSession(userId: string) {
  const exp = Date.now() + MAX_AGE * 1000
  const payload = `${userId}.${exp}`
  const token = `${payload}.${sign(payload)}`
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: MAX_AGE,
  })
}

export function clearSession() {
  cookies().set(COOKIE, '', { path: '/', maxAge: 0 })
}

function readUserId(): string | null {
  const raw = cookies().get(COOKIE)?.value
  if (!raw) return null
  const [userId, exp, sig] = raw.split('.')
  if (!userId || !exp || !sig) return null
  if (sign(`${userId}.${exp}`) !== sig) return null
  if (Date.now() > Number(exp)) return null
  return userId
}

export async function currentAccount(): Promise<Account | null> {
  const id = readUserId()
  if (!id) return null
  return getAccount(id)
}
