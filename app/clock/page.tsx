"use client";

import { useEffect, useRef, useState } from "react";
import { Clock, X, GripVertical, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";

const COMMON_ZONES = [
  "America/Los_Angeles",
  "America/New_York",
  "Europe/London",
  "Europe/Paris",
  "Europe/Zurich",
  "Asia/Kolkata",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Australia/Sydney",
  "America/Sao_Paulo",
  "America/Chicago",
  "Europe/Berlin",
  "Africa/Johannesburg",
  "Asia/Dubai"
];

const HOUR_BLOCKS = 48;

export default function ClockPage() {
  const router = useRouter();
  const [zones, setZones] = useState<string[]>([]);
  const [use24Hour, setUse24Hour] = useState(false);
  const [copied, setCopied] = useState(false);
  const dragStart = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  const now = new Date();
  const baseHour = now.getHours();
  const baseMinute = now.getMinutes();

  useEffect(() => {
    const stored = localStorage.getItem("timezone-prefs");
    if (stored) setZones(JSON.parse(stored));
    else setZones(COMMON_ZONES.slice(0, 3));
  }, []);

  useEffect(() => {
    localStorage.setItem("timezone-prefs", JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (markerRef.current && scrollRef.current) {
        const colWidth = 56;
        const left = ((baseHour % 24) * colWidth) + (colWidth * (baseMinute / 60));
        markerRef.current.style.left = `${180 + left}px`;
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [baseHour, baseMinute]);

  const formatLabel = (dt: Date, tz: string) => {
    return dt.toLocaleTimeString("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: !use24Hour
    });
  };

  const formatDayLabel = (offset: number) => {
    const date = new Date();
    date.setHours(date.getHours() + offset);
    const isToday = date.getDate() === now.getDate();
    return isToday ? "Today" : date.toLocaleDateString(undefined, { weekday: "short" });
  };

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
  };

  const removeZone = (tz: string) => setZones(zones.filter(z => z !== tz));
  const addZone = (tz: string) => !zones.includes(tz) && setZones([...zones, tz]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingNav />
      <main className="px-4 pt-24 pb-12 max-w-7xl mx-auto space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Clock className="w-6 h-6" /> Timezone Converter
          </h1>
          <div className="flex items-center gap-3">
            <label className="text-sm flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={use24Hour}
                onChange={() => setUse24Hour(!use24Hour)}
              />
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

        <div className="relative overflow-x-auto rounded-lg bg-muted shadow-inner border border-border">
          <div ref={markerRef} className="absolute top-0 bottom-0 w-0.5 bg-primary/70 z-20 transition-all" />
          <div
            ref={scrollRef}
            className="grid grid-cols-[180px_repeat(48,56px)] text-sm relative scroll-x"
          >
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
                    <span className="font-semibold text-foreground">
                      {tz.split("/").pop()?.replaceAll("_", " ")}
                    </span>
                  </span>
                  <button onClick={() => removeZone(tz)}><X className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            {[...Array(HOUR_BLOCKS)].map((_, i) => {
              const offset = i;
              const labelTime = new Date();
              labelTime.setHours(labelTime.getHours() + offset);

              return (
                <div
                  key={`col-${i}`}
                  className="border-r border-b text-center px-1 py-2 tabular-nums min-w-[56px]"
                >
                  <div className="text-xs font-semibold">
                    {formatDayLabel(offset)}
                  </div>
                  {zones.map((tz) => (
                    <div key={`${tz}-${i}`}>{formatLabel(labelTime, tz)}</div>
                  ))}
                </div>
              );
            })}
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
