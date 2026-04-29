"use client";

import { useEffect, useState } from "react";

const KEY = "hentaiki:settings";

type Settings = {
  defaultAudio: "sub" | "dub";
  defaultQuality: "auto" | "1080p" | "720p" | "480p";
  autoplayNext: boolean;
  autoplayPreviews: boolean;
  cc: boolean;
  reduceMotion: boolean;
  matureFilter: boolean;
  emailNotifs: boolean;
  pushNotifs: boolean;
  releaseDigest: "daily" | "weekly" | "off";
  adPersonalization: boolean;
  adVolumeMatch: boolean;
  adCategories: "broad" | "limited";
};

const defaults: Settings = {
  defaultAudio: "sub",
  defaultQuality: "auto",
  autoplayNext: true,
  autoplayPreviews: true,
  cc: false,
  reduceMotion: false,
  matureFilter: false,
  emailNotifs: true,
  pushNotifs: false,
  releaseDigest: "weekly",
  adPersonalization: true,
  adVolumeMatch: true,
  adCategories: "broad",
};

export function SettingsClient() {
  const [s, setS] = useState<Settings>(defaults);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setS({ ...defaults, ...JSON.parse(raw) });
    } catch {}
  }, []);

  function update<K extends keyof Settings>(k: K, v: Settings[K]) {
    const next = { ...s, [k]: v };
    setS(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
      setSaved(true);
      window.setTimeout(() => setSaved(false), 1400);
    } catch {}
  }

  return (
    <div className="space-y-8">
      <Group title="Playback" desc="How episodes start and look out of the box.">
        <Row label="Default audio">
          <Segmented
            value={s.defaultAudio}
            options={[
              { value: "sub", label: "Sub" },
              { value: "dub", label: "Dub" },
            ]}
            onChange={(v) => update("defaultAudio", v as Settings["defaultAudio"])}
          />
        </Row>
        <Row label="Default quality">
          <Segmented
            value={s.defaultQuality}
            options={[
              { value: "auto", label: "Auto" },
              { value: "1080p", label: "1080p" },
              { value: "720p", label: "720p" },
              { value: "480p", label: "480p" },
            ]}
            onChange={(v) => update("defaultQuality", v as Settings["defaultQuality"])}
          />
        </Row>
        <Row label="Subtitles on by default" hint="Show captions whenever a track is available.">
          <Toggle on={s.cc} onChange={(v) => update("cc", v)} />
        </Row>
        <Row label="Autoplay next episode">
          <Toggle on={s.autoplayNext} onChange={(v) => update("autoplayNext", v)} />
        </Row>
        <Row label="Autoplay hover previews" hint="Play a short preview when you linger on a card.">
          <Toggle on={s.autoplayPreviews} onChange={(v) => update("autoplayPreviews", v)} />
        </Row>
      </Group>

      <Group title="Display" desc="The little things that make the app feel calmer.">
        <Row label="Reduce motion" hint="Soften transitions, marquees, parallax.">
          <Toggle on={s.reduceMotion} onChange={(v) => update("reduceMotion", v)} />
        </Row>
        <Row label="Hide mature artwork on home" hint="Use neutral covers in shared spaces.">
          <Toggle on={s.matureFilter} onChange={(v) => update("matureFilter", v)} />
        </Row>
      </Group>

      <section id="ads">
        <Group title="Ads" desc="hentaiki is free, supported by short, brand-safe ads. Tune what you'd like to see.">
          <Row label="Personalize ads" hint="Use rough country and device only — never your watch history.">
            <Toggle on={s.adPersonalization} onChange={(v) => update("adPersonalization", v)} />
          </Row>
          <Row label="Match ad volume to playback" hint="Keeps loud ads from blowing past your audio.">
            <Toggle on={s.adVolumeMatch} onChange={(v) => update("adVolumeMatch", v)} />
          </Row>
          <Row label="Ad categories">
            <Segmented
              value={s.adCategories}
              options={[
                { value: "broad", label: "All advertisers" },
                { value: "limited", label: "Limit to brand-safe only" },
              ]}
              onChange={(v) => update("adCategories", v as Settings["adCategories"])}
            />
          </Row>
        </Group>
      </section>

      <Group title="Notifications" desc="We'll only ever send what you ask for.">
        <Row label="Email me new episodes">
          <Toggle on={s.emailNotifs} onChange={(v) => update("emailNotifs", v)} />
        </Row>
        <Row label="Push notifications">
          <Toggle on={s.pushNotifs} onChange={(v) => update("pushNotifs", v)} />
        </Row>
        <Row label="Release digest">
          <Segmented
            value={s.releaseDigest}
            options={[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "off", label: "Off" },
            ]}
            onChange={(v) => update("releaseDigest", v as Settings["releaseDigest"])}
          />
        </Row>
      </Group>

      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-[var(--bg-2)] px-4 py-2 text-[0.86rem] font-semibold text-[var(--fg-4)] shadow-2xl shadow-black/40 transition ${saved ? "opacity-100" : "opacity-0"}`}
      >
        Saved
      </div>
    </div>
  );
}

function Group({
  title,
  desc,
  children,
}: {
  title: string;
  desc?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <header className="mb-3">
        <h2 className="text-[1.1rem] font-bold tracking-tight text-[var(--fg-4)]">
          {title}
        </h2>
        {desc && <p className="mt-1 text-[0.92rem] text-[var(--fg-1)]">{desc}</p>}
      </header>
      <div className="card divide-y divide-[var(--bg-3)]/70">{children}</div>
    </section>
  );
}

function Row({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="min-w-0">
        <p className="text-[0.98rem] font-semibold text-[var(--fg-4)]">{label}</p>
        {hint && <p className="mt-0.5 text-[0.84rem] text-[var(--fg-1)]">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}

function Toggle({
  on,
  onChange,
}: {
  on: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onChange(!on)}
      className={`relative h-6 w-11 rounded-full transition ${on ? "bg-[var(--brand)]" : "bg-[var(--bg-3)]"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-md transition ${on ? "left-[1.4rem]" : "left-0.5"}`}
      />
    </button>
  );
}

function Segmented({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full bg-[var(--bg-2)] p-1">
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={`rounded-full px-3 py-1.5 text-[0.84rem] font-semibold transition ${
              active
                ? "bg-[var(--brand)] text-[oklch(0.18_0.02_30)]"
                : "text-[var(--fg-2)] hover:text-[var(--fg-4)]"
            }`}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}
