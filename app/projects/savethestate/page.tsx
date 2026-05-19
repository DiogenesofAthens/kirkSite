"use client"

import { FloatingNav } from "@/components/floating-nav"
import { TimezoneClock } from "@/components/timezone-clock"
import { ContactModal } from "@/components/contact-modal"
import { useState } from "react"
import { Github } from "lucide-react"

export default function SaveTheState() {
  const [showContactForm, setShowContactForm] = useState(false)

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <FloatingNav />
      <TimezoneClock />

      <div className="pt-32 pb-20 relative">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 lg:px-12">

          {/* Hero */}
          <div className="mb-16">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-6">
              Project
            </p>
            <h1 className="font-serif text-5xl md:text-6xl font-normal tracking-tight text-foreground mb-6">
              Save the State
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              A blockchain-anchored land covenant registry proof-of-concept targeting county government. Covenants are recorded as immutable on-chain transactions with SQLite as a queryable cache — making the chain the source of truth while keeping the UI fast.
            </p>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://save-the-state.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                View Live Demo
              </a>
              <a
                href="https://github.com/DiogenesofAthens/saveTheState"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wide uppercase text-muted-foreground border-b border-muted-foreground pb-1 hover:opacity-60 transition-opacity"
              >
                <Github className="h-4 w-4" />
                View on GitHub
              </a>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Tech Stack */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Tech Stack
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Solidity / Hardhat
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Smart contract for on-chain covenant recording with parcel ID derivation via keccak256. Deployable to a local Hardhat node or the Base Sepolia testnet with a single command.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Express / Node.js
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  REST API that signs and submits covenant transactions to the blockchain, then syncs chain events into SQLite on demand — keeping the database consistent without polling.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  React / Vite
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Frontend parcel browser with APN lookup, covenant history, and audit trail — proxying API requests to the Express backend during development via Vite&apos;s built-in proxy.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Base (Ethereum L2)
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Low-cost EVM-compatible layer-2 chain for testnet and eventual production deployment — chosen for its low transaction fees and Coinbase-backed reliability.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Key Features */}
          <section className="py-16">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-10">
              Key Features
            </h2>
            <div className="space-y-10">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  On-Chain Covenant Recording
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  Every covenant is a blockchain transaction — immutable by design. Tampering with the record would require rewriting the chain, providing a level of integrity that a traditional database cannot.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Hybrid Data Model
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  The chain is the source of truth; SQLite is a queryable cache enriched with off-chain metadata like coordinates and flagged status. The backend syncs chain events into SQLite on demand.
                </p>
              </div>
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground mb-3">
                  Parcel Registry with PDF Export
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
                  50 pre-seeded parcels with APN lookup, owner type classification, and a flagged status for parcels of interest. Covenant histories are exportable as printable PDF reports.
                </p>
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          <div className="mt-16 pt-12">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Questions or feedback?{" "}
              <button
                onClick={() => setShowContactForm(true)}
                className="text-sm tracking-wide uppercase text-foreground border-b border-foreground pb-1 hover:opacity-60 transition-opacity inline"
              >
                Get in Touch
              </button>
            </p>
          </div>

        </div>
      </div>

      <ContactModal isOpen={showContactForm} onClose={() => setShowContactForm(false)} />
    </div>
  )
}
