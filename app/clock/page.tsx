"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, GripVertical, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";

const COMMON_ZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Kolkata",
  "Australia/Sydney",
  "America/Sao_Paulo",
  "America/Chicago",
  "Europe/Berlin",
  "Africa/Johannesburg",
  "Asia/Dubai"
];

export default function ClockPage() {
  const router = useRouter();
  const [zones, setZones] = useState<string[]>(COMMON_ZONES.slice(0, 3));
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [use24Hour, setUse24Hour] = useState(false);
  const [copied, setCopied] = useState(false);
  const [clockClicks, setClockClicks] = useState(0);
  const [isPulsing, setIsPulsing] = useState(false);
  const today = new Date();
  const dragStart = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      const preset = url.searchParams.get("zones");
      const hour = url.searchParams.get("hour");
      if (preset) setZones(preset.split(","));
      if (hour) setSelectedHour(parseInt(hour));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 180 + selectedHour * 56 - 300;
      }
    }, 200);
  }, [selectedHour]);

  useEffect(() => {
    if (clockClicks >= 3) {
      setIsPulsing(true);
      setTimeout(() => {
        router.push("/clock");
        setClockClicks(0);
      }, 1000);
    }
    const timer = setTimeout(() => setClockClicks(0), 2000);
    return () => clearTimeout(timer);
  }, [clockClicks]);

  const updateURL = (zones: string[], hour: number) => {
    const query = `?zones=${zones.join(",")}&hour=${hour}`;
    router.replace(query);
  };

  const removeZone = (tz: string) => {
    const updated = zones.filter((z) => z !== tz);
    setZones(updated);
    updateURL(updated, selectedHour);
  };

  const addZone = (tz: string) => {
    if (!zones.includes(tz)) {
      const updated = [...zones, tz];
      setZones(updated);
      updateURL(updated, selectedHour);
    }
  };

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
    updateURL(updated, selectedHour);
  };

  const formatTime = (tz: string, hour: number, offset: number) => {
    const base = new Date(today);
    base.setDate(base.getDate() + offset);
    base.setHours(hour, 0, 0, 0);
    return base.toLocaleTimeString([], {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: !use24Hour
    });
  };

  const formatDay = (offset: number) => {
    const base = new Date(today);
    base.setDate(base.getDate() + offset);
    return base.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock
              className={cn("w-6 h-6 cursor-pointer transition-transform", isPulsing && "animate-pulse")}
              onClick={() => setClockClicks((prev) => prev + 1)}
            />
            Timezone Converter
          </h1>
          <div className="flex items-center gap-3">
            <span className="font-mono tabular-nums text-lg text-primary-foreground">{selectedHour.toString().padStart(2, "0")}:00</span>
            <label className="text-sm flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" checked={use24Hour} onChange={() => setUse24Hour(!use24Hour)} />
              24-Hour
            </label>
            <button
              className="text-sm underline flex items-center gap-1 text-muted-foreground"
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

        <div className="overflow-x-auto rounded-lg bg-muted shadow-inner border border-border">
          <div ref={scrollRef} className="grid grid-cols-[180px_repeat(48,56px)] text-sm relative scroll-x">
            <div className="sticky left-0 z-10 bg-muted">
              <div className="px-4 py-2 font-semibold border-r border-b">Timezone</div>
              {zones.map((tz, i) => (
                <div
                  key={tz}
                  className="flex items-center justify-between px-4 py-2 font-medium border-r border-b cursor-move"
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
                    <span className="font-semibold text-foreground">{tz.split("/").pop()?.replaceAll("_", " ")}</span>
                  </span>
                  <button onClick={() => removeZone(tz)}><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            {Array.from({ length: 2 }).flatMap((_, dayOffset) => (
              Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={`${dayOffset}-${hour}`}
                  onClick={() => dayOffset === 0 && setSelectedHour(hour)}
                  className={cn(
                    "border-r border-b text-center px-1 py-2 cursor-pointer tabular-nums",
                    selectedHour === hour && dayOffset === 0 && "bg-primary text-background font-bold"
                  )}
                >
                  <div className="text-xs font-semibold">
                    {dayOffset === 0 ? "Today" : formatDay(dayOffset)}
                  </div>
                  {zones.map((tz) => (
                    <div key={tz}>{formatTime(tz, hour, dayOffset)}</div>
                  ))}
                </div>
              ))
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {COMMON_ZONES.map((tz) => (
            <button
              key={tz}
              onClick={() => addZone(tz)}
              disabled={zones.includes(tz)}
              className="px-3 py-1 text-sm bg-muted border border-border rounded hover:bg-accent disabled:opacity-50"
            >
              + {tz.split("/").pop()?.replaceAll("_", " ")}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
