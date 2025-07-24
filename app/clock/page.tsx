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
  const scrollRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  const now = new Date();
  const [zones, setZones] = useState<string[]>([]);
  const [use24Hour, setUse24Hour] = useState(false);
  const [copied, setCopied] = useState(false);
  const [startHour, setStartHour] = useState(now.getHours());

  useEffect(() => {
    const stored = localStorage.getItem("zones");
    setZones(stored ? JSON.parse(stored) : COMMON_ZONES.slice(0, 3));
  }, []);

  useEffect(() => {
    localStorage.setItem("zones", JSON.stringify(zones));
  }, [zones]);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 180 + 56 * 1 - 300;
      }
    }, 200);
  }, [startHour]);

  const updateURL = (zones: string[]) => {
    const query = `?zones=${zones.join(",")}`;
    router.replace(query);
  };

  const addZone = (tz: string) => {
    if (!zones.includes(tz)) {
      const updated = [...zones, tz];
      setZones(updated);
      updateURL(updated);
    }
  };

  const removeZone = (tz: string) => {
    const updated = zones.filter((z) => z !== tz);
    setZones(updated);
    updateURL(updated);
  };

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
    updateURL(updated);
  };

  const formatTimeParts = (tz: string, hour: number, offset: number) => {
    const base = new Date();
    base.setDate(base.getDate() + offset);
    base.setHours(hour, 0, 0, 0);
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: !use24Hour
    });

    const [h, m] = formatter.format(base).split(":");
    const hourPart = h.replace(/[^\d]/g, "");
    const minutePart = m?.slice(0, 2) ?? "00";
    const ampm = formatter.formatToParts(base).find(p => p.type === "dayPeriod")?.value ?? "";

    return { hourPart, minutePart, ampm };
  };

  const formatDay = (offset: number) => {
    const base = new Date();
    base.setDate(base.getDate() + offset);
    return base.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const totalHours = 48;
  const hoursToShow = Array.from({ length: totalHours }, (_, i) => (startHour + i) % 24);
  const currentHourIndex = 0;

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

        <div className="overflow-x-auto rounded-lg bg-muted shadow-inner border border-border">
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
                    <GripVertical className="w-4 h-4 opacity-30" />
                    <span className="font-semibold text-foreground">
                      {tz.split("/").pop()?.replaceAll("_", " ")}
                    </span>
                  </span>
                  <button onClick={() => removeZone(tz)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {hoursToShow.map((hour, idx) => (
              <div
                key={hour + "-" + idx}
                className={cn(
                  "border-r border-b text-center px-1 py-2 tabular-nums",
                  idx === currentHourIndex && "bg-background/10 border-l-4 border-primary"
                )}
              >
                <div className="text-xs font-semibold">Today</div>
                {zones.map((tz) => {
                  const { hourPart, minutePart, ampm } = formatTimeParts(tz, hour, 0);
                  return (
                    <div key={tz} className="leading-tight">
                      <span className="text-base font-semibold">{hourPart}</span>
                      {minutePart !== "00" && (
                        <sup className="text-xs align-super ml-0.5">{minutePart}</sup>
                      )}
                      {!use24Hour && (
                        <span className="text-[10px] uppercase ml-0.5">{ampm}</span>
                      )}
                    </div>
                  );
                })}
              </div>
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
