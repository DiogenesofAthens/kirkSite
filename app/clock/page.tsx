"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, Sun, Moon, GripVertical, Link2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";
import geoCities from "./data/geo-cities.json";
;

const fuse = new Fuse(geoCities, {
  threshold: 0.3,
  keys: ["city", "alt", "country"]
});

export default function ClockPage() {
  const router = useRouter();
  const [zones, setZones] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState(geoCities);
  const [copied, setCopied] = useState(false);
  const today = new Date();
  const dragStart = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const preset = url.searchParams.get("zones");
      const hour = url.searchParams.get("hour");
      if (preset) setZones(preset.split(","));
      else setZones(["America/Los_Angeles", "America/New_York", "Europe/London"]);
      if (hour) setSelectedHour(parseInt(hour));
    }
  }, []);

  useEffect(() => {
    if (!input.trim()) setResults(geoCities);
    else setResults(fuse.search(input.trim()).map((r) => r.item));
  }, [input]);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 180 + selectedHour * 56 - 300;
      }
    }, 200);
  }, [selectedHour]);

  const updateURL = (zones: string[], hour: number) => {
    const query = `?zones=${zones.join(",")}&hour=${hour}`;
    router.replace(query);
  };

  const addZone = () => {
    const match = fuse.search(input.trim())[0];
    if (match && !zones.includes(match.item.timezone)) {
      const updated = [...zones, match.item.timezone];
      setZones(updated);
      updateURL(updated, selectedHour);
      setInput("");
    }
  };

  const removeZone = (tz: string) => {
    const updated = zones.filter((z) => z !== tz);
    setZones(updated);
    updateURL(updated, selectedHour);
  };

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
    updateURL(updated, selectedHour);
  };

  const shiftHour = (delta: number) => {
    const newHour = (selectedHour + delta + 24) % 24;
    setSelectedHour(newHour);
    updateURL(zones, newHour);
  };

  const getDayLabel = (tz: string, hour: number) => {
    const base = new Date(today);
    base.setHours(hour, 0, 0, 0);
    const day1 = base.toLocaleDateString("en-US", { weekday: "short", timeZone: tz });
    base.setHours(hour + 1);
    const day2 = base.toLocaleDateString("en-US", { weekday: "short", timeZone: tz });
    return day1 !== day2 ? `${day1} → ${day2}` : day1;
  };

  const formatTime = (tz: string, hour: number) => {
    const base = new Date(today);
    base.setHours(hour, 0, 0, 0);
    return base.toLocaleTimeString([], {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: !use24Hour
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6" /> Timezone Converter
          </h1>
          <div className="flex items-center gap-3">
            <button onClick={() => shiftHour(-1)}><Minus /></button>
            <span className="font-mono tabular-nums text-lg">{selectedHour.toString().padStart(2, "0")}:00</span>
            <button onClick={() => shiftHour(1)}><Plus /></button>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
              24-Hour
            </label>
            <button
              className="text-sm underline flex items-center gap-1"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 1500);
              }}
            >
              <Link2 className="w-4 h-4" /> {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-muted/30 shadow-inner border border-border">
          <div ref={scrollRef} className="grid grid-cols-[180px_repeat(24,56px)] min-w-[1600px] text-sm relative scroll-x">
            <div className="absolute top-0 w-[56px] h-full pointer-events-none border-l-2 border-blue-500 z-10"
              style={{ left: `calc(180px + 56px * ${selectedHour})` }} />
            {hoveredHour !== null && (
              <div className="absolute top-0 w-[56px] h-full pointer-events-none bg-blue-500/10 z-0"
                style={{ left: `calc(180px + 56px * ${hoveredHour})` }} />
            )}

            <div className="contents">
              <div className="px-4 py-2 font-semibold bg-primary text-primary-foreground border-r border-b">
                Timezone
              </div>
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className="border-r border-b text-center text-xs px-1 py-1 text-muted-foreground">
                  {zones.length > 0 ? getDayLabel(zones[0], hour) : ""}
                </div>
              ))}
            </div>

            {zones.map((tz, i) => {
              const cityName = geoCities.find(c => c.timezone === tz)?.city || tz;
              return (
                <div key={tz} className="contents group">
                  <div
                    className="flex items-center justify-between px-4 py-2 font-medium bg-muted text-foreground border-r border-b cursor-move"
                    draggable
                    onDragStart={() => (dragStart.current = i)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (dragStart.current !== null && dragStart.current !== i) {
                        reorderZones(dragStart.current, i);
                        dragStart.current = i;
                      }
                    }}
                  >
                    <span className="flex items-center gap-2 truncate">
                      <GripVertical className="w-4 h-4 opacity-30 group-hover:opacity-100" />
                      {cityName}
                      {(() => {
                        const h = parseInt(new Date().toLocaleTimeString("en-US", { timeZone: tz, hour: "numeric", hour12: false }));
                        return h < 6 || h >= 20 ? <Moon className="w-4 h-4 text-yellow-300" /> : <Sun className="w-4 h-4 text-yellow-400" />;
                      })()}
                    </span>
                    <button onClick={() => removeZone(tz)}><X className="w-4 h-4" /></button>
                  </div>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      onMouseEnter={() => setHoveredHour(hour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      className={cn(
                        "border-r border-b text-center px-1 py-2 cursor-pointer tabular-nums",
                        hour >= 9 && hour <= 17 && "bg-green-50",
                        selectedHour === hour && "bg-primary text-white font-bold"
                      )}
                    >
                      {formatTime(tz, hour)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city or timezone"
            className="w-full px-3 py-2 rounded text-sm bg-background border border-input"
            list="city-options"
            onKeyDown={(e) => {
              if (e.key === "Enter") addZone();
            }}
          />
          <datalist id="city-options">
            {results.map(({ city, timezone }) => (
              <option key={timezone} value={city} />
            ))}
          </datalist>
          <button
            onClick={addZone}
            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 w-full sm:w-auto"
          >
            Add Timezone
          </button>
        </div>
      </main>
    </div>
  );
}
