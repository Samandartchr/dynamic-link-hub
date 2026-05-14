import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { fetchProfile, isFirebaseConfigured, type Profile } from "@/lib/firebase";

const mockProfile: Profile = {
  name: "Noah Thompson",
  bio: "Product Designer who focuses on simplicity & usability.",
  socials: {
    instagram: "https://instagram.com",
    x: "https://x.com",
    threads: "https://threads.net",
    email: "hello@example.com",
    telegram: "noah",
    whatsapp: "+10000000000",
    linkedin: "https://linkedin.com",
    facebook: "https://facebook.com",
    youtube: "https://youtube.com",
  },
};

function getIdFromUrl(): string {
  if (typeof window === "undefined") return "demo";
  return new URLSearchParams(window.location.search).get("id") || "demo";
}

export default function App() {
  const [id, setId] = useState<string>(() => getIdFromUrl());
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onPop = () => setId(getIdFromUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        if (!isFirebaseConfigured()) {
          if (!cancelled)
            setProfile({
              ...mockProfile,
              name: id === "demo" ? mockProfile.name : `Profile #${id}`,
            });
          return;
        }
        const data = await fetchProfile(id);
        if (cancelled) return;
        if (!data) setError(`No profile found for id "${id}".`);
        else setProfile(data);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-background px-4 py-10">
      {loading && (
        <div className="w-full max-w-[420px] h-[560px] rounded-[32px] bg-card shadow-card animate-pulse" />
      )}
      {!loading && error && (
        <div className="text-center text-muted-foreground text-sm max-w-sm">{error}</div>
      )}
      {!loading && !error && profile && <ProfileCard profile={profile} />}
    </main>
  );
}
