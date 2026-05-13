import { Instagram, Plus } from "lucide-react";
import type { Profile } from "@/lib/firebase";
import defaultAvatar from "@/assets/avatar-default.png";
import defaultCover from "@/assets/cover-default.jpg";

function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.66 22H1.4l8.02-9.16L1 2h7.02l4.84 6.4L18.244 2Zm-1.2 18h1.86L7.04 4H5.08l11.964 16Z" />
    </svg>
  );
}

function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className} aria-hidden="true">
      <path d="M12 21c-5 0-8-3.2-8-9s3-9 8-9c4 0 6.5 2 7 5" strokeLinecap="round" />
      <path d="M9 13.5c.5 2 2 3 4 3 2.2 0 3.7-1.3 3.7-3.2 0-2-1.7-3.1-4.7-3.3-3-.2-4.6-1-4.6-2.7 0-1.6 1.5-2.8 3.7-2.8 1.9 0 3.2.9 3.7 2.5" strokeLinecap="round" />
    </svg>
  );
}

export function ProfileCard({ profile }: { profile: Profile }) {
  const cover = profile.coverUrl || defaultCover;
  const avatar = profile.avatarUrl || defaultAvatar;

  return (
    <div className="w-full max-w-[420px] rounded-[32px] bg-card shadow-card overflow-hidden">
      <div className="relative h-44 mx-3 mt-3 rounded-2xl overflow-hidden">
        <img
          src={cover}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
        <button
          type="button"
          aria-label="Follow"
          className="absolute top-3 right-3 h-10 w-10 rounded-full bg-card shadow-soft flex items-center justify-center text-foreground transition hover:scale-105 active:scale-95"
        >
          <Plus className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>

      <div className="-mt-12 flex flex-col items-center px-6 pb-6">
        <div className="rounded-full p-[3px] bg-[conic-gradient(from_0deg,#ff5e62,#ff9966,#ffd166,#06d6a0,#118ab2,#7c5cff,#ff5e62)]">
          <div className="rounded-full bg-card p-1">
            <img
              src={avatar}
              alt={profile.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          </div>
        </div>

        <h1 className="mt-5 text-[28px] font-bold tracking-tight text-foreground text-center">
          {profile.name}
        </h1>
        <p className="mt-2 text-center text-muted-foreground text-[15px] leading-relaxed max-w-[280px]">
          {profile.bio}
        </p>

        <div className="mt-6 w-full rounded-2xl bg-secondary/60 px-5 py-4 grid grid-cols-3 gap-2">
          <Stat label="Likes" value={formatCount(profile.likes)} />
          <Stat label="Posts" value={formatCount(profile.posts)} />
          <Stat label="Views" value={formatCount(profile.views)} />
        </div>

        <div className="mt-6 flex items-center gap-7 text-foreground/80">
          {profile.socials?.instagram && (
            <a href={profile.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="transition hover:text-foreground">
              <Instagram className="h-6 w-6" strokeWidth={1.8} />
            </a>
          )}
          {profile.socials?.x && (
            <a href={profile.socials.x} target="_blank" rel="noreferrer" aria-label="X" className="transition hover:text-foreground">
              <XIcon className="h-5 w-5" />
            </a>
          )}
          {profile.socials?.threads && (
            <a href={profile.socials.threads} target="_blank" rel="noreferrer" aria-label="Threads" className="transition hover:text-foreground">
              <ThreadsIcon className="h-6 w-6" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-[22px] font-bold text-foreground tracking-tight">{value}</span>
      <span className="text-sm text-muted-foreground mt-0.5">{label}</span>
    </div>
  );
}
