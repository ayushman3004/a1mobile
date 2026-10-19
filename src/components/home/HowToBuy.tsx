import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react";

export default function HowToBuy() {
  const steps = [
    {
      num: "01",
      title: "Choose Your Device",
      desc: "Browse flagship smartphones, accessories and compare top tech specifications.",
      icon: <Search className="w-5 h-5 text-[#E66827]" />,
    },
    {
      num: "02",
      title: "Place Your Order",
      desc: "Add to cart, apply available bank discount codes, and choose UPI or Cash on Delivery.",
      icon: <ShoppingCart className="w-5 h-5 text-[#26784F]" />,
    },
    {
      num: "03",
      title: "Fast Delivery",
      desc: "Real-time dispatch from our Gorakhpur hub with tamper-evident safe packaging.",
      icon: <Truck className="w-5 h-5 text-[#E66827]" />,
    },
    {
      num: "04",
      title: "Enjoy Your New Device",
      desc: "Unbox your genuine authentic device covered under official brand warranty.",
      icon: <CheckCircle className="w-5 h-5 text-[#26784F]" />,
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#24211E] text-[#EDE6DC] border-b border-[#3D3731]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest uppercase text-[#EDE6DC]/60">
            SIMPLE SHOPPING PROCESS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight mt-1 text-white">
            How to Buy From A1
          </h2>
          <p className="text-sm text-[#EDE6DC]/80 mt-2">
            A seamless, transparent retail experience from click to unboxing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#2D2925] border border-[#3D3731] rounded-2xl p-6 flex flex-col justify-between hover:border-[#575047] transition group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl font-black text-[#575047] group-hover:text-white transition">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#24211E] border border-[#3D3731] flex items-center justify-center">
                    {step.icon}
                  </div>
                </div>

                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-[#EDE6DC]/70 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
