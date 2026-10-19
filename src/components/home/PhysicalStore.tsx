import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  PhoneCall,
  CheckCircle,
} from "lucide-react";
import { IStoreSettings } from "@/types";

export default function PhysicalStore({
  settings,
}: {
  settings: IStoreSettings;
}) {
  return (
    <section
      id="store-location"
      className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#DED6CA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
            LOCAL PRESENCE
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
            Visit A1 Mobile Shop
          </h2>
          <p className="text-sm text-[#575047] mt-2 leading-relaxed">
            Experience the latest flagship smartphones hands-on, test
            accessories, or get your old phone inspected instantly for highest
            cash value.
          </p>
        </div>

        {/* Large Rounded Store Information Card */}
        <div className="bg-[#EDE6DC] rounded-3xl border border-[#DED6CA] overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Store Photograph */}
          <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto min-h-[300px] bg-[#F5EFE6]">
            {settings.storeImageUrl ? (
              <Image
                src={settings.storeImageUrl}
                alt="A1 Mobile Shop Gorakhpur Storefront"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#DED6CA] text-[#77716A]">
                Storefront Gorakhpur
              </div>
            )}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-[#24211E]/80 backdrop-blur-xs text-[#EDE6DC] text-xs font-bold flex items-center gap-1.5 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#26784F] animate-pulse"></span>
              <span>Basharatpur Hub</span>
            </div>
          </div>

          {/* Right: Store Details */}
          <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#77716A]">
                  FLAGSHIP STORE
                </span>
                {settings.isOpenToday ? (
                  <span className="px-2.5 py-1 rounded-full bg-[#26784F]/10 text-[#26784F] text-xs font-bold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Open Today
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold">
                    Closed
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-[#24211E]">
                {settings.storeName}
              </h3>
              <p className="text-xs sm:text-sm text-[#575047] mt-1">
                {settings.tagline}
              </p>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-[#575047]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#E66827]" />
                </div>
                <div>
                  <span className="font-bold text-[#24211E] block">Address</span>
                  <span>
                    {settings.address}, {settings.landmark ? `${settings.landmark}, ` : ""}
                    {settings.city}, {settings.state} - {settings.pincode}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#24211E]" />
                </div>
                <div>
                  <span className="font-bold text-[#24211E] block">
                    Opening Hours
                  </span>
                  <span>{settings.openingHours}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#26784F]" />
                </div>
                <div>
                  <span className="font-bold text-[#24211E] block">
                    Store Assistance
                  </span>
                  <span>{settings.phone} {settings.altPhone ? `| ${settings.altPhone}` : ""}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-[#DED6CA]">
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-5 rounded-full bg-[#24211E] text-[#EDE6DC] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#3D3731] transition shadow-xs"
              >
                <Navigation className="w-4 h-4 text-[#E66827]" />
                <span>Get Directions</span>
              </a>

              <a
                href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                className="flex-1 py-3 px-5 rounded-full bg-[#F5EFE6] text-[#24211E] border border-[#DED6CA] font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#DED6CA] transition"
              >
                <PhoneCall className="w-4 h-4 text-[#26784F]" />
                <span>Call Store</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
