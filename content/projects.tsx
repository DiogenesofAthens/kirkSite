import type { ComponentType } from "react"
import { LINKS } from "@/lib/projects"

/*
 * Project page bodies. Every sentence here was already on the site; the pass cut
 * stack trivia and claims, and grouped what was left under short headings.
 */

function PortKey() {
  return (
    <>
      <p>
        A mortgage portability neobank prototype. When a homeowner sells and buys, PortKey lets them carry their
        existing low-rate mortgage to the new property instead of refinancing at today’s rates.
      </p>
      <h2>Intake</h2>
      <p>
        A conversational assistant pulls a loan application out of a mortgage statement and a short borrower
        conversation. Every field records where it came from. Plain code decides which lenders qualify; the model
        only writes the explanation, and a human approves the handoff.
      </p>
      <h2>Providers</h2>
      <p>
        Three model providers behind one interface, all fed the same system prompts. Swapping providers is a query
        parameter, and adding a fourth is a template file. API keys stay in server routes and never reach the
        browser. One schema validates every model output, whichever provider produced it.
      </p>
      <h2>Evals</h2>
      <p>
        Every provider change runs through three layers: ten deterministic gates per case, a model judge from a
        different model family scoring against a locked rubric, and a human calibration step that checks the judge
        against my own blind labels. Results are published as static JSON on the evals page, which makes no model
        calls. Offline unit tests cover the app and the eval harness itself.
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th className="text-right">Cases passing every gate</th>
              <th className="text-right">Intake faithfulness</th>
              <th className="text-right">Homeowner tone</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>OpenAI</td>
              <td className="text-right">8/8</td>
              <td className="text-right">4.3</td>
              <td className="text-right">3.3</td>
            </tr>
            <tr>
              <td>Anthropic</td>
              <td className="text-right">8/8</td>
              <td className="text-right">4.4</td>
              <td className="text-right">3.6</td>
            </tr>
            <tr>
              <td>Groq (open-weight)</td>
              <td className="text-right">0/8</td>
              <td className="text-right">2.2</td>
              <td className="text-right">2.7</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="meta">
        Judge means on a 1–5 rubric, cross-family judges only. From the{" "}
        <a href={LINKS.evals} target="_blank" rel="noopener noreferrer">
          evals page
        </a>
        : runs Sep 21–28, 2026; human labels Sep 29.
      </p>
    </>
  )
}

function FareTrader() {
  return (
    <>
      <p>
        An autonomous Python agent that monitors Delta Air Lines first-class and Delta One fares across configured
        routes and date windows, booking automatically when prices drop below your threshold — using eCredits as
        zero-cost options on premium seats.
      </p>
      <h2>Booking</h2>
      <p>
        Headless browser automation against delta.com — handles login, fare search, seat selection, and booking
        confirmation with a configurable DRY_RUN mode for safe testing.
      </p>
      <h2>Data</h2>
      <p>
        Local database tracking held bookings, price history across every scanned route and date, and a full scan
        log with trigger counts, booking counts, and error rates.
      </p>
    </>
  )
}

function ResourXe() {
  return (
    <>
      <p>
        A GPU compute routing engine that scores available instances by price and carbon intensity — helping AI
        workloads find the cheapest or the greenest compute, depending on what you optimize for.
      </p>
      <h2>Scoring</h2>
      <p>
        A configurable weight parameter from 0.0 (pure price) to 1.0 (pure carbon) blends price rank and carbon
        index into a single score — letting users dial between cost minimization and emissions minimization.
      </p>
      <h2>Data</h2>
      <p>
        Fetches real-time marginal carbon intensity for datacenter locations, enabling the engine to score and rank
        compute options by their actual grid emissions — not just location-level averages.
      </p>
      <p>
        Queries available GPU instances filtered to rentable, un-rented nodes and ordered by hourly price —
        surfacing GPU model, reliability score, and geographic location for each result.
      </p>
      <h2>Providers</h2>
      <p>
        Modular provider architecture — each marketplace integration is an independent module exposing a
        normalized record schema, making it straightforward to add new providers without touching the scorer.
      </p>
    </>
  )
}

function SaveTheState() {
  return (
    <>
      <p>A blockchain-anchored land covenant registry proof-of-concept targeting county government.</p>
      <h2>Data model</h2>
      <p>
        The chain is the source of truth; SQLite is a queryable cache enriched with off-chain metadata like
        coordinates and flagged status. The backend syncs chain events into SQLite on demand.
      </p>
      <h2>Contract</h2>
      <p>
        Smart contract for on-chain covenant recording with parcel ID derivation via keccak256. Deployable to a
        local Hardhat node or the Base Sepolia testnet with a single command.
      </p>
      <h2>Registry</h2>
      <p>
        50 pre-seeded parcels with APN lookup, owner type classification, and a flagged status for parcels of
        interest. Covenant histories are exportable as printable PDF reports.
      </p>
    </>
  )
}

function StatTrack() {
  return (
    <>
      <p>
        An NBA analytics dashboard built around a FastAPI pipeline, translating NBA data into player summaries and
        scoring views.
      </p>
      <h2>Pipeline</h2>
      <p>
        Player requests move from the Next.js interface through FastAPI to the NBA data source, with clear loading
        and availability states when the upstream feed cannot respond.
      </p>
      <h2>Availability</h2>
      <p>
        The FastAPI service runs on free-tier hosting, and the unofficial NBA stats API can rate-limit cloud IPs, so
        live data may be intermittent—especially in the offseason.
      </p>
    </>
  )
}

function Reopen() {
  return (
    <>
      <p>
        A civic engagement landing page challenging political apathy and calling for a renewed commitment to
        democratic participation. Built as a fully static Next.js site with a canvas-animated waving flag.
      </p>
      <h2>Flag</h2>
      <p>
        Custom American flag animation rendered column by column with sine-wave physics — pinned at the staff, free
        at the fly. No animation libraries; pure browser APIs.
      </p>
    </>
  )
}

function PrinceOfMulberry() {
  return (
    <>
      <p>
        Coming soon page for Prince of Mulberry Productions — a film production company named after the
        intersection of Prince St. and Mulberry St. in Nolita, New York. Built as a single self-contained HTML file
        with no framework, no build step, and no dependencies.
      </p>
      <h2>Film grain</h2>
      <p>
        JavaScript film grain effect rendered at ~12fps via requestAnimationFrame — random noise drawn at low
        opacity with mix-blend-mode overlay to simulate analog film texture over the video background.
      </p>
    </>
  )
}

export const PROJECT_BODIES: Record<string, ComponentType> = {
  portkey: PortKey,
  faretrader: FareTrader,
  resourxe: ResourXe,
  savethestate: SaveTheState,
  stattrack: StatTrack,
  reopen: Reopen,
  pmp: PrinceOfMulberry,
}
