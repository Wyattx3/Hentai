"use client";

import { useCallback, useEffect, useState } from "react";

const AUTH_KEY = "hentaiki:auth";

export type User = {
  id: string;
  email: string;
  name: string;
  joinedAt: number;
};

const listeners = new Set<() => void>();
function notify() {
  for (const l of listeners) l();
}

function readUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

function writeUser(u: User | null) {
  if (typeof window === "undefined") return;
  try {
    if (u) window.localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else window.localStorage.removeItem(AUTH_KEY);
    notify();
  } catch {
    /* ignore */
  }
}

export function useAuth(): {
  user: User | null;
  ready: boolean;
  signIn: (email: string, name?: string) => User;
  signOut: () => void;
} {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const refresh = () => setUser(readUser());
    refresh();
    setReady(true);
    listeners.add(refresh);
    return () => {
      listeners.delete(refresh);
    };
  }, []);

  const signIn = useCallback((email: string, name?: string) => {
    const trimmed = email.trim().toLowerCase();
    const fallbackName =
      trimmed.split("@")[0]?.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) ||
      "Member";
    const u: User = {
      id: `u_${trimmed.replace(/[^a-z0-9]/g, "")}`,
      email: trimmed,
      name: (name?.trim() || fallbackName).slice(0, 64),
      joinedAt: Date.now(),
    };
    writeUser(u);
    return u;
  }, []);

  const signOut = useCallback(() => {
    writeUser(null);
  }, []);

  return { user, ready, signIn, signOut };
}

/** Convert a user's name to two-letter monogram for avatars. */
export function monogram(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return ((parts[0][0] ?? "") + (parts[parts.length - 1][0] ?? "")).toUpperCase();
}
