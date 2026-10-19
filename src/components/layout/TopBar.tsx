import Link from "next/link";
import { MapPin, PhoneCall } from "lucide-react";
import { InstagramIcon } from "@/components/shared/Icons";
import { IStoreSettings } from "@/types";

export default function TopBar({ settings }: { settings: IStoreSettings }) {
  if (!settings.announcementActive) return null;

  return (
    <div className="bg-[#24211E] text-[#EDE6DC] text-xs py-2 px-4 border-b border-[#3D3731]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        {/* Left: Announcement */}
        <div className="font-medium tracking-wide flex items-center gap-2 text-center sm:text-left">
          <span className="w-2 h-2 rounded-full bg-[#26784F] inline-block animate-pulse"></span>
          <span>{settings.announcementText}</span>
        </div>

        {/* Right: Store location & links */}
        <div className="flex items-center gap-4 text-xs font-normal">
          <div className="flex items-center gap-1.5 text-[#EDE6DC]/80 hover:text-white transition">
            <MapPin className="w-3.5 h-3.5 text-[#E66827]" />
            <span>
              {settings.landmark ? `${settings.landmark}, ` : ""}
              {settings.city}
            </span>
          </div>

          <a
            href={settings.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#EDE6DC]/80 hover:text-white transition"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>{settings.instagramHandle}</span>
          </a>

          <Link
            href="/#store-location"
            className="flex items-center gap-1.5 text-[#EDE6DC]/80 hover:text-white transition underline underline-offset-2"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Contact Us</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
