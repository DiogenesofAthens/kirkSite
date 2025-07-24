"use client";

import { useState, useEffect, useRef } from "react";
import { Clock, X, GripVertical, Link2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/floating-nav";
import { cn } from "@/lib/utils";

type TimeFormat = "ampm" | "24hr";

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

  const [zones, setZones] = useState(COMMON_ZONES.slice(0, 3));
  const [timeFormat, setTimeFormat] = useState<TimeFormat>("ampm");
  const [copied, setCopied] = useState(false);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);

  useEffect(() => {
    const now = new Date();
    const userTz = zones[0] || "UTC";
    const localHour = new Date(
      now.toLocaleString("en-US", { timeZone: userTz })
    ).getHours();
    setSelectedHour(localHour);
  }, [zones]);

  useEffect(() => {
    setTimeout(() => {
      if (scrollRef.current && selectedHour !== null) {
        scrollRef.current.scrollLeft = 180 + selectedHour * 56 - 300;
      }
    }, 300);
  }, [selectedHour]);

  const removeZone = (tz: string) => setZones((z) => z.filter((x) => x !== tz));
  const addZone = (tz: string) => !zones.includes(tz) && setZones([...zones, tz]);

  const reorderZones = (from: number, to: number) => {
    const updated = [...zones];
    const [moved] = updated.splice(from, 1);
    updated.splice(to, 0, moved);
    setZones(updated);
  };

  const formatDay = (offset: number) => {
    const date = new Date();
    date.setDate(date.getDate() + offset);
    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric"
    });
  };

  const formatTimeParts = (
    tz: string,
    hour: number,
    offset: number,
    format: TimeFormat
  ) => {
    const base = new Date();
    base.setDate(base.getDate() + offset);
    base.setHours(hour, 0, 0, 0);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: format === "ampm"
    };
    const parts = base.toLocaleTimeString([], options);
    const [h, m] = parts.split(":");
    const [minute, ampm] = m.split(" ");
    return {
      hour: h,
      minute: minute === "00" ? "" : minute,
      ampm
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
            <div className="flex gap-2 text-sm">
              {(["ampm", "24hr"] as TimeFormat[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTimeFormat(mode)}
                  className={cn(
                    "px-2 py-1 rounded transition text-muted-foreground",
                    timeFormat === mode && "bg-primary text-background"
                  )}
                >
                  {mode === "ampm" ? "AM/PM" : "24-Hour"}
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
            {/* Row 0 - Header */}
            <div className="sticky left-0 z-10 bg-muted px-4 py-2 font-semibold border-r border-b">
              Timezone
            </div>
            {Array.from({ length: 2 }).flatMap((_, offset) =>
              Array.from({ length: 24 }).map((_, hour) => (
                <div
                  key={`day-${offset}-hour-${hour}`}
                  className="border-r border-b text-center px-1 py-2 text-xs font-semibold"
                >
                  {offset === 0 ? "Today" : formatDay(offset)}
                </div>
              ))
            )}

            {/* Rows per timezone */}
            {zones.map((tz, i) => (
              <>
                <div
                  key={`tz-${tz}`}
                  className="sticky left-0 z-10 bg-muted border-r border-b flex items-center justify-between gap-2 px-4 py-2 font-medium cursor-move"
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
                    {tz.split("/").pop()?.replaceAll("_", " ")}
                  </span>
                  <button onClick={() => removeZone(tz)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
                {Array.from({ length: 2 }).flatMap((_, offset) =>
                  Array.from({ length: 24 }).map((_, hour) => {
                    const { hour: h, minute, ampm } = formatTimeParts(
                      tz,
                      hour,
                      offset,
                      timeFormat
                    );
                    return (
                      <div
                        key={`${tz}-${offset}-${hour}`}
                        onClick={() => offset === 0 && setSelectedHour(hour)}
                        className={cn(
                          "border-r border-b text-center px-1 py-1 cursor-pointer",
                          selectedHour === hour &&
                            offset === 0 &&
                            "bg-primary text-background font-bold"
                        )}
                      >
                        <span className="text-base">{h}</span>
                        {minute && (
                          <span className="text-[10px] align-super ml-[1px]">
                            {minute}
                          </span>
                        )}
                        {timeFormat === "ampm" && ampm && (
                          <span className="text-[10px] ml-[1px] uppercase">
                            {ampm}
                          </span>
                        )}
                      </div>
                    );
                  })
                )}
              </>
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
