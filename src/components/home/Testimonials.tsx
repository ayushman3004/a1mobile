import { Star, ShieldCheck, CheckCircle2 } from "lucide-react";
import { ITestimonial } from "@/types";

export default function Testimonials({
  testimonials,
}: {
  testimonials: ITestimonial[];
}) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="py-14 sm:py-20 bg-[#EEE7DC] border-b border-[#DED6CA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#77716A]">
            REPUTATION & FEEDBACK
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#24211E] tracking-tight mt-1">
            What Our Customers Say
          </h2>
          <p className="text-sm text-[#575047] mt-2">
            Read real experiences from tech buyers and device sellers across
            Gorakhpur and India.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={t._id || idx}
              className="bg-[#EDE6DC] rounded-2xl border border-[#DED6CA] p-6 flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                {/* Rating & Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500 gap-0.5">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  {t.isDemo ? (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#DED6CA] text-[#77716A] uppercase">
                      Demo Feedback
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-[#26784F] flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#575047] leading-relaxed italic mb-4">
                  &ldquo;{t.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#DED6CA]">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#24211E]">
                      {t.customerName}
                    </h4>
                    <p className="text-[10px] text-[#77716A]">{t.city}</p>
                  </div>
                  {t.verifiedPurchase && (
                    <span title="Verified customer">
                      <CheckCircle2 className="w-4 h-4 text-[#26784F]" />
                    </span>
                  )}
                </div>
                {t.devicePurchasedOrSold && (
                  <span className="text-[10px] font-semibold text-[#575047] block mt-1">
                    {t.devicePurchasedOrSold}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
