import Link from 'next/link'

const tiers = [
  {
    name: 'Brand New Website',
    icon: '🆕',
    price: '$597',
    description: 'We build you a brand new website from scratch',
    features: [
      'Tell us your business — we handle design, copy, images and launch',
      '5 pages included',
      'Mobile-friendly & SEO-ready',
      'Contact form included',
      'Hosting setup',
      'Delivered in 48 hours',
    ],
    cta: 'Get a Brand New Website',
    highlight: false,
    badge: null,
    badgeColor: null,
    id: 'brand-new-website',
  },
  {
    name: 'Refresh Existing Website',
    icon: '🔄',
    price: '$297',
    description: 'We modernise your existing website',
    features: [
      'Better design, updated content',
      'Fixed links & improved SEO',
      'Faster loading',
      'Submit your URL — we handle the rest',
      'Delivered in 24 hours',
    ],
    cta: 'Refresh My Website',
    highlight: true,
    badge: 'MOST POPULAR',
    badgeColor: null,
    id: 'refresh-existing-website',
  },
  {
    name: 'Full Package',
    icon: '📦',
    price: '$997',
    description: 'Everything you need to go online — done for you',
    features: [
      'Everything in Brand New Website',
      'Domain name registration (we handle it)',
      '12 months hosting included',
      'Professional email setup (you@yourbusiness.com)',
      'Google Business Profile setup',
      'Launch-ready in 48 hours',
    ],
    cta: 'Get the Full Package',
    highlight: false,
    badge: 'BEST VALUE',
    badgeColor: 'orange',
    id: 'full-package',
  },
]

const faqs = [
  {
    q: 'How does it actually work?',
    a: 'You submit your website URL, tell us what you want updated, and pay. Our AI-powered team gets to work immediately — analysing your existing site, rebuilding it with modern standards, and delivering the result within 48 hours.',
  },
  {
    q: 'What do I get at the end?',
    a: 'Depending on your tier, you\'ll receive the updated website files, or we can deploy directly to your hosting. We\'ll send everything to your email once complete.',
  },
  {
    q: 'Do I need to provide anything?',
    a: 'Just your website URL and a description of what you\'d like updated. We do the rest. If we need anything specific, we\'ll reach out within 2 hours of your order.',
  },
  {
    q: 'What if I\'m not happy with the result?',
    a: 'We offer one round of revisions included with every order. If you\'re still not satisfied, we\'ll work with you to make it right.',
  },
  {
    q: 'Is this really AI-powered?',
    a: 'Yes! We use a combination of AI tools and human oversight to analyse, rebuild, and optimise your website. This is how we keep costs low without sacrificing quality.',
  },
]

export default function HomePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-50 via-white to-orange-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            48-hour delivery · Australian owned
          </div>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-[#1A1A2E] mb-6 leading-tight">
            Your Business Online.{' '}
            <span className="text-[#2563EB]">Simple,</span>{' '}
            <br className="hidden sm:block" />
            Fast,{' '}
            <span className="text-[#F97316]">Affordable.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            New website, refresh, or the complete package — we handle everything.{' '}
            <strong>AI-powered, delivered in 48 hours.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/submit"
              className="bg-[#2563EB] text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              Get Started →
            </Link>
            <Link
              href="#examples"
              className="border-2 border-[#1A1A2E] text-[#1A1A2E] px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              See Examples
            </Link>
          </div>
          <p className="mt-6 text-sm text-gray-500">No lock-in contracts. Pay once, get results.</p>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg">Simple. Fast. No technical knowledge needed.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Submit Your URL',
                desc: 'Tell us your website URL and what you want updated. Takes less than 5 minutes.',
                icon: '🔗',
              },
              {
                step: '02',
                title: 'We Get to Work',
                desc: 'Our AI team analyses and rebuilds your site within 48 hours. No back and forth needed.',
                icon: '⚡',
              },
              {
                step: '03',
                title: 'You Get Your New Site',
                desc: 'We send you the files or deploy directly to your hosting. Done!',
                icon: '🚀',
              },
            ].map((item) => (
              <div key={item.step} className="relative bg-gray-50 rounded-2xl p-8 text-center hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="absolute top-4 right-4 text-5xl font-extrabold text-gray-100 select-none">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#1A1A2E] mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/how-it-works" className="text-[#2563EB] font-semibold hover:underline">
              Learn more about the process →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">Simple, Transparent Pricing</h2>
            <p className="text-gray-600 text-lg">No hidden fees. No surprise invoices. Pay once, get results.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col relative ${
                  tier.highlight
                    ? 'bg-[#2563EB] text-white shadow-xl shadow-blue-200 scale-105'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {tier.badge && (
                  <div className={`text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start ${
                    tier.badgeColor === 'orange' ? 'bg-[#F97316]' : 'bg-[#F97316]'
                  }`}>
                    {tier.badge}
                  </div>
                )}
                <div className="text-3xl mb-2">{tier.icon}</div>
                <h3 className={`text-2xl font-bold mb-1 ${tier.highlight ? 'text-white' : 'text-[#1A1A2E]'}`}>
                  {tier.name}
                </h3>
                <div className={`text-4xl font-extrabold mb-2 ${tier.highlight ? 'text-white' : 'text-[#2563EB]'}`}>
                  {tier.price}
                  <span className={`text-base font-normal ml-1 ${tier.highlight ? 'text-blue-200' : 'text-gray-500'}`}>AUD</span>
                </div>
                <p className={`text-sm mb-6 ${tier.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{tier.description}</p>
                <ul className="space-y-3 flex-1 mb-8">
                  {tier.features.map((f) => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.highlight ? 'text-blue-50' : 'text-gray-600'}`}>
                      <svg className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.highlight ? 'text-white' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/submit?tier=${tier.id}`}
                  className={`w-full text-center py-3 rounded-xl font-semibold transition-colors ${
                    tier.highlight
                      ? 'bg-white text-[#2563EB] hover:bg-blue-50'
                      : 'bg-[#2563EB] text-white hover:bg-blue-700'
                  }`}
                >
                  {tier.cta}
                </Link>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/pricing" className="text-[#2563EB] font-semibold hover:underline">
              See full feature comparison →
            </Link>
          </div>
        </div>
      </section>

      {/* Examples */}
      <section id="examples" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">Before & After</h2>
            <p className="text-gray-600 text-lg">Real results for real Australian businesses.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { business: 'Local Plumber', before: 'Old, broken mobile layout from 2015', after: 'Modern, fast, mobile-first site with booking form', tier: 'Full Refresh', saved: '$3,400 vs agency' },
              { business: 'Café & Restaurant', before: 'Slow loading, no online menu, outdated photos', after: 'New design, digital menu, fast load, SEO optimised', tier: 'Full Refresh', saved: '$2,800 vs agency' },
              { business: 'Accountant', before: 'No SSL, broken links, dated look', after: 'Professional, trustworthy, fully mobile responsive', tier: 'Quick Fix', saved: '$1,200 vs agency' },
              { business: 'Real Estate Agent', before: 'Clunky navigation, no property search, slow', after: 'Clean modern design, easy nav, lightning fast', tier: 'Complete Rebuild', saved: '$6,500 vs agency' },
            ].map((ex) => (
              <div key={ex.business} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="grid grid-cols-2">
                  <div className="bg-red-50 p-4 border-r border-gray-200">
                    <div className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Before</div>
                    <p className="text-sm text-gray-600">{ex.before}</p>
                  </div>
                  <div className="bg-green-50 p-4">
                    <div className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">After</div>
                    <p className="text-sm text-gray-600">{ex.after}</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-[#1A1A2E]">{ex.business}</span>
                    <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{ex.tier}</span>
                  </div>
                  <span className="text-sm text-green-600 font-semibold">Saved {ex.saved}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">Why Choose CheapWebsite?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '⚡', title: 'Fast', desc: '48-hour turnaround. Most agencies take weeks.' },
              { icon: '💰', title: 'Affordable', desc: 'Starting from $297. Agencies charge $3,000+.' },
              { icon: '🤖', title: 'AI-Powered', desc: 'Modern AI tools mean better results, faster.' },
              { icon: '🇦🇺', title: 'Australian', desc: 'Proudly Australian owned and operated.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-[#1A1A2E] mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1A1A2E] mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group border border-gray-200 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-semibold text-[#1A1A2E] hover:bg-gray-50 transition-colors list-none">
                  {faq.q}
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 bg-[#1A1A2E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Join hundreds of Australian businesses who&apos;ve refreshed their website without the agency price tag.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-[#F97316] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors shadow-lg"
          >
            Get Started — From $297 →
          </Link>
          <p className="mt-4 text-gray-500 text-sm">48-hour delivery · No lock-in contracts · Pay once</p>
        </div>
      </section>
    </div>
  )
}
