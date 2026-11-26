import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, Minus, Plus, ShoppingCart, Trash2, X, Sparkles, Clock3, Search, Check, Truck, Store, Banknote, CreditCard } from "lucide-react";
import { beverageItems } from "@/lib/beverage-items";
import heroImg from "@/assets/hero-luqayma.jpg";
import hali1 from "@/assets/hali/hali_1.jpg";
import hali2 from "@/assets/hali/hali_2.jpg";
import hali3 from "@/assets/hali/hali_3.jpg";
import hali4 from "@/assets/hali/hali_4.jpg";
import hali5 from "@/assets/hali/hali_5.jpg";
import hali6 from "@/assets/hali/hali_6.jpg";
import hali7 from "@/assets/hali/hali_7.jpg";
import hali8 from "@/assets/hali/hali_8.jpg";
import hali9 from "@/assets/hali/hali_9.jpg";
import hali10 from "@/assets/hali/hali_10.jpg";
import hali11 from "@/assets/hali/hali_11.jpg";
import haliB1 from "@/assets/hali/hali_b1.jpg";
import haliB2 from "@/assets/hali/hali_b2.jpg";
import haliB3 from "@/assets/hali/hali_b3.jpg";
import haliB4 from "@/assets/hali/hali_b4.jpg";
import haliB5 from "@/assets/hali/hali_b5.jpg";
import haliB6 from "@/assets/hali/hali_b6.jpg";
import haliB7 from "@/assets/hali/hali_b7.jpg";
import haliB8 from "@/assets/hali/hali_b8.jpg";
import haliB9 from "@/assets/hali/hali_b9.jpg";
import malhPdf1 from "@/assets/malh/malh_pdf_1.jpg";
import malhPdf2 from "@/assets/malh/malh_pdf_2.jpg";
import malhPdf3 from "@/assets/malh/malh_pdf_3.jpg";
import malhPdf4 from "@/assets/malh/malh_pdf_4.jpg";
import malhPdf5 from "@/assets/malh/malh_pdf_5.jpg";
import malhPdf6 from "@/assets/malh/malh_pdf_6.jpg";
import malhPdf7 from "@/assets/malh/malh_pdf_7.jpg";
import malhPdf8 from "@/assets/malh/malh_pdf_8.jpg";
import malhPdf9 from "@/assets/malh/malh_pdf_9.jpg";
import box1 from "@/assets/box/box_1.jpg";
import box2 from "@/assets/box/box_2.jpg";
import box3 from "@/assets/box/box_3.jpg";
import box4 from "@/assets/box/box_4.jpg";
import box5 from "@/assets/box/box_5.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "لقيمة | مالح وحادق - فرع القادسية" },
      {
        name: "description",
        content:
          "منيو لقيمة للمالح والحادق في فرع القادسية. اطلبوا لقيمات، سمبوسة، مشروبات وقهوة سعودية عبر واتساب.",
      },
      { property: "og:title", content: "لقيمة | مالح وحادق - فرع القادسية" },
      {
        property: "og:description",
        content:
          "منيو لقيمة للمالح والحادق في فرع القادسية. اطلبوا لقيمات، سمبوسة، مشروبات وقهوة سعودية عبر واتساب.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "لقيمة | مالح وحادق - فرع القادسية" },
      {
        name: "twitter:description",
        content:
          "منيو لقيمة للمالح والحادق في فرع القادسية. اطلبوا لقيمات، سمبوسة، مشروبات وقهوة سعودية عبر واتساب.",
      },
    ],
  }),
  component: Index,
});

type Category = "الكل" | "الحالي" | "المالح" | "البوكسات" | "المشروبات";

type Item = {
  name: string;
  desc?: string;
  qty?: string;
  price: number;
  image: string;
  category: Exclude<Category, "الكل">;
};

type CartLine = { name: string; price: number; qty: number };
type FulfillmentMethod = "delivery" | "pickup";
type PaymentMethod = "cash" | "network";

const LUQAIMAT_DESC = "كرات عجين ذهبية مقلية تقدم ساخنة بطعم لذيذ ومقرمش";
const LUQAIMAT_QTY = "اضافات: شيرة / نستله / عسل / دبس تمر / سمسم وحبة سوداء";
const JIBNIYA_DESC = "عجينة مقلية ممزوجة بالجبن تقدم ساخنة مع شيرة لذيذة تضيف لمسة حلا ناعمة";
const TAWA_DESC = "عجينة مقلية مقرمشة مصنوعة من طحين البر والحبة السوداء تقدم مع صوص دبس التمر الغني بالنكهة";
const MOKAABAT_DESC = "مكعبات جبن مقلية مقرمشة تقدم مع صوص دبس التمر اللذيذ ومكسرات البيكان";
const SEMEED_DESC = "مثلثات السميد محشوة بالجبن وتقدم ساخنة مع صوص شيرة لذيذ والفستق المطحون";
const HALA_LUQ_DESC = "رقائق العجين محشوة بالحليب المحموس وعجينة التمر والسميد وخلطة لقيمة الخاصة بصوص النستلة والقرفة والمكسرات";
const SINABON_DESC = "عجينة قطنية محشوة بالقرفة والسكر البني الرطب بالزبدة بصوص كريمة الشيو وتوفي الكراميل المملح ومكسرات البيكان";

const items: Item[] = [
  { name: "لقيمات صغير", qty: LUQAIMAT_QTY, desc: LUQAIMAT_DESC, price: 16, image: hali1, category: "الحالي" },
  { name: "لقيمات وسط", qty: LUQAIMAT_QTY, desc: LUQAIMAT_DESC, price: 23, image: hali2, category: "الحالي" },
  { name: "لقيمات كبير", qty: LUQAIMAT_QTY, desc: LUQAIMAT_DESC, price: 33, image: hali3, category: "الحالي" },
  { name: "جبنية صغير", desc: JIBNIYA_DESC, price: 16, image: hali5, category: "الحالي" },
  { name: "جبنية وسط", desc: JIBNIYA_DESC, price: 23, image: hali4, category: "الحالي" },
  { name: "جبنية كبير", desc: JIBNIYA_DESC, price: 33, image: hali6, category: "الحالي" },
  { name: "تاوه صغير", desc: TAWA_DESC, price: 16, image: hali9, category: "الحالي" },
  { name: "تاوه وسط", desc: TAWA_DESC, price: 23, image: hali7, category: "الحالي" },
  { name: "تاوه كبير", desc: TAWA_DESC, price: 33, image: hali8, category: "الحالي" },
  { name: "مكعبات الجبن صغير", desc: MOKAABAT_DESC, price: 17, image: hali10, category: "الحالي" },
  { name: "مكعبات الجبن وسط", desc: MOKAABAT_DESC, price: 33, image: hali11, category: "الحالي" },
  { name: "مثلثات السميد صغير", desc: SEMEED_DESC, price: 17, image: haliB1, category: "الحالي" },
  { name: "مثلثات السميد وسط", desc: SEMEED_DESC, price: 33, image: haliB2, category: "الحالي" },
  { name: "حلا لقيمة صغير", desc: HALA_LUQ_DESC, price: 23, image: haliB3, category: "الحالي" },
  { name: "حلا لقيمة وسط", desc: HALA_LUQ_DESC, price: 42, image: haliB4, category: "الحالي" },
  { name: "سينابون صغير", qty: "٤ حبات", desc: SINABON_DESC, price: 23, image: haliB6, category: "الحالي" },
  { name: "سينابون وسط", qty: "٨ حبات", desc: SINABON_DESC, price: 42, image: haliB5, category: "الحالي" },
  { name: "سينابون كبير", qty: "١٢ حبة", desc: SINABON_DESC, price: 75, image: haliB7, category: "الحالي" },
  { name: "خلية السينابون", price: 30, image: haliB8, category: "الحالي" },
  { name: "خلية لقيمة", price: 25, image: haliB9, category: "الحالي" },
  { name: "ورق عنب صغير", qty: "١٢ حبة", price: 27, image: malhPdf2, category: "المالح" },
  { name: "ورق عنب وسط", qty: "٢٥ حبة", price: 53, image: malhPdf2, category: "المالح" },
  { name: "ورق عنب كبير", qty: "٣٨ حبة", price: 75, image: malhPdf1, category: "المالح" },
  { name: "مسخن صغير", qty: "١٠ حبات", price: 27, image: malhPdf4, category: "المالح" },
  { name: "مسخن وسط", qty: "٢٠ حبة", price: 53, image: malhPdf5, category: "المالح" },
  { name: "مسخن دجاج كبير", qty: "٣٣ حبة", price: 75, image: malhPdf3, category: "المالح" },
  { name: "ملفوف صغير", qty: "١٢ حبة", price: 27, image: malhPdf8, category: "المالح" },
  { name: "ملفوف وسط", qty: "٢٥ حبة", price: 53, image: malhPdf7, category: "المالح" },
  { name: "ملفوف كبير", qty: "٣٧ حبة", price: 75, image: malhPdf6, category: "المالح" },
  { name: "سمبوسة دجاج صغير", qty: "٨ حبات", price: 16, image: malhPdf9, category: "المالح" },
  { name: "سمبوسة دجاج وسط", qty: "١٦ حبة", price: 32, image: malhPdf9, category: "المالح" },
  { name: "سمبوسة جبن صغير", qty: "٨ حبات", price: 12, image: malhPdf9, category: "المالح" },
  { name: "سمبوسة جبن وسط", qty: "١٦ حبة", price: 24, image: malhPdf9, category: "المالح" },
  { name: "سمبوسة مكس دجاج وجبن صغير", qty: "٨ حبات", price: 14, image: malhPdf9, category: "المالح" },
  { name: "سمبوسة مكس دجاج وجبن وسط", qty: "١٦ حبة", price: 28, image: malhPdf9, category: "المالح" },
  { name: "بوكس جمعات الحالي", qty: "٣ أصناف من اختيارك", desc: "لقيمات + جبنية + تاوه + مكعبات الجبن ٢٠ حبة + مثلثات السميد ١٥ حبة + حلا لقيمة ٢٢ حبة", price: 53, image: box1, category: "البوكسات" },
  { name: "بوكس جمعات المالح", qty: "٣ أصناف من اختيارك", desc: "ورق عنب + ملفوف + مسخن + سمبوسة", price: 74, image: box2, category: "البوكسات" },
  { name: "بوكس القرمشة", desc: "مثلثات السميد + حلا لقيمة (أصابع محشوة عجينة تمر وحليب محموس) + مكعبات الجبن", price: 50, image: box3, category: "البوكسات" },
  { name: "بوكس لقيمة مالح وحالي", desc: "مثلثات السميد، مكعبات الجبن، حلا لقيمة، ورق عنب، ملفوف، مسخن دجاج", price: 124, image: box4, category: "البوكسات" },
  { name: "بوكس سبيشل", qty: "صنف حالي وصنف مالح من اختيارك — حجم وسط", desc: "الحالي: سينابون ٨ حبات / مكعبات الجبن ٣٠ حبة / مثلثات السميد ٢٠ حبة / حلا لقيمة ٤٠ حبة. المالح: ورق عنب ٢٥ حبة / ملفوف ٢٥ حبة / مسخن ٢٠ حبة / سمبوسة ١٦ حبة", price: 74, image: box5, category: "البوكسات" },
  ...beverageItems,
];

const categories: Category[] = ["الكل", "الحالي", "المالح", "البوكسات", "المشروبات"];

const WHATSAPP = "966501206793";
const CONTACT_NUMBER = "+966 50 120 6793";
const TIKTOK = "https://www.tiktok.com/@luqyma.sa?_r=1&_t=ZS-97rpd89XOBs";
const INSTAGRAM = "https://www.instagram.com/luqyma.sa?igsh=MW9tZ2wybHhtN2Rhbw%3D%3D&utm_source=qr";

const BRAND_NAME = "لقيمة";
const BRAND_TAGLINE = "مالح وحادق";
const BRANCH_NAME = "فرع القادسية";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M19.6 6.8a5.7 5.7 0 0 1-3.4-1.1 5.7 5.7 0 0 1-2.2-3.7h-3.3v13.1a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.1a6 6 0 1 0 5.2 6V9.6a9 9 0 0 0 5.6 1.9V8.2c-.1 0 0 0 0-1.4Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Index() {
  const [active, setActive] = useState<Category>("الكل");
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [lastAdded, setLastAdded] = useState<string | null>(null);
  const [fulfillment, setFulfillment] = useState<FulfillmentMethod>("delivery");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const deliveryAddressRef = useRef<HTMLTextAreaElement>(null);

  const filtered = useMemo(
    () => {
      const term = query.trim().toLocaleLowerCase("ar");
      return items.filter((item) => {
        const matchesCategory = active === "الكل" || item.category === active;
        const matchesSearch = !term || `${item.name} ${item.desc ?? ""} ${item.qty ?? ""}`.toLocaleLowerCase("ar").includes(term);
        return matchesCategory && matchesSearch;
      });
    },
    [active, query],
  );

  const totalQty = cart.reduce((s, l) => s + l.qty, 0);
  const totalPrice = cart.reduce((s, l) => s + l.qty * l.price, 0);

  useEffect(() => {
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartOpen]);

  function addToCart(item: Item) {
    setCart((prev) => {
      const found = prev.find((l) => l.name === item.name);
      if (found) return prev.map((l) => (l.name === item.name ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { name: item.name, price: item.price, qty: 1 }];
    });
    setLastAdded(item.name);
    window.setTimeout(() => setLastAdded((current) => current === item.name ? null : current), 1800);
  }

  function changeQty(name: string, delta: number) {
    setCart((prev) =>
      prev
        .map((l) => (l.name === name ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0),
    );
  }

  function removeLine(name: string) {
    setCart((prev) => prev.filter((l) => l.name !== name));
  }

  function checkout() {
    if (cart.length === 0) return;
    if (fulfillment === "delivery" && !deliveryAddress.trim()) {
      setCheckoutError("اكتب عنوان التوصيل عشان نقدر نجهز طلبك.");
      deliveryAddressRef.current?.focus();
      return;
    }
    setCheckoutError("");
    const lines = cart.map((l) => `• ${l.name} × ${l.qty} = ${l.qty * l.price} ر.س`).join("\n");
    const fulfillmentDetails = fulfillment === "delivery"
      ? `طريقة الاستلام: توصيل\nالعنوان: ${deliveryAddress.trim()}`
      : `طريقة الاستلام: استلام من ${BRANCH_NAME}`;
    const paymentDetails = `\nطريقة الدفع عند الاستلام: ${paymentMethod === "cash" ? "كاش" : "شبكة"}`;
    const msg = `السلام عليكم، أرغب بطلب:\n${lines}\n\n${fulfillmentDetails}${paymentDetails}\nالإجمالي: ${totalPrice} ر.س`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
    setCartOpen(false);
  }

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#261911]/95 text-white shadow-lg backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="لقيمة - الرئيسية">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[#d9ae69]/50 bg-[#d9ae69]/10 font-display text-2xl text-[#e4bd7b]">ل</span>
            <span className="flex flex-col"><span className="font-display text-2xl leading-none text-[#f1d9ad]">{BRAND_NAME}</span><span className="mt-1 text-[10px] tracking-[.18em] text-white/55">{BRAND_TAGLINE}</span></span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex" aria-label="التنقل الرئيسي">
            <a href="#menu" className="transition hover:text-[#e4bd7b]">المنيو</a><a href="#story" className="transition hover:text-[#e4bd7b]">حكاية لقيمة</a><a href="#contact" className="transition hover:text-[#e4bd7b]">تواصل معنا</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="تيك توك" className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/90 transition hover:border-[#d9ae69] hover:bg-white/10 hover:text-[#e4bd7b]">
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="انستقرام" className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/90 transition hover:border-[#d9ae69] hover:bg-white/10 hover:text-[#e4bd7b]">
              <InstagramIcon className="h-4 w-4" />
            </a>
            <button
              onClick={() => setCartOpen(true)}
              aria-label="السلة"
              className="relative grid h-11 w-11 place-items-center rounded-full border border-[#d9ae69]/40 bg-[#d9ae69] text-[#261911] shadow-lg transition hover:scale-105"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalQty > 0 && (
                <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-accent-foreground">
                  {totalQty}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden bg-[#261911] text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(#e4bd7b 0.7px, transparent 0.7px)", backgroundSize: "22px 22px" }} />
        <div className="relative mx-auto grid max-w-7xl gap-5 px-4 pb-8 pt-5 md:grid-cols-[.9fr_1.1fr] md:items-center md:gap-8 md:px-8 md:py-20">
          <div className="order-2 md:order-1">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#e4bd7b]/35 bg-white/5 px-3 py-1.5 text-[10px] font-bold text-[#e4bd7b] md:px-4 md:py-2 md:text-xs"><Sparkles className="h-3.5 w-3.5"/> لقيمة · مالح وحادق · {BRANCH_NAME}</span>
            <h1 className="mt-3 font-display text-5xl leading-[1.05] text-[#f1d9ad] md:mt-6 md:text-8xl">{BRAND_NAME}<span className="mt-2 block text-xl font-normal text-white/80 md:mt-3 md:text-3xl">{BRAND_TAGLINE} بطابع يليق بجمعتكم</span></h1>
            <p className="mt-3 max-w-lg text-sm leading-7 text-white/65 md:mt-6 md:text-lg md:leading-8">من لقيماتنا الذهبية إلى الموالح المحضّرة بعناية؛ اختاروا أصنافكم المفضلة واستمتعوا بتفاصيل تصنع لحظات حلوة.</p>
            <div className="mt-4 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-3"><a href="#menu" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[#d9ae69] px-5 py-3 text-xs font-black text-[#261911] shadow-lg transition hover:-translate-y-0.5 md:px-7 md:py-3.5 md:text-sm">اكتشفوا المنيو <ArrowDown className="h-4 w-4"/></a><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center rounded-full border border-white/25 px-5 py-3 text-xs font-bold text-white transition hover:bg-white/10 md:px-6 md:py-3.5 md:text-sm">تواصلوا معنا</a></div>
            <div className="mt-4 hidden flex-wrap gap-x-6 gap-y-3 text-xs text-white/55 md:mt-10 md:flex"><span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-[#d9ae69]"/> مذاق طازج يُحضّر بمحبة</span></div>
          </div>
          <div className="relative order-1 md:order-2"><div className="absolute -inset-2 rounded-[1.5rem] border border-[#d9ae69]/35 md:-inset-6 md:rounded-[2rem]"/><img src={heroImg} alt="سفرة لقيمة تضم لقيمات وسمبوسة وقهوة سعودية" width={3072} height={1024} className="relative h-[205px] w-full rounded-[1.2rem] object-cover object-center shadow-2xl min-[420px]:h-[230px] md:aspect-[16/10] md:h-auto md:rounded-[1.5rem]"/><div className="absolute bottom-3 right-3 rounded-lg border border-white/20 bg-[#261911]/80 px-3 py-2 backdrop-blur md:bottom-4 md:right-4 md:rounded-xl md:px-4 md:py-3"><span className="block text-[9px] text-white/60 md:text-[10px]">نكهات من القلب</span><span className="font-display text-sm text-[#f1d9ad] md:text-lg">كل لقمة لها حكاية</span></div></div>
        </div>
      </section>

      {/* Categories */}
      <section id="menu" className="mx-auto max-w-7xl scroll-mt-28 px-4 pt-8 md:px-8 md:pt-16">
        <div className="mb-4 flex flex-col justify-between gap-2 md:mb-7 md:flex-row md:items-end"><div><p className="text-[10px] font-black tracking-[.2em] text-primary md:text-xs">اختاروا على مزاجكم</p><h2 className="mt-1 font-display text-3xl text-foreground md:mt-2 md:text-5xl">قائمة لقيمة</h2><p className="mt-1 text-xs text-muted-foreground md:mt-2 md:text-sm">كل ما تحبونه، محضّر بعناية ولحظاتكم في البال</p></div><span className="text-[10px] text-muted-foreground md:text-xs">{filtered.length} صنف متاح</span></div>
        <div className="menu-categories sticky top-[4.25rem] z-30 -mx-4 flex gap-2 overflow-x-auto border-y border-border/60 bg-background/95 px-4 py-3 backdrop-blur-xl md:static md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-0 md:pb-3">
          {categories.map((c) => {
            const isActive = c === active;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                aria-pressed={isActive}
                className={
                  "shrink-0 rounded-full border px-5 py-2.5 text-sm font-bold transition " +
                  (isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-card)]"
                    : "border-border bg-card text-foreground hover:border-primary/50")
                }
              >
                {c}
              </button>
            );
          })}
        </div>
        <label className="mt-4 flex min-h-12 items-center gap-3 rounded-2xl border border-border/80 bg-card px-4 shadow-[var(--shadow-card)] transition focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 md:mt-5 md:max-w-xl">
          <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث عن صنفك المفضل..."
            aria-label="ابحث في المنيو"
            className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          {query && <button type="button" onClick={() => setQuery("")} aria-label="مسح البحث" className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"><X className="h-4 w-4" /></button>}
        </label>
      </section>

      {/* Menu grid */}
      <section className="mx-auto max-w-7xl px-3 py-5 pb-32 sm:px-4 md:py-12 md:pb-28">
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-card/50 p-10 text-center">
            <Search className="mx-auto h-8 w-8 text-primary/60" />
            <p className="mt-3 font-display text-2xl text-primary">ما لقينا أصناف مطابقة</p>
            <p className="mt-2 text-sm text-muted-foreground">جرّبوا كلمة بحث مختلفة أو اختاروا قسمًا آخر.</p>
            <button onClick={() => { setQuery(""); setActive("الكل"); }} className="mt-5 min-h-11 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition hover:opacity-90">عرض كل الأصناف</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5 min-[420px]:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => {
              const inCart = cart.find((l) => l.name === item.name);
              return (
                <article key={item.name} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] sm:rounded-[1.4rem]">
                  <div className="relative aspect-square max-h-48 overflow-hidden min-[420px]:max-h-56 md:aspect-[4/3] md:max-h-none">
                    <img src={item.image} alt={item.name} loading="lazy" width={512} height={512} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><span className="absolute right-3 top-3 rounded-full border border-white/30 bg-[#261911]/75 px-3 py-1 text-[10px] font-bold text-white backdrop-blur">{item.category}</span>
                  </div>
                  <div className="flex min-h-[142px] flex-1 flex-col justify-between p-2.5 min-[420px]:min-h-[154px] min-[420px]:p-3.5 md:min-h-40 md:p-5">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 font-display text-base leading-snug text-foreground min-[420px]:text-lg md:text-xl">{item.name}</h3>
                      {item.qty && <p className="mt-1 line-clamp-1 text-[10px] font-bold text-primary min-[420px]:text-xs md:text-sm">{item.qty}</p>}
                      {item.desc && <p className="mt-1 line-clamp-2 text-[10px] leading-relaxed text-muted-foreground min-[420px]:text-[11px] md:text-xs">{item.desc}</p>}
                    </div>
                    <div className="mt-2 flex items-center justify-between gap-1.5 md:mt-3">
                      <span className="shrink-0 font-display text-xl text-primary min-[420px]:text-2xl">
                        {item.price}
                        <span className="mr-1 text-xs font-bold tracking-wider text-muted-foreground">ر.س</span>
                      </span>
                      {inCart ? (
                        <div className="flex items-center gap-1 rounded-full bg-primary/10 p-1">
                          <button onClick={() => changeQty(item.name, -1)} aria-label="نقص" className="grid h-9 w-9 place-items-center rounded-full bg-background text-primary transition hover:bg-primary hover:text-primary-foreground md:h-8 md:w-8">
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-6 text-center text-sm font-bold text-primary">{inCart.qty}</span>
                          <button onClick={() => changeQty(item.name, 1)} aria-label="زيادة" className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90 md:h-8 md:w-8">
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => addToCart(item)} className="min-h-10 rounded-full bg-primary/10 px-2.5 text-[10px] font-black text-primary transition hover:bg-primary hover:text-primary-foreground min-[420px]:px-3 min-[420px]:text-xs md:min-h-9 md:py-1.5">
                          {lastAdded === item.name ? <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" /> تمت</span> : "أضف للسلة"}
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Floating cart bar (mobile-friendly) */}
      {totalQty > 0 && !cartOpen && (
        <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 mx-auto max-w-md">
          <button
            onClick={() => setCartOpen(true)}
            className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl bg-[#261911] px-5 py-3 text-white shadow-[0_12px_35px_-10px_rgba(38,25,17,.55)] transition hover:opacity-95 md:rounded-full"
          >
            <span className="flex items-center gap-2 text-sm font-bold">
              <ShoppingCart className="h-4 w-4" />
              عرض السلة ({totalQty})
            </span>
            <span className="font-display text-lg">{totalPrice} ر.س</span>
          </button>
        </div>
      )}

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-stretch" role="dialog" aria-modal="true" aria-label="سلة الطلبات">
          <div className="absolute inset-0 bg-overlay/50" onClick={() => setCartOpen(false)} />
          <aside className="relative mx-auto flex h-[88dvh] w-full max-w-md flex-col rounded-t-[1.75rem] bg-background shadow-2xl md:mx-0 md:h-full md:rounded-none">
            <div className="flex shrink-0 items-center justify-between border-b border-border px-5 pb-4 pt-5">
              <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-border md:hidden" aria-hidden="true" />
              <h2 className="font-display text-2xl text-primary">سلة الطلبات</h2>
              <button onClick={() => setCartOpen(false)} aria-label="إغلاق" className="grid h-9 w-9 place-items-center rounded-full border border-border transition hover:border-primary hover:text-primary">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="grid h-full place-items-center text-center">
                  <div>
                    <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-3 font-display text-xl text-foreground">السلة فاضية</p>
                    <p className="mt-1 text-sm text-muted-foreground">أضف منتجاتك المفضلة من المنيو.</p>
                  </div>
                </div>
              ) : (
                <ul className="space-y-3">
                  {cart.map((l) => (
                    <li key={l.name} className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
                      <div className="flex-1">
                        <p className="font-bold text-foreground">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.price} ر.س / قطعة</p>
                      </div>
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 p-1">
                        <button onClick={() => changeQty(l.name, -1)} aria-label="نقص" className="grid h-10 w-10 place-items-center rounded-full bg-background text-primary transition hover:bg-primary hover:text-primary-foreground">
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-bold text-primary">{l.qty}</span>
                        <button onClick={() => changeQty(l.name, 1)} aria-label="زيادة" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground transition hover:opacity-90">
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="w-16 text-left font-display text-lg text-primary">{l.qty * l.price}</div>
                      <button onClick={() => removeLine(l.name)} aria-label="حذف" className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {cart.length > 0 && (
                <div className="mt-6 space-y-6 border-t border-border pt-5">
                  <fieldset>
                    <legend className="mb-3 text-sm font-black text-foreground">طريقة الاستلام</legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      <label className={`flex min-h-[76px] cursor-pointer items-center gap-3 rounded-2xl border p-3 transition ${fulfillment === "delivery" ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card hover:border-primary/40"}`}>
                        <input type="radio" name="fulfillment" value="delivery" checked={fulfillment === "delivery"} onChange={() => { setFulfillment("delivery"); setCheckoutError(""); }} className="sr-only" />
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${fulfillment === "delivery" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Truck className="h-5 w-5" /></span>
                        <span><span className="block text-sm font-bold text-foreground">توصيل</span><span className="mt-0.5 block text-[10px] text-muted-foreground">لحد بابك</span></span>
                      </label>
                      <label className={`flex min-h-[76px] cursor-pointer items-center gap-3 rounded-2xl border p-3 transition ${fulfillment === "pickup" ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-border bg-card hover:border-primary/40"}`}>
                        <input type="radio" name="fulfillment" value="pickup" checked={fulfillment === "pickup"} onChange={() => { setFulfillment("pickup"); setCheckoutError(""); }} className="sr-only" />
                        <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${fulfillment === "pickup" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Store className="h-5 w-5" /></span>
                        <span><span className="block text-sm font-bold text-foreground">استلام</span><span className="mt-0.5 block text-[10px] text-muted-foreground">{BRANCH_NAME}</span></span>
                      </label>
                    </div>
                  </fieldset>

                  {fulfillment === "delivery" && (
                    <div>
                      <label htmlFor="delivery-address" className="mb-2 block text-sm font-bold text-foreground">عنوان التوصيل</label>
                      <textarea ref={deliveryAddressRef} id="delivery-address" value={deliveryAddress} onChange={(event) => { setDeliveryAddress(event.target.value); if (event.target.value.trim()) setCheckoutError(""); }} placeholder="الحي، اسم الشارع، رقم المبنى أو علامة مميزة" rows={2} aria-invalid={Boolean(checkoutError)} className="min-h-20 w-full resize-y rounded-2xl border border-border bg-card px-4 py-3 text-sm leading-6 text-foreground outline-none transition placeholder:text-muted-foreground/80 focus:border-primary focus:ring-2 focus:ring-primary/15" />
                      <p className="mt-1.5 text-[11px] text-muted-foreground">سيتواصل الفرع لتأكيد تفاصيل ووقت التوصيل.</p>
                    </div>
                  )}

                  <fieldset>
                    <legend className="mb-3 text-sm font-black text-foreground">طريقة الدفع عند الاستلام</legend>
                    <div className="grid grid-cols-2 gap-2.5">
                      <label className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold transition ${paymentMethod === "cash" ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20" : "border-border bg-card text-foreground hover:border-primary/40"}`}>
                        <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="sr-only" />
                        <Banknote className="h-4 w-4" /> كاش
                      </label>
                      <label className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border px-3 text-sm font-bold transition ${paymentMethod === "network" ? "border-primary bg-primary/5 text-primary ring-1 ring-primary/20" : "border-border bg-card text-foreground hover:border-primary/40"}`}>
                        <input type="radio" name="payment" value="network" checked={paymentMethod === "network"} onChange={() => setPaymentMethod("network")} className="sr-only" />
                        <CreditCard className="h-4 w-4" /> شبكة
                      </label>
                    </div>
                  </fieldset>
                  {checkoutError && <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-xs font-bold text-destructive">{checkoutError}</p>}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="shrink-0 border-t border-border bg-card/50 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-muted-foreground">الإجمالي</span>
                  <span className="font-display text-2xl text-primary">
                    {totalPrice} <span className="text-xs font-bold text-muted-foreground">ر.س</span>
                  </span>
                </div>
                <button
                  onClick={checkout}
                  className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:opacity-90"
                >
                  إرسال الطلب عبر واتساب
                </button>
                <button
                  onClick={() => setCart([])}
                  className="mt-2 w-full rounded-full border border-border px-5 py-2 text-xs font-bold text-muted-foreground transition hover:border-destructive hover:text-destructive"
                >
                  إفراغ السلة
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Footer */}
      <section id="story" className="mx-auto my-12 max-w-7xl px-4 md:px-8"><div className="grid gap-6 rounded-[1.75rem] bg-[#efe2cc] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10"><div><p className="text-xs font-black tracking-[.2em] text-primary">من قلب اللمة</p><h2 className="mt-2 font-display text-3xl text-[#382519]">لقيمة… حكاية طعم تُشارك</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#705b49]">نؤمن أن أجمل اللحظات تبدأ من سفرة تجمع الأحبة. لذلك نختار مكوناتنا بعناية ونقدّم لكم المالح والحالي بنكهات تستحق أن تتكرر.</p></div><a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="rounded-full bg-[#382519] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-primary">اطلبوا للمناسبة</a></div></section>
      <footer id="contact" className="mt-12 border-t border-[#513c2d] bg-[#261911] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-10 text-center">
          <div className="font-display text-3xl text-[#e4bd7b]">{BRAND_NAME}</div>
          <p className="text-xs tracking-normal text-white/55">{BRAND_TAGLINE} · {BRANCH_NAME}</p>
          <div className="mt-2 flex items-center gap-3">
            <a href={TIKTOK} target="_blank" rel="noreferrer" aria-label="تيك توك" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-[#d9ae69] hover:text-[#d9ae69]">
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer" aria-label="انستقرام" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white transition hover:border-[#d9ae69] hover:text-[#d9ae69]">
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
          <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noreferrer" className="mt-1 text-sm font-bold text-[#e4bd7b] hover:underline">
            للطلب: {CONTACT_NUMBER}
          </a>
        </div>
      </footer>
    </div>
  );
}
