import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Received — CheapWebsite.com.au',
  description: 'Your website refresh order has been received. We\'ll be in touch within 2 hours.',
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Success icon */}
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="text-6xl mb-4">🎉</div>

        <h1 className="text-4xl font-extrabold text-[#1A1A2E] mb-4">
          Order received!
        </h1>

        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          We&apos;ll analyse your site and be in touch within <strong>2 hours</strong>.
          Check your email for your order confirmation.
        </p>

        <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-8 text-left shadow-sm">
          <h2 className="font-bold text-[#1A1A2E] mb-4">What happens next?</h2>
          <div className="space-y-3">
            {[
              { icon: '📧', text: 'You\'ll receive an order confirmation email shortly.' },
              { icon: '🔍', text: 'Our AI team will analyse your website within 2 hours.' },
              { icon: '⚡', text: 'We\'ll get to work rebuilding/refreshing your site.' },
              { icon: '🚀', text: 'Your refreshed site will be delivered within 48 hours.' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{item.icon}</span>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 mb-8 text-sm text-blue-800">
          <strong>Got questions?</strong> Email us at{' '}
          <a href="mailto:hello@cheapwebsite.com.au" className="underline">
            hello@cheapwebsite.com.au
          </a>
          {' '}— we&apos;re usually very quick to respond.
        </div>

        <Link
          href="/"
          className="inline-block bg-[#2563EB] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
