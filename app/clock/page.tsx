"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, GripVertical, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";

type TimeFormat = "ampm" | "24hr" | "mixed";

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
  "Asia/Dubai",
];

export default function ClockPage() {
  const router = useRouter();
  const [zones, setZones] = useState<string[]>(COMMON_ZONES.slice(0, 3));
  const [selectedHour, setSelectedHour] = useState<number>(new Date().getHours());
  const [copied, setCopied] = useState(false);
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("ampm");
  const today = new Date();
  const dragStart = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const preset = url.searchParams.get("zones");
    const hour = url.searchParams.get("hour");
    if (preset) setZones(preset.split(","));
    if (hour) setSelectedHour(parseInt(hour));
  }, []);

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

  const formatDay = (offset: number) => {
    const base = new Date(today);
    base.setDate(base.getDate() + offset);
    return base.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTimeParts = (
    tz: string,
    hour: number,
    offset: number,
    format: TimeFormat
  ) => {
    const base = new Date(today);
    base.setDate(base.getDate() + offset);
    base.setHours(hour, 0, 0, 0);

    const isMixed = format === "mixed";
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: isMixed ? undefined : format === "ampm",
    };

    const parts = base.toLocaleTimeString([], options);
    const [time, ampmRaw] = parts.split(" ");
    const [hh, mm] = time.split(":");
    return {
      hour: hh,
      minute: mm === "00" ? "" : mm,
      ampm: ampmRaw || "",
    };
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
            <span className="font-mono tabular-nums text-lg text-primary-foreground">
              {selectedHour.toString().padStart(2, "0")}:00
            </span>
            <div className="flex gap-2 text-sm">
              {(["ampm", "24hr", "mixed"] as TimeFormat[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimeFormat(mode)}
                  className={cn(
                    "px-2 py-1 rounded transition text-muted-foreground",
                    timeFormat === mode && "bg-primary text-background"
                  )}
                >
                  {mode === "ampm"
                    ? "AM/PM"
                    : mode === "24hr"
                    ? "24-Hour"
                    : "Mixed"}
                </button>
              ))}
            </div>
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
              <div className="px-4 py-2 font-semibold border-r border-b">
                Timezone
              </div>
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
                  <button onClick={() => removeZone(tz)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {Array.from({ length: 2 }).flatMap((_, dayOffset) =>
              Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={`${dayOffset}-${hour}`}
                  onClick={() => dayOffset === 0 && setSelectedHour(hour)}
                  className={cn(
                    "border-r border-b text-center px-1 py-2 cursor-pointer tabular-nums",
                    selectedHour === hour &&
                      dayOffset === 0 &&
                      "bg-primary text-background font-bold"
                  )}
                >
                  <div className="text-xs font-semibold">
                    {dayOffset === 0 ? "Today" : formatDay(dayOffset)}
                  </div>
                  {zones.map((tz) => {
                    const { hour: h, minute, ampm } = formatTimeParts(
                      tz,
                      hour,
                      dayOffset,
                      timeFormat
                    );
                    return (
                      <div key={tz} className="leading-tight">
                        <span className="text-base">{h}</span>
                        {minute && (
                          <span className="text-[10px] align-super ml-[1px]">
                            {minute}
                          </span>
                        )}
                        {timeFormat !== "24hr" && ampm && (
                          <span className="text-[10px] ml-[1px] uppercase">
                            {ampm}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))
            )}
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
