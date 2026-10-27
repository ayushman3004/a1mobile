import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";
import { InstagramIcon } from "@/components/shared/Icons";
import { IStoreSettings } from "@/types";

export default function TopBar({ settings }: { settings: IStoreSettings }) {
  if (!settings.announcementActive) return null;

  return (
    <div className="bg-[#24211E] text-[#EDE6DC] text-xs py-2 px-3 sm:px-4 border-b border-[#3D3731] overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Announcement */}
        <div className="font-medium tracking-wide flex items-center gap-2 min-w-0">
          <span className="w-2 h-2 rounded-full bg-[#26784F] inline-block shrink-0 animate-pulse" />
          <span className="truncate">{settings.announcementText}</span>
        </div>

        {/* Right: Store location & links */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Location — hidden on xs, visible from sm */}
          <a
            href={settings.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Store Location on Google Maps"
            className="hidden sm:flex items-center gap-1 text-[#EDE6DC]/80 hover:text-white transition group cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-[#E66827] shrink-0 group-hover:scale-110 transition-transform" />
            <span className="whitespace-nowrap group-hover:underline underline-offset-2">
              {settings.landmark ? `${settings.landmark}, ` : ""}
              {settings.city}
            </span>
          </a>

          {/* Instagram — hidden on xs, visible from md */}
          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-1 text-[#EDE6DC]/80 hover:text-white transition"
          >
            <InstagramIcon className="w-3 h-3 text-pink-400 shrink-0" />
            <span className="whitespace-nowrap">{settings.instagramHandle}</span>
          </a>

          {/* Contact — always visible */}
          <Link
            href="/#store-location"
            className="flex items-center gap-1 text-[#EDE6DC]/80 hover:text-white transition underline underline-offset-2 whitespace-nowrap"
          >
            <PhoneCall className="w-3 h-3 shrink-0" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
