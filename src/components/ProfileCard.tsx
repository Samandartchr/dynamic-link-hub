import type { ReactElement } from "react";
import { Instagram, Mail, Send, Linkedin, Facebook, Youtube } from "lucide-react";
import type { Profile, SocialKey } from "@/lib/firebase";
import defaultAvatar from "@/assets/avatar-default.png";
import defaultCover from "@/assets/cover-default.jpg";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.66 22H1.4l8.02-9.16L1 2h7.02l4.84 6.4L18.244 2Z" />
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

function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .2 5.3.2 11.84c0 2.08.55 4.12 1.6 5.92L0 24l6.4-1.68a11.84 11.84 0 0 0 5.65 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.38-8.44ZM12.06 21.6h-.01a9.74 9.74 0 0 1-4.96-1.36l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.78 9.78 0 0 1-1.5-5.2c0-5.4 4.4-9.8 9.84-9.8 2.63 0 5.1 1.02 6.96 2.88a9.77 9.77 0 0 1 2.88 6.94c0 5.42-4.42 9.83-9.83 9.83Zm5.4-7.36c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15s-.77.97-.94 1.17c-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.78-1.67-2.08-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.02-1.05 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.2 5.08 4.5.71.3 1.26.48 1.69.62.71.22 1.36.19 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/>
    </svg>
  );
}

const SOCIAL_META: Record<SocialKey, { label: string; Icon: (p: { className?: string }) => JSX.Element }> = {
  instagram: { label: "Instagram", Icon: ({ className }) => <Instagram className={className} strokeWidth={1.8} /> },
  x: { label: "X", Icon: XIcon },
  threads: { label: "Threads", Icon: ThreadsIcon },
  email: { label: "Email", Icon: ({ className }) => <Mail className={className} strokeWidth={1.8} /> },
  telegram: { label: "Telegram", Icon: ({ className }) => <Send className={className} strokeWidth={1.8} /> },
  whatsapp: { label: "WhatsApp", Icon: WhatsappIcon },
  linkedin: { label: "LinkedIn", Icon: ({ className }) => <Linkedin className={className} strokeWidth={1.8} /> },
  facebook: { label: "Facebook", Icon: ({ className }) => <Facebook className={className} strokeWidth={1.8} /> },
  youtube: { label: "YouTube", Icon: ({ className }) => <Youtube className={className} strokeWidth={1.8} /> },
};

const SOCIAL_ORDER: SocialKey[] = [
  "instagram", "x", "threads", "email", "telegram", "whatsapp", "linkedin", "facebook", "youtube",
];

function buildHref(key: SocialKey, value: string) {
  if (key === "email" && !value.startsWith("mailto:")) return `mailto:${value}`;
  if (key === "whatsapp" && /^\+?[0-9\s-]+$/.test(value)) {
    return `https://wa.me/${value.replace(/[^0-9]/g, "")}`;
  }
  if (key === "telegram" && !/^https?:\/\//.test(value)) {
    return `https://t.me/${value.replace(/^@/, "")}`;
  }
  return value;
}

export function ProfileCard({ profile }: { profile: Profile }) {
  const cover = profile.coverUrl || defaultCover;
  const avatar = profile.avatarUrl || defaultAvatar;

  const links = SOCIAL_ORDER
    .filter((k) => profile.socials?.[k])
    .map((k) => ({ key: k, href: buildHref(k, profile.socials![k]!), ...SOCIAL_META[k] }));

  return (
    <div className="w-full max-w-[420px] rounded-[32px] bg-card shadow-card overflow-hidden">
      <div className="relative h-44 mx-3 mt-3 rounded-2xl overflow-hidden">
        <img src={cover} alt="" className="w-full h-full object-cover" loading="eager" />
      </div>

      <div className="relative flex flex-col items-center px-6 pb-6">
        <div className="-mt-12 relative z-10 rounded-full p-[3px] bg-[conic-gradient(from_0deg,#ff5e62,#ff9966,#ffd166,#06d6a0,#118ab2,#7c5cff,#ff5e62)]">
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

        {links.length > 0 && (
          <div className="mt-6 w-full flex flex-col gap-3">
            {links.map(({ key, href, label, Icon }) => (
              <a
                key={key}
                href={href}
                target={key === "email" ? undefined : "_blank"}
                rel="noreferrer"
                className="group flex items-center gap-3 w-full rounded-2xl bg-secondary/60 hover:bg-secondary px-5 py-3.5 text-foreground transition active:scale-[0.99]"
              >
                <Icon className="h-5 w-5 text-foreground/80" />
                <span className="font-semibold text-[15px]">{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
