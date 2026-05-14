import { getUser, type SessionUser } from '@/lib/auth'
import NavbarClient from './NavbarClient'

export default async function Navbar() {
  const user = await getUser()
  return <NavbarClient user={user} />
}

export type { SessionUser }
