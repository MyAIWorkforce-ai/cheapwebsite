import Link from 'next/link'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-[#1A1A2E] text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <Logo variant="dark" />
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Professional website refreshes for Australian small businesses. No agency markup. Just results.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-[#F97316] transition-colors">How It Works</Link></li>
              <li><Link href="/pricing" className="hover:text-[#F97316] transition-colors">Pricing</Link></li>
              <li><Link href="/submit" className="hover:text-[#F97316] transition-colors">Get Started</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-3">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@cheapwebsite.com.au" className="hover:text-[#F97316] transition-colors">
                  hello@cheapwebsite.com.au
                </a>
              </li>
              <li className="text-gray-400">Australian owned &amp; operated</li>
              <li className="text-gray-400">48-hour turnaround</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} CheapWebsite.com.au — All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
