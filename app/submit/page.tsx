'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

const tiers = [
  {
    id: 'brand-new-website',
    name: 'Brand New Website',
    icon: '🆕',
    price: 797,
    description: 'We build you a brand new website from scratch — design, copy, images and launch all handled for you.',
    popular: false,
    badge: null,
  },
  {
    id: 'refresh-existing-website',
    name: 'Refresh My Existing Website',
    icon: '🔄',
    price: 397,
    description: 'We modernise your existing website — better design, updated content, fixed links, improved SEO, faster loading.',
    popular: true,
    badge: 'MOST POPULAR',
  },
  {
    id: 'full-package',
    name: 'Full Package (Domain + Hosting + Website)',
    icon: '📦',
    price: 997,
    description: 'Everything in Brand New Website PLUS domain registration, 12 months hosting, professional email, and Google Business Profile setup.',
    popular: false,
    badge: 'BEST VALUE',
  },
]

function SubmitForm() {
  const searchParams = useSearchParams()
  const defaultTier = searchParams.get('tier') || 'refresh-existing-website'

  const [selectedTier, setSelectedTier] = useState(defaultTier)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    websiteUrl: '',
    businessName: '',
    businessDescription: '',
    preferredDomain: '',
    whatToUpdate: '',
    specificRequirements: '',
    name: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (searchParams.get('tier')) {
      setSelectedTier(searchParams.get('tier') || 'refresh-existing-website')
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const isRefresh = selectedTier === 'refresh-existing-website'
  const isNewOrFull = selectedTier === 'brand-new-website' || selectedTier === 'full-package'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!form.name || !form.email) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }
    if (isRefresh && !form.websiteUrl) {
      setError('Please provide your current website URL.')
      setLoading(false)
      return
    }
    if (isNewOrFull && (!form.businessName || !form.businessDescription)) {
      setError('Please fill in all required fields.')
      setLoading(false)
      return
    }

    try {
      const tier = tiers.find(t => t.id === selectedTier) || tiers[1]
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tier: tier.name,
          price: tier.price,
          ...form,
        }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const selectedTierData = tiers.find(t => t.id === selectedTier) || tiers[1]

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-[#1A1A2E] mb-3">
            Get Your Website Sorted
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in your details below. We&apos;ll be in touch within 2 hours of your payment.
          </p>
        </div>
      </section>

      <section className="py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Tier Selection */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">1. Select Your Package</h2>
              <div className="grid grid-cols-1 gap-4">
                {tiers.map((tier) => (
                  <label
                    key={tier.id}
                    className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
                      selectedTier === tier.id
                        ? 'border-[#2563EB] bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={tier.id}
                      checked={selectedTier === tier.id}
                      onChange={() => setSelectedTier(tier.id)}
                      className="sr-only"
                    />
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{tier.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-[#1A1A2E]">{tier.name}</span>
                          {tier.badge && (
                            <span className="bg-[#F97316] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {tier.badge}
                            </span>
                          )}
                        </div>
                        <div className={`text-2xl font-extrabold mb-1 ${selectedTier === tier.id ? 'text-[#2563EB]' : 'text-gray-700'}`}>
                          ${tier.price}
                          <span className="text-xs font-normal text-gray-500 ml-1">AUD</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{tier.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Website Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">2. Your Details</h2>
              <div className="space-y-4">
                {/* Refresh: show current URL */}
                {isRefresh && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                      Your current website URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      name="websiteUrl"
                      value={form.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://yourwebsite.com.au"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      required
                    />
                  </div>
                )}

                {/* New / Full Package: show business fields */}
                {isNewOrFull && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Business name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={form.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Smith's Plumbing"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        What does your business do? <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="businessDescription"
                        value={form.businessDescription}
                        onChange={handleChange}
                        placeholder="e.g. We're a local plumbing company servicing Sydney's northern suburbs. We do emergency repairs, hot water systems and renovations."
                        rows={3}
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 resize-none"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Preferred domain name (we&apos;ll check availability) <span className="text-gray-400">(optional)</span>
                      </label>
                      <input
                        type="text"
                        name="preferredDomain"
                        value={form.preferredDomain}
                        onChange={handleChange}
                        placeholder="e.g. smithsplumbing.com.au"
                        className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Any specific requirements? <span className="text-gray-400">(optional)</span>
                  </label>
                  <textarea
                    name="specificRequirements"
                    value={form.specificRequirements}
                    onChange={handleChange}
                    placeholder="e.g. Keep our existing blue colour scheme, use our new logo (we'll email it), add a booking form..."
                    rows={3}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-[#1A1A2E] mb-4">3. Your Contact Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Phone Number <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="04xx xxx xxx"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[#1A1A2E]">Order Summary</h3>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-[#2563EB]">${selectedTierData.price} AUD</div>
                  <div className="text-sm text-gray-500">{selectedTierData.name}</div>
                </div>
              </div>
              <ul className="text-sm text-gray-600 space-y-1 mb-2">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  48-hour delivery
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  One round of free revisions
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Secure payment via Stripe
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2563EB] text-white py-4 rounded-xl text-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-200"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Redirecting to payment...
                </span>
              ) : (
                `Pay $${selectedTierData.price} AUD & Submit Order →`
              )}
            </button>
            <p className="text-center text-sm text-gray-500">
              🔒 Secure payment powered by Stripe. We never store your card details.
            </p>
          </form>
        </div>
      </section>
    </div>
  )
}

export default function SubmitPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <SubmitForm />
    </Suspense>
  )
}
