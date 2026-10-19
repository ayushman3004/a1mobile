import { CheckCircle2, BadgePercent, RefreshCw, HeadphonesIcon } from "lucide-react";

export default function WhyChooseA1() {
  const cards = [
    {
      title: "Genuine Products",
      desc: "Every device is verified and authentic with official brand warranty.",
      icon: <CheckCircle2 className="w-6 h-6 text-[#26784F]" />,
      badge: "100% Authentic",
    },
    {
      title: "Best Prices",
      desc: "Competitive prices and exclusive deals tailored for Gorakhpur residents.",
      icon: <BadgePercent className="w-6 h-6 text-[#E66827]" />,
      badge: "Guaranteed Value",
    },
    {
      title: "Easy Exchange",
      desc: "Get better value for your old device with our free doorstep pickup.",
      icon: <RefreshCw className="w-6 h-6 text-[#24211E]" />,
      badge: "Instant Cash",
    },
    {
      title: "Trusted Support",
      desc: "Dedicated support before and after purchase via call, store, and WhatsApp.",
      icon: <HeadphonesIcon className="w-6 h-6 text-[#575047]" />,
      badge: "Local Hub",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F5EFE6] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
            The A1 Promise
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
            Why Choose A1?
          </h2>
          <p className="text-sm text-[#575047] mt-2">
            Gorakhpur&apos;s most trusted mobile store for brand new tech and
            instant buyback.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-6 flex flex-col justify-between hover:shadow-md hover:border-[#575047]/30 transition"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center">
                    {card.icon}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DED6CA] text-[#575047]">
                    {card.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#24211E] mb-2">
                  {card.title}
                </h3>
                <p className="text-xs text-[#575047] leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
