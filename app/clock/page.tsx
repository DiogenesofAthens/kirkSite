"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, Sun, Moon, GripVertical, Link2, Plus, Minus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";

const cityData = [
  { city: "Ahmedabad", country: "IN", timezone: "Asia/Kolkata" },
  { city: "New York", country: "US", timezone: "America/New_York" },
  { city: "San Francisco", country: "US", timezone: "America/Los_Angeles" },
  { city: "London", country: "GB", timezone: "Europe/London" },
  { city: "Paris", country: "FR", timezone: "Europe/Paris" },
  { city: "Zurich", country: "CH", timezone: "Europe/Zurich" },
  { city: "Tokyo", country: "JP", timezone: "Asia/Tokyo" },
  { city: "Sydney", country: "AU", timezone: "Australia/Sydney" },
  { city: "Mumbai", country: "IN", timezone: "Asia/Kolkata" },
  { city: "Beijing", country: "CN", timezone: "Asia/Shanghai" },
  { city: "Dubai", country: "AE", timezone: "Asia/Dubai" },
  { city: "Berlin", country: "DE", timezone: "Europe/Berlin" },
  { city: "Chicago", country: "US", timezone: "America/Chicago" },
  { city: "Los Angeles", country: "US", timezone: "America/Los_Angeles" }
];

const fuse = new Fuse(cityData, {
  threshold: 0.3,
  keys: ["city", "timezone", "country"]
});

export default function ClockPage() {
  const router = useRouter();
  const [zones, setZones] = useState<string[]>([]);
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const [use24Hour, setUse24Hour] = useState(false);
  const [input, setInput] = useState("");
  const [results, setResults] = useState(cityData);
  const today = new Date();
  const dragStart = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const preset = url.searchParams.get("zones");
      const hour = url.searchParams.get("hour");
      if (preset) {
        setZones(preset.split(","));
      } else {
        setZones(["America/Los_Angeles", "America/New_York", "Europe/London"]);
      }
      if (hour) setSelectedHour(parseInt(hour));
    }
  }, []);

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

  useEffect(() => {
    if (!input.trim()) setResults(cityData);
    else setResults(fuse.search(input.trim()).map((r) => r.item));
  }, [input]);

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
            <span>{selectedHour.toString().padStart(2, "0")}:00</span>
            <button onClick={() => shiftHour(1)}><Plus /></button>
            <label className="text-sm flex items-center gap-2">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
              24-Hour
            </label>
            <ThemeToggle />
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg bg-muted/30 shadow-inner border border-border">
          <div className="grid grid-cols-[180px_repeat(24,56px)] min-w-[1600px] text-sm relative">
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

            {zones.map((tz, i) => (
              <div key={tz} className="contents group">
                <div
                  className="flex items-center justify-between px-4 py-2 font-medium bg-muted text-muted-foreground border-r border-b cursor-move"
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
                    {tz}
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
                      "border-r border-b text-center px-1 py-2 cursor-pointer",
                      hour >= 9 && hour <= 17 && "bg-green-50",
                      selectedHour === hour && "bg-primary text-primary-foreground font-semibold"
                    )}
                  >
                    {formatTime(tz, hour)}
                  </div>
                ))}
              </div>
            ))}
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
