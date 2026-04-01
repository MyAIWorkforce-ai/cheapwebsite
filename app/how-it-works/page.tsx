import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'How It Works — CheapWebsite.com.au',
  description: 'Learn how our AI-powered website refresh service works. Submit your URL, we rebuild it in 48 hours. Simple.',
}

export default function HowItWorksPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1A1A2E] mb-4">
            How It Works
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We&apos;ve made getting your website refreshed as simple as ordering a coffee. Here&apos;s exactly what happens from start to finish.
          </p>
        </div>
      </section>

      {/* Step by Step */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {[
              {
                step: 1,
                icon: '🔗',
                title: 'Submit Your URL & Tell Us What You Want',
                time: '5 minutes',
                desc: [
                  'Head to our Submit page and fill in your details. We need your website URL, your business name, and a description of what you\'d like updated.',
                  'Choose your service tier — Quick Fix, Full Refresh, or Complete Rebuild — based on how much work your site needs.',
                  'Pay securely via Stripe. Your payment is processed instantly and you\'ll receive an email confirmation.',
                ],
                tip: 'The more detail you give us about what you want, the better the result. Be specific!',
              },
              {
                step: 2,
                icon: '🔍',
                title: 'We Analyse Your Existing Site',
                time: 'Within 2 hours',
                desc: [
                  'As soon as your payment is confirmed, our AI-powered system gets to work crawling and analysing your existing website.',
                  'We check for broken links, slow-loading images, outdated content, SEO issues, mobile responsiveness problems, and more.',
                  'We\'ll reach out within 2 hours if we have any clarifying questions. Usually we don\'t — we have everything we need from your submission.',
                ],
                tip: 'You can relax — this all happens automatically. No calls, no meetings, no back and forth.',
              },
              {
                step: 3,
                icon: '⚡',
                title: 'We Rebuild & Refresh Your Site',
                time: '24–48 hours',
                desc: [
                  'Our AI team rebuilds your site based on your chosen tier. For Quick Fix, we patch and improve. For Full Refresh, we redesign. For Complete Rebuild, we build from scratch.',
                  'We use modern web standards — fast-loading, mobile-first, SEO-optimised code. Your new site will perform significantly better than the old one.',
                  'For Complete Rebuild, we use Next.js (the same framework powering sites like Vercel, TikTok, and thousands of top Australian businesses).',
                ],
                tip: 'We\'ll keep you posted via email on progress.',
              },
              {
                step: 4,
                icon: '🚀',
                title: 'You Receive Your New Site',
                time: 'Within 48 hours',
                desc: [
                  'Once complete, we\'ll send you the finished website files via email. You can hand these to your developer to upload, or we can handle deployment for you (included in Complete Rebuild).',
                  'Quick Fix and Full Refresh include the ready-to-upload files, plus a report on everything we changed.',
                  'Not happy? We include one round of revisions with every order. Just reply to the delivery email with your feedback.',
                ],
                tip: 'Most clients receive their refreshed site well within 48 hours. Priority delivery (24 hours) is included in Complete Rebuild.',
              },
            ].map((step) => (
              <div key={step.step} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-[#2563EB] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  {step.step < 4 && (
                    <div className="w-0.5 bg-blue-200 h-full mx-auto mt-2 ml-[23px]"></div>
                  )}
                </div>
                <div className="pb-12">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{step.icon}</span>
                    <h2 className="text-2xl font-bold text-[#1A1A2E]">{step.title}</h2>
                    <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
                      {step.time}
                    </span>
                  </div>
                  <div className="space-y-3 text-gray-600 leading-relaxed mb-4">
                    {step.desc.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                    💡 <strong>Tip:</strong> {step.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-[#1A1A2E] mb-8 text-center">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: 'What if my site is built on WordPress?',
                a: 'No problem! We can work with WordPress, Squarespace, Wix, or any other platform. Just let us know in your submission.',
              },
              {
                q: 'Do I need to provide login details?',
                a: 'For Quick Fix and Full Refresh, usually not — we work from the public-facing site. For Complete Rebuild, we may request access to your current hosting.',
              },
              {
                q: 'Can you match my existing branding?',
                a: 'Absolutely. We\'ll preserve your existing branding, colours, and fonts. Or if you want a fresh look, just tell us in the submission.',
              },
              {
                q: 'What happens to my existing site?',
                a: 'Nothing — your existing site stays live and untouched until you\'re ready to switch over. We deliver the new version, and you choose when to launch it.',
              },
              {
                q: 'How do I pay?',
                a: 'We accept all major credit cards and debit cards through Stripe. Secure, instant, and no subscription required.',
              },
              {
                q: 'Is there a guarantee?',
                a: 'Yes. Every order includes one round of free revisions. If you\'re still not happy after revisions, get in touch and we\'ll work something out.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-[#1A1A2E] mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-[#2563EB]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
          <p className="text-blue-100 mb-8 text-lg">Takes less than 5 minutes to submit. We do the rest.</p>
          <Link
            href="/submit"
            className="inline-block bg-[#F97316] text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-orange-500 transition-colors shadow-lg"
          >
            Refresh My Website →
          </Link>
        </div>
      </section>
    </div>
  )
}
