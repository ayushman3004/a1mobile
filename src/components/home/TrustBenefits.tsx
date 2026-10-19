import { ShieldCheck, Truck, RotateCcw, Lock } from "lucide-react";
import { ITrustBenefit } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  ShieldCheck: <ShieldCheck className="w-5 h-5 text-[#26784F]" />,
  Truck: <Truck className="w-5 h-5 text-[#E66827]" />,
  RotateCcw: <RotateCcw className="w-5 h-5 text-[#24211E]" />,
  Lock: <Lock className="w-5 h-5 text-[#575047]" />,
};

export default function TrustBenefits({
  benefits,
}: {
  benefits: ITrustBenefit[];
}) {
  if (!benefits || benefits.length === 0) return null;

  return (
    <section className="bg-[#EEE7DC] py-6 sm:py-8 border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit._id || benefit.title}
              className="flex items-center gap-3.5 p-4 rounded-xl bg-[#EDE6DC] border border-[#DED6CA] shadow-2xs hover:border-[#575047]/30 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-[#F5EFE6] border border-[#DED6CA] flex items-center justify-center shrink-0">
                {iconMap[benefit.iconName] || (
                  <ShieldCheck className="w-5 h-5 text-[#26784F]" />
                )}
              </div>
              <div className="leading-tight">
                <h4 className="text-xs sm:text-sm font-bold text-[#24211E]">
                  {benefit.title}
                </h4>
                <p className="text-[11px] text-[#77716A] mt-0.5">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
