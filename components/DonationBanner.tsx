'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

export default function DonationBanner() {
  const [showDonate, setShowDonate] = useState(false)

  return (
    <>
      <div className="bg-gradient-to-r from-purple-900/40 via-pink-900/40 to-purple-900/40 border-b border-purple-800/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-yellow-400 text-lg">☕</span>
            <span className="text-gray-300 text-sm">
              喜欢这些游戏？支持我们让平台持续运行
            </span>
          </div>
          <button
            onClick={() => setShowDonate(true)}
            className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm rounded-full hover:from-purple-500 hover:to-pink-500 transition-all active:scale-95 touch-manipulation"
          >
            支持我们
          </button>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowDonate(false)}
        >
          <div
            className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2">支持我们</h3>
              <p className="text-gray-400 text-sm mb-6">
                扫描二维码打赏，帮助我们维持服务器和持续开发
              </p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-white rounded-xl p-3">
                  <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center">
                    <span className="text-gray-500 text-xs text-center">
                      微信<br/>收款码<br/>
                      <span className="text-gray-400">(请提供)</span>
                    </span>
                  </div>
                  <p className="text-gray-700 text-xs mt-2 text-center">微信支付</p>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/alipay-qr.jpg`}
                    alt="支付宝收款码"
                    className="w-full rounded-lg"
                  />
                  <p className="text-gray-700 text-xs mt-2 text-center">支付宝</p>
                </div>
              </div>

              <button
                onClick={() => setShowDonate(false)}
                className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
              >
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
