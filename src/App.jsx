import React, { useEffect, useMemo, useRef, useState } from 'react'

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [passphrase, setPassphrase] = useState([])
  const [time, setTime] = useState('00:00:00')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      const d = new Date()
      const h = String(d.getUTCHours()).padStart(2, '0')
      const m = String(d.getUTCMinutes()).padStart(2, '0')
      const s = String(d.getUTCSeconds()).padStart(2, '0')
      setTime(`${h}:${m}:${s} UTC`)
    }, 1000)
    return () => clearInterval(iv)
  }, [])

  const words = useMemo(
    () => [
      'void','ember','cipher','rift','noir','quartz','origin','neon','delta','nova','umbra','ether','marble','signal','ion','pulse','lumen','shade','sigma','prime','oracle','zenith','horizon','flux','silk','carbon','vapor','cobalt','glyph','fractal','nexus','onyx','axiom','echo','specter','knot','loom','rune','drift','morrow','aether','quark','obscura','solace','vanta','stride','aurum','prism','mosaic','velvet','umbral','paradox','ciphered','keystone','tangent','helix','atlas','vector','arc','apex','loom','zephyr','amber','binary','phase','sable'
    ],
    []
  )

  function generatePassphrase() {
    const arr = Array.from({ length: 12 }, () => words[Math.floor(Math.random() * words.length)])
    setPassphrase(arr)
    setCopied(false)
  }

  useEffect(() => {
    if (showModal) generatePassphrase()
  }, [showModal])

  function copy() {
    const text = passphrase.join(' ')
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-slate-100 selection:bg-white/10 selection:text-white">
      <StyleInjection />
      <AnimatedBackground />
      <NoiseOverlay />

      <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5">
        <div className="flex items-center gap-3">
          <Logo />
          <div className="text-xs md:text-sm tracking-widest uppercase text-slate-300/80">Project: Umbra</div>
        </div>
        <div className="text-xs md:text-sm text-slate-400 font-mono">{time}</div>
      </header>

      <main className="relative z-10 px-6 md:px-10">
        <section className="pt-10 md:pt-20 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <div>
            <div className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] md:text-xs tracking-widest uppercase text-slate-300/90">stealth • pre-mainnet • invite only</div>
            <h1 className="mt-5 text-4xl md:text-7xl leading-tight font-semibold">
              <span className="block text-slate-200/90 glitch" data-text="We don’t build blocks.">We don’t build blocks.</span>
              <span className="block text-slate-50/95">We rearrange reality.</span>
            </h1>
            <p className="mt-6 text-slate-300/80 max-w-xl">
              We are a quiet constellation of engineers and cryptographers creating a settlement layer for things that refuse to be named. Low-latency consensus. Deterministic secrecy. Transmission without trace.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button onClick={() => setShowModal(true)} className="group relative overflow-hidden rounded-md bg-gradient-to-r from-slate-800 to-slate-700 px-5 py-3 text-sm md:text-base font-medium">
                <span className="relative z-10">Request invitation</span>
                <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>
              <a href="#brief" className="text-slate-300/80 hover:text-white text-sm md:text-base underline/20">Read the brief</a>
            </div>
            <div className="mt-8 flex items-center gap-6 text-xs text-slate-400/80 font-mono">
              <span className="flex items-center gap-2"><Dot live /> Testnet: silent</span>
              <span className="flex items-center gap-2"><Dot /> TPS: redacted</span>
              <span className="flex items-center gap-2"><Dot /> Finality: <span className="tabular-nums"><span className="animate-pulse">~</span>?</span></span>
            </div>
          </div>
          <div className="relative h-[420px] md:h-[520px]">
            <NetworkOrb />
          </div>
        </section>

        <section id="brief" className="max-w-6xl mx-auto mt-16 md:mt-28 grid md:grid-cols-3 gap-6">
          <Card title="Consensus without confession" body="Ephemeral committees assemble, decide, and dissolve. The chain remembers outcomes, not witnesses." />
          <Card title="Proofs that whisper" body="Zero-knowledge circuits braided with latency-aware routing. Trust the math, not the mouth." />
          <Card title="Liquidity that vanishes" body="Order flow submerged beneath encrypted mempools. Value moves; footprints don’t." />
        </section>

        <section className="max-w-6xl mx-auto mt-14 md:mt-24">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-medium text-slate-100">Transmission</h3>
              <span className="text-xs md:text-sm font-mono text-slate-400/80">channel: 0x-umbral</span>
            </div>
            <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <Marquee>
              <span>private settlement</span>
              <span>zk pipelines</span>
              <span>post-quantum handshakes</span>
              <span>deterministic latency</span>
              <span>programmable darkness</span>
              <span>trust minimized bridges</span>
            </Marquee>
          </div>
        </section>
      </main>

      <footer className="relative z-10 px-6 md:px-10 mt-16 md:mt-28 mb-14">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="text-slate-400 text-sm md:text-base">
            © {new Date().getFullYear()} Umbra Laboratories. We are not here.
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-400/80 font-mono">
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">PGP</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Onion</span>
            <span className="px-2 py-1 rounded bg-white/5 border border-white/10">Whitepaper</span>
          </div>
        </div>
      </footer>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="space-y-5">
            <div className="text-sm text-slate-300/90">Answer the riddle. Receive a fictional passphrase. Use it nowhere. Share it with no one.</div>
            <div className="rounded-lg border border-white/10 bg-white/5 p-4">
              <div className="font-medium">Riddle</div>
              <p className="text-slate-300/80 mt-2 text-sm">
                I grow when divided, and vanish when named. I bind untrusted parties without a handshake. What am I?
              </p>
              <div className="mt-2 text-xs text-slate-400/80">Hint: its opposite is applause.</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-400/80 mb-2">Fictional passphrase</div>
              <div className="rounded-lg border border-white/10 bg-gradient-to-b from-black/20 to-white/5 p-3 font-mono text-sm grid grid-cols-2 md:grid-cols-3 gap-2">
                {passphrase.map((w, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-black/30 border border-white/10 text-slate-200/90">
                    {String(i + 1).padStart(2, '0')} {w}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex gap-3">
                <button onClick={generatePassphrase} className="px-3 py-2 text-xs rounded border border-white/10 bg-white/5 hover:bg-white/10">Shuffle</button>
                <button onClick={copy} className="px-3 py-2 text-xs rounded border border-white/10 bg-white/5 hover:bg-white/10">
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="mt-3 text-[11px] text-slate-400/80">
                This is not a wallet seed. Do not store value with it. We will never ask for your real keys.
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

function Logo() {
  return (
    <div className="relative h-8 w-8 grid place-items-center">
      <svg viewBox="0 0 64 64" className="h-7 w-7">
        <defs>
          <radialGradient id="g" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#a3e635" />
            <stop offset="60%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </radialGradient>
        </defs>
        <circle cx="32" cy="32" r="28" fill="none" stroke="url(#g)" strokeWidth="2.5" />
        <path d="M20 38 L32 18 L44 38 Z" fill="none" stroke="#e2e8f0" strokeWidth="2" />
        <circle cx="32" cy="18" r="2" fill="#e2e8f0" />
      </svg>
    </div>
  )
}

function Card({ title, body }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 md:p-6 backdrop-blur-sm">
      <div className="text-base md:text-lg font-medium text-slate-100">{title}</div>
      <p className="mt-2 text-slate-300/80 text-sm">{body}</p>
      <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400/80">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70 animate-pulse" />
        <span>Field notes synchronized</span>
      </div>
    </div>
  )
}

function Dot({ live }) {
  return (
    <span className={`h-2 w-2 rounded-full ${live ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500/70'}`} />
  )
}

function Modal({ children, onClose }) {
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-2xl rounded-xl border border-white/10 bg-black/80 p-6 md:p-7 shadow-2xl">
        <button aria-label="Close" onClick={onClose} className="absolute right-3 top-3 rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-slate-300/90 hover:bg-white/10">Close</button>
        {children}
      </div>
    </div>
  )
}

function Marquee({ children, speed = 60 }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    setW(ref.current?.scrollWidth || 0)
  }, [children])
  return (
    <div className="relative overflow-hidden">
      <div className="flex gap-8 whitespace-nowrap text-slate-300/90" style={{ animation: `marquee ${speed}s linear infinite` }}>
        <div ref={ref} className="flex gap-8 py-4">
          {React.Children.map(children, (c, i) => (
            <span key={i} className="uppercase tracking-widest text-xs md:text-sm">{c}</span>
          ))}
        </div>
        <div className="flex gap-8 py-4" aria-hidden>
          {React.Children.map(children, (c, i) => (
            <span key={i} className="uppercase tracking-widest text-xs md:text-sm">{c}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

function NetworkOrb() {
  const ref = useRef(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    let raf
    const nodes = Array.from(svg.querySelectorAll('circle.node'))
    const lines = Array.from(svg.querySelectorAll('line'))

    const cx = 200, cy = 200
    const base = nodes.map((n, i) => ({
      r: 90 + (i % 8) * 14,
      a: (i * 137.5) * (Math.PI / 180),
      s: 0.001 + (i % 5) * 0.0007,
    }))

    function tick(t) {
      nodes.forEach((n, i) => {
        const b = base[i]
        const x = cx + Math.cos(b.a + t * b.s) * b.r
        const y = cy + Math.sin(b.a + t * b.s) * b.r
        n.setAttribute('cx', x)
        n.setAttribute('cy', y)
      })
      // connect some
      lines.forEach((ln, i) => {
        const a = nodes[i % nodes.length]
        const b = nodes[(i * 7) % nodes.length]
        ln.setAttribute('x1', a.getAttribute('cx'))
        ln.setAttribute('y1', a.getAttribute('cy'))
        ln.setAttribute('x2', b.getAttribute('cx'))
        ln.setAttribute('y2', b.getAttribute('cy'))
      })
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const N = 36
  const L = 24

  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-[420px] w-[420px] md:h-[520px] md:w-[520px]">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgba(34,197,94,0.15),rgba(2,6,23,0)_70%)]" />
        <svg ref={ref} viewBox="0 0 400 400" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[92%] w-[92%]">
          <defs>
            <linearGradient id="wire" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {[...Array(L)].map((_, i) => (
            <line key={i} x1="0" y1="0" x2="0" y2="0" stroke="url(#wire)" strokeWidth="0.8" />
          ))}
          {[...Array(N)].map((_, i) => (
            <circle key={i} className="node" cx="200" cy="200" r="3" fill="#e2e8f0" fillOpacity="0.9" />
          ))}
          <circle cx="200" cy="200" r="2" fill="#22d3ee" />
        </svg>
        <div className="absolute -inset-6 rounded-full blur-3xl bg-[conic-gradient(from_0deg,rgba(16,185,129,0.2),rgba(34,211,238,0.1),rgba(16,185,129,0.2))] animate-spin-slow" />
      </div>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(34,211,238,0.08),transparent_60%),radial-gradient(50%_60%_at_0%_100%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(50%_60%_at_100%_100%,rgba(99,102,241,0.10),transparent_60%)]" />
      <div className="absolute -top-1/3 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(16,185,129,0.12),rgba(34,211,238,0.06),rgba(99,102,241,0.06),rgba(16,185,129,0.12))] animate-spin-slower blur-3xl" />
    </div>
  )
}

function NoiseOverlay() {
  return <div className="pointer-events-none fixed inset-0 -z-10 noise opacity-30 mix-blend-soft-light" />
}

function StyleInjection() {
  return (
    <style>{`
      @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .animate-spin-slow { animation: spin-slow 18s linear infinite; }
      @keyframes spin-slower { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
      .animate-spin-slower { animation: spin-slower 40s linear infinite; }
      @keyframes glitch {
        0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0,0); }
        20% { clip-path: inset(2% 0 0 0); transform: translate(-0.5px,-0.5px); }
        40% { clip-path: inset(0 0 3% 0); transform: translate(0.6px,0.4px); }
        60% { clip-path: inset(1% 0 0 0); transform: translate(-0.4px,0.6px); }
        80% { clip-path: inset(0 0 2% 0); transform: translate(0.5px,-0.4px); }
      }
      .glitch { position: relative; }
      .glitch::before, .glitch::after { content: attr(data-text); position: absolute; left: 0; top: 0; width: 100%; overflow: hidden; }
      .glitch::before { color: #22d3ee; mix-blend-mode: screen; animation: glitch 2.4s infinite; }
      .glitch::after { color: #10b981; mix-blend-mode: screen; animation: glitch 2.4s infinite reverse; }

      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

      .noise { background-image: url('data:image/svg+xml;utf8,${encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="140" viewBox="0 0 140 140">
          <filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/></filter>
          <rect width="100%" height="100%" filter="url(#n)" opacity="0.25"/>
        </svg>`
      )}'); opacity: 0.22; }
    `}</style>
  )
}
