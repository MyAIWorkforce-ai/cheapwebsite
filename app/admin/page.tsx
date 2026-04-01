'use client'

import { useState } from 'react'

interface Order {
  id: string
  created_at: string
  tier: string
  price: number
  website_url: string
  business_name: string
  what_to_update: string
  specific_requirements: string
  name: string
  email: string
  phone: string
  stripe_session_id: string
  status: string
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin2026') {
      setAuthenticated(true)
      fetchOrders()
    } else {
      setError('Incorrect password')
    }
  }

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/orders')
      const data = await res.json()
      if (data.orders) {
        setOrders(data.orders)
      }
    } catch {
      setError('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-[#1A1A2E] rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Admin Access</h1>
            <p className="text-gray-500 text-sm mt-1">CheapWebsite.com.au Orders</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100"
            />
            {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
            <button
              type="submit"
              className="w-full bg-[#2563EB] text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }

  const tierColors: Record<string, string> = {
    'Quick Fix': 'bg-blue-100 text-blue-700',
    'Full Refresh': 'bg-orange-100 text-orange-700',
    'Complete Rebuild': 'bg-purple-100 text-purple-700',
  }

  const statusColors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-700',
    'paid': 'bg-green-100 text-green-700',
    'completed': 'bg-blue-100 text-blue-700',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-[#1A1A2E]">Orders Dashboard</h1>
            <p className="text-gray-500 text-sm">CheapWebsite.com.au</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-semibold">
              {orders.length} orders
            </div>
            <button
              onClick={fetchOrders}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors text-sm"
            >
              ↻ Refresh
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">No orders yet</h2>
            <p className="text-gray-500">Orders will appear here when customers submit through the site.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-[#1A1A2E]">{order.business_name}</h2>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${tierColors[order.tier] || 'bg-gray-100 text-gray-700'}`}>
                          {order.tier}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${statusColors[order.status] || 'bg-gray-100 text-gray-700'}`}>
                          {order.status || 'paid'}
                        </span>
                      </div>
                      <a href={order.website_url} target="_blank" rel="noopener noreferrer" className="text-[#2563EB] hover:underline text-sm">
                        {order.website_url}
                      </a>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#2563EB]">${order.price}</div>
                      <div className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">Customer</div>
                      <div className="text-gray-700">{order.name}</div>
                      <a href={`mailto:${order.email}`} className="text-[#2563EB] hover:underline">{order.email}</a>
                      {order.phone && <div className="text-gray-600">{order.phone}</div>}
                    </div>
                    <div>
                      <div className="text-gray-500 text-xs font-semibold uppercase tracking-wide mb-1">What to update</div>
                      <div className="text-gray-700 line-clamp-3">{order.what_to_update}</div>
                    </div>
                  </div>

                  {order.specific_requirements && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                      <span className="font-semibold text-gray-700">Specific requirements: </span>
                      {order.specific_requirements}
                    </div>
                  )}

                  {order.stripe_session_id && (
                    <div className="mt-3 text-xs text-gray-400">
                      Stripe: {order.stripe_session_id}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
