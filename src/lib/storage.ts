"use client";

import { useEffect, useState, useCallback } from "react";

const MY_LIST_KEY = "hentaiki:my-list";
const CONT_KEY = "hentaiki:continue-watching";

type Listener = () => void;
const listeners = new Set<Listener>();
function notify() {
  for (const l of listeners) l();
}

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    notify();
  } catch {
    /* ignore quota / disabled storage */
  }
}

/* ---------- My List ---------- */

export function useMyList(): {
  list: string[];
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  ready: boolean;
} {
  const [list, setList] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setList(read<string[]>(MY_LIST_KEY, []));
    refresh();
    setReady(true);
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, []);

  const add = useCallback((slug: string) => {
    const cur = read<string[]>(MY_LIST_KEY, []);
    if (cur.includes(slug)) return;
    write(MY_LIST_KEY, [slug, ...cur]);
  }, []);
  const remove = useCallback((slug: string) => {
    const cur = read<string[]>(MY_LIST_KEY, []);
    write(
      MY_LIST_KEY,
      cur.filter((s) => s !== slug),
    );
  }, []);
  const toggle = useCallback(
    (slug: string) => {
      const cur = read<string[]>(MY_LIST_KEY, []);
      if (cur.includes(slug)) remove(slug);
      else add(slug);
    },
    [add, remove],
  );
  const has = useCallback((slug: string) => list.includes(slug), [list]);

  return { list, has, toggle, add, remove, ready };
}

/* ---------- Continue Watching ---------- */

export type ContinueRecord = {
  slug: string;
  episode: number;       // 1-based
  progress: number;      // 0..1
  updatedAt: number;     // epoch ms
};

export function useContinueWatching(): {
  records: ContinueRecord[];
  for: (slug: string) => ContinueRecord | undefined;
  upsert: (rec: ContinueRecord) => void;
  remove: (slug: string) => void;
  ready: boolean;
} {
  const [records, setRecords] = useState<ContinueRecord[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setRecords(read<ContinueRecord[]>(CONT_KEY, []));
    refresh();
    setReady(true);
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, []);

  const upsert = useCallback((rec: ContinueRecord) => {
    const cur = read<ContinueRecord[]>(CONT_KEY, []);
    const next = [rec, ...cur.filter((r) => r.slug !== rec.slug)].slice(0, 12);
    write(CONT_KEY, next);
  }, []);
  const remove = useCallback((slug: string) => {
    const cur = read<ContinueRecord[]>(CONT_KEY, []);
    write(
      CONT_KEY,
      cur.filter((r) => r.slug !== slug),
    );
  }, []);
  const forSlug = useCallback(
    (slug: string) => records.find((r) => r.slug === slug),
    [records],
  );

  return { records, for: forSlug, upsert, remove, ready };
}

/** Seed continue-watching with a few mock records on first visit, so the
 *  Continue Watching row is populated even before the user touches a player. */
export function seedContinueWatchingIfEmpty(slugs: string[]) {
  if (typeof window === "undefined") return;
  const cur = read<ContinueRecord[]>(CONT_KEY, []);
  if (cur.length > 0) return;
  const seeds: ContinueRecord[] = slugs.slice(0, 5).map((slug, i) => ({
    slug,
    episode: 1 + (i % 3),
    progress: [0.18, 0.62, 0.34, 0.81, 0.07][i] ?? 0.25,
    updatedAt: Date.now() - i * 1000 * 60 * 60 * 6,
  }));
  write(CONT_KEY, seeds);
}
