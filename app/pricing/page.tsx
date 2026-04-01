import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing — CheapWebsite.com.au',
  description: 'Transparent website refresh pricing. Quick Fix from $297, Full Refresh $597, Complete Rebuild $997. No hidden fees.',
}

const tiers = [
  {
    name: 'Quick Fix',
    price: 297,
    description: 'Perfect for sites that just need a tune-up and some TLC.',
    highlight: false,
    features: {
      'Broken link fixing': true,
      'Text & content updates': true,
      'Image updates': true,
      'Loading speed improvements': true,
      'Mobile responsiveness check': true,
      'Basic SEO fixes (meta tags, titles)': true,
      'New modern design': false,
      'Full content rewrite': false,
      'Google Analytics setup': false,
      'Advanced SEO optimisation': false,
      'Mobile-first redesign from scratch': false,
      'Complete rebuild (new tech stack)': false,
      'Hosting included — we handle everything': true,
      'Hosting setup & deployment': false,
      'Priority 24-hour delivery': false,
    },
    cta: 'Get Quick Fix',
  },
  {
    name: 'Full Refresh',
    price: 597,
    description: 'A complete visual and content overhaul. Your site, but better in every way.',
    highlight: true,
    features: {
      'Broken link fixing': true,
      'Text & content updates': true,
      'Image updates': true,
      'Loading speed improvements': true,
      'Mobile responsiveness check': true,
      'Basic SEO fixes (meta tags, titles)': true,
      'New modern design': true,
      'Full content rewrite': true,
      'Google Analytics setup': true,
      'Advanced SEO optimisation': true,
      'Mobile-first redesign from scratch': true,
      'Complete rebuild (new tech stack)': false,
      'Hosting included — we handle everything': true,
      'Hosting setup & deployment': false,
      'Priority 24-hour delivery': false,
    },
    cta: 'Get Full Refresh',
  },
  {
    name: 'Complete Rebuild',
    price: 997,
    description: 'Brand new website built from scratch on a modern tech stack. Same great content, new home.',
    highlight: false,
    features: {
      'Broken link fixing': true,
      'Text & content updates': true,
      'Image updates': true,
      'Loading speed improvements': true,
      'Mobile responsiveness check': true,
      'Basic SEO fixes (meta tags, titles)': true,
      'New modern design': true,
      'Full content rewrite': true,
      'Google Analytics setup': true,
      'Advanced SEO optimisation': true,
      'Mobile-first redesign from scratch': true,
      'Complete rebuild (new tech stack)': true,
      'Hosting included — we handle everything': true,
      'Hosting setup & deployment': true,
      'Priority 24-hour delivery': true,
    },
    cta: 'Get Rebuilt',
  },
]

const allFeatures = [
  'Hosting included — we handle everything',
  'Broken link fixing',
  'Text & content updates',
  'Image updates',
  'Loading speed improvements',
  'Mobile responsiveness check',
  'Basic SEO fixes (meta tags, titles)',
  'New modern design',
  'Full content rewrite',
  'Google Analytics setup',
  'Advanced SEO optimisation',
  'Mobile-first redesign from scratch',
  'Complete rebuild (new tech stack)',
  'Hosting setup & deployment',
  'Priority 24-hour delivery',
]

export default function PricingPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            No hidden fees. No surprise invoices. Pay once, get results.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 px-6 py-3 rounded-2xl text-base font-semibold">
            <span className="text-2xl">🏠</span>
            <span>Fast, reliable hosting included on all packages — we handle everything</span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`rounded-2xl p-8 flex flex-col ${
                  tier.highlight
                    ? 'bg-[#2563EB] text-white shadow-xl shadow-blue-200 scale-105'
                    : 'bg-white border-2 border-gray-200'
                }`}
              >
                {tier.highlight && (
                  <div className="bg-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full mb-4 self-start">
                    MOST POPULAR
                  </div>
                )}
                <h2 className={`text-2xl font-bold mb-2 ${tier.highlight ? 'text-white' : 'text-[#1A1A2E]'}`}>
                  {tier.name}
                </h2>
                <div className={`text-5xl font-extrabold mb-1 ${tier.highlight ? 'text-white' : 'text-[#2563EB]'}`}>
                  ${tier.price}
                  <span className={`text-base font-normal ml-1 ${tier.highlight ? 'text-blue-200' : 'text-gray-500'}`}>AUD</span>
                </div>
                <p className={`text-sm mb-8 mt-2 ${tier.highlight ? 'text-blue-100' : 'text-gray-500'}`}>{tier.description}</p>
                <Link
                  href={`/submit?tier=${tier.name.toLowerCase().replace(' ', '-')}`}
                  className={`w-full text-center py-3 rounded-xl font-semibold transition-colors mt-auto ${
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

          {/* Feature Comparison Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left p-4 font-semibold text-[#1A1A2E] w-1/2">Feature</th>
                  {tiers.map((t) => (
                    <th key={t.name} className={`p-4 font-semibold text-center ${t.highlight ? 'text-[#2563EB]' : 'text-[#1A1A2E]'}`}>
                      {t.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-100">
                  <td className="p-4 text-gray-500 font-semibold text-sm" colSpan={4}>Price</td>
                </tr>
                <tr className="border-t border-gray-100 bg-white">
                  <td className="p-4 font-medium text-gray-700">One-time fee (AUD)</td>
                  {tiers.map((t) => (
                    <td key={t.name} className={`p-4 text-center font-bold ${t.highlight ? 'text-[#2563EB]' : 'text-[#1A1A2E]'}`}>
                      ${t.price}
                    </td>
                  ))}
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="p-4 text-gray-500 font-semibold text-sm" colSpan={4}>What&apos;s Included</td>
                </tr>
                {allFeatures.map((feature, i) => (
                  <tr key={feature} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                    <td className="p-4 text-gray-700">{feature}</td>
                    {tiers.map((t) => (
                      <td key={t.name} className="p-4 text-center">
                        {t.features[feature as keyof typeof t.features] ? (
                          <svg className="w-5 h-5 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#1A1A2E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not sure which tier is right for you?</h2>
          <p className="text-gray-300 mb-8">
            We recommend the Full Refresh for most small businesses. It covers everything you need to look professional and rank on Google.
          </p>
          <Link
            href="/submit"
            className="inline-block bg-[#F97316] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors"
          >
            Get Started →
          </Link>
        </div>
      </section>
    </div>
  )
}
