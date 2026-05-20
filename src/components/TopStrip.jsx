import { motion } from 'framer-motion'

const tickerItems = [
  'Party Launch · Volume 1, Edition 1',
  'Filed under: General Disgruntlement',
  'Sponsored by no one. Funded by nothing.',
  'HQ: Wherever the wifi works',
  'Now accepting rants, retweets, and resentment',
]

function TopStrip() {
  return (
    <div className="bg-ink text-paper font-mono text-[11px] tracking-[0.14em] uppercase py-2 overflow-hidden border-b-2 border-saffron">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
          <span key={index} className="mx-14">
            <span className="text-saffron-2 mr-3">✦</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export default TopStrip