"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, Sun, Moon, GripVertical } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";
import Fuse from "fuse.js";

const allTimezones = Intl.supportedValuesOf("timeZone");

const cityTimezoneMap = [
  { city: "mumbai", tz: "Asia/Kolkata", flag: "🇮🇳" },
  { city: "new york", tz: "America/New_York", flag: "🇺🇸" },
  { city: "los angeles", tz: "America/Los_Angeles", flag: "🇺🇸" },
  { city: "london", tz: "Europe/London", flag: "🇬🇧" },
  { city: "paris", tz: "Europe/Paris", flag: "🇫🇷" },
  { city: "zurich", tz: "Europe/Zurich", flag: "🇨🇭" },
  { city: "tokyo", tz: "Asia/Tokyo", flag: "🇯🇵" },
  { city: "sydney", tz: "Australia/Sydney", flag: "🇦🇺" },
  { city: "berlin", tz: "Europe/Berlin", flag: "🇩🇪" },
];

const fuse = new Fuse(cityTimezoneMap, {
  threshold: 0.4,
  keys: ["city", "tz"],
});

export default function ClockPage() {
  const [time, setTime] = useState(new Date());
  const [zones, setZones] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("zones");
      return stored ? JSON.parse(stored) : [
        Intl.DateTimeFormat().resolvedOptions().timeZone,
        "America/New_York",
        "Europe/London",
      ];
    }
    return [];
  });

  const [inputZone, setInputZone] = useState("");
  const [filteredZones, setFilteredZones] = useState(cityTimezoneMap);
  const [use24Hour, setUse24Hour] = useState(false);
  const [selectedHour, setSelectedHour] = useState(new Date().getHours());
  const [hoveredHour, setHoveredHour] = useState<number | null>(null);
  const dragStart = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    localStorage.setItem("zones", JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    if (inputZone.trim() === "") {
      setFilteredZones(cityTimezoneMap);
    } else {
      const results = fuse.search(inputZone.trim());
      setFilteredZones(results.map((r) => r.item));
    }
  }, [inputZone]);

  const addZone = () => {
    const match = cityTimezoneMap.find(
      (entry) => entry.city.toLowerCase() === inputZone.toLowerCase() || entry.tz === inputZone
    );
    if (match && !zones.includes(match.tz)) {
      setZones([...zones, match.tz]);
      setInputZone("");
      inputRef.current?.blur();
    }
  };

  const removeZone = (tz: string) => setZones(zones.filter((z) => z !== tz));

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
  };

  const isNight = (tz: string) => {
    const h = parseInt(new Date().toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    }));
    return h < 6 || h >= 20;
  };

  const formatTime = (tz: string, hourOverride?: number) => {
    const newDate = new Date(time);
    if (typeof hourOverride === "number") {
      newDate.setHours(hourOverride, 0, 0, 0);
    }
    return newDate.toLocaleTimeString([], {
      timeZone: tz,
      hour12: !use24Hour,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLabel = (tz: string) => {
    const entry = cityTimezoneMap.find((e) => e.tz === tz);
    const flag = entry?.flag || "";
    const city = tz.split("/").pop()?.replaceAll("_", " ");
    return `${flag} ${city} (${tz})`;
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Clock className="w-6 h-6" /> Timezone Converter
            </h1>
            <div className="flex items-center gap-4">
              <label className="text-sm flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={use24Hour}
                  onChange={() => setUse24Hour(!use24Hour)}
                />
                24-Hour
              </label>
              <ThemeToggle />
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg bg-muted/20 shadow-inner border border-border">
            <div className="grid grid-cols-[180px_repeat(24,56px)] min-w-[1600px] text-sm relative">
              <div
                className="absolute top-0 w-[56px] h-full pointer-events-none border-l-2 border-blue-500 z-10"
                style={{ left: `calc(180px + 56px * ${selectedHour})` }}
              />
              {hoveredHour !== null && (
                <div
                  className="absolute top-0 w-[56px] h-full pointer-events-none bg-blue-500/10 z-0"
                  style={{ left: `calc(180px + 56px * ${hoveredHour})` }}
                />
              )}
              <div className="contents">
                <div className="px-4 py-2 font-semibold bg-primary text-primary-foreground border-r border-b">
                  Timezone
                </div>
                {Array.from({ length: 24 }).map((_, hour) => (
                  <div
                    key={hour}
                    className={cn(
                      "border-r border-b text-center px-1 py-2 font-semibold cursor-pointer",
                      selectedHour === hour
                        ? "bg-blue-600 text-white"
                        : "hover:bg-accent hover:text-accent-foreground"
                    )}
                    onClick={() => setSelectedHour(hour)}
                    onMouseEnter={() => setHoveredHour(hour)}
                    onMouseLeave={() => setHoveredHour(null)}
                  >
                    {use24Hour
                      ? `${hour.toString().padStart(2, "0")}:00`
                      : new Date(0, 0, 0, hour).toLocaleTimeString([], {
                          hour: "numeric",
                          hour12: true,
                        })}
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
                      <GripVertical className="w-4 h-4 text-muted-foreground group-hover:opacity-100 opacity-30" />
                      {formatLabel(tz)}
                      {isNight(tz) ? (
                        <Moon className="w-4 h-4 text-yellow-300" />
                      ) : (
                        <Sun className="w-4 h-4 text-yellow-400" />
                      )}
                    </span>
                    <button
                      onClick={() => removeZone(tz)}
                      className="text-muted-foreground hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  {Array.from({ length: 24 }).map((_, hour) => (
                    <div
                      key={hour}
                      onClick={() => setSelectedHour(hour)}
                      onMouseEnter={() => setHoveredHour(hour)}
                      onMouseLeave={() => setHoveredHour(null)}
                      className={cn(
                        "border-r border-b text-center px-1 py-2 cursor-pointer transition-colors duration-150",
                        hour >= 9 && hour <= 17 && "bg-green-50 dark:bg-green-900/20",
                        selectedHour === hour &&
                          "bg-primary text-primary-foreground font-semibold"
                      )}
                    >
                      {formatTime(tz, hour)}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search city or timezone (e.g. mumbai or Europe/Paris)"
              value={inputZone}
              onChange={(e) => setInputZone(e.target.value)}
              className="w-full px-3 py-2 rounded text-sm bg-background border border-input"
              list="tz-options"
            />
            <datalist id="tz-options">
              {filteredZones.map((entry) => (
                <option key={entry.tz} value={entry.city} />
              ))}
            </datalist>
            <button
              onClick={addZone}
              className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded hover:bg-primary/90 w-full sm:w-auto"
            >
              Add Timezone
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
