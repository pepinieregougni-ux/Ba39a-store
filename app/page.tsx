'use client';

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { supabase } from "./supabase"; // ربط قاعدة البيانات

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [isOrderSent, setIsOrderSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 📦 جلب المنتجات أوتوماتيكياً من السوبابيز
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: true });
      
      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProducts();
  }, []);

  const handleOpenOrderForm = (product: any) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsOrderSent(false);
  };

  // 🛍️ إرسال الطلب وحفظه + صيفط ميساج للواتساب
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const totalPrice = selectedProduct.price * quantity;

    // 1. حفظ الطلب في السوبابيز أولاً
    const { error } = await supabase
      .from('orders')
      .insert([
        {
          product_name: selectedProduct.name,
          quantity: quantity,
          total_price: totalPrice,
          full_name: fullName,
          phone: phone,
          city: city
        }
      ]);

    setIsSubmitting(false);

    if (error) {
      alert("وقع خطأ أثناء إرسال الطلب، يرجى المحاولة مجدداً.");
      console.error(error);
    } else {
      setIsOrderSent(true);

      // 2. إعداد رسالة الواتساب أوتوماتيكياً
      // ⚠️ المرجو تبديل هاد النمرة بنمرتك الحقيقية (مثال: 212612345678)
      const myWhatsAppNumber = "212630492534";
      
      const message = `🌟 *طلب جديد من المتجر* 🌟%0A%0A` +
                      `📦 *المنتج:* ${selectedProduct.name}%0A` +
                      `🔢 *الكمية:* ${quantity}%0A` +
                      `💰 *المجموع الإجمالي:* ${totalPrice} DH%0A%0A` +
                      `👤 *اسم الزبون:* ${fullName}%0A` +
                      `📞 *رقم الهاتف:* ${phone}%0A` +
                      `📍 *المدينة:* ${city}%0A%0A` +
                      `✍️ _المرجو تأكيد الطلب لشحن السلعة في أقرب وقت._`;

      const whatsappUrl = `https://wa.me/${myWhatsAppNumber}?text=${message}`;

      // 3. فتح الواتساب للزبون مورا 1.5 ثانية ملي يشوف ميساج النجاح
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        setSelectedProduct(null);
        setFullName("");
        setPhone("");
        setCity("");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-right text-white selection:bg-amber-400 selection:text-black" dir="rtl">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center my-16 space-y-4">
          <h1 className="text-4xl font-black tracking-tight sm:text-6xl bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            مرحباً بكم في <span className="bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]">BA39A STORE</span>
          </h1>
          <p className="mt-4 text-base text-zinc-400 max-w-xl mx-auto font-light">
            اكتشف التشكيلة الحصرية من المنتجات الفاخرة المصممة خصيصاً لأصحاب الذوق الرفيع.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center text-amber-400 py-20 font-bold tracking-wide animate-pulse">
            جاري تحميل المنتجات الفاخرة...
          </div>
        ) : (
          /* كروت المنتجات الحية */
          <div className="mt-20 grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="group relative bg-zinc-900/40 rounded-3xl border border-zinc-800/80 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:border-amber-400/50 hover:shadow-[0_0_30px_rgba(251,191,36,0.1)] backdrop-blur-sm"
              >
                <div className="w-full h-72 bg-zinc-950 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10 opacity-60" />
                  <img
                    src={product.image || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=500"}
                    alt={product.name}
                    className="w-full h-full object-center object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-6 relative z-20">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-xl font-black text-amber-400 drop-shadow-[0_0_66px_rgba(251,191,36,0.3)]">
                      {product.price} DH
                    </p>
                  </div>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="p-6 pt-0 relative z-20">
                  <button 
                    onClick={() => handleOpenOrderForm(product)}
                    className="w-full bg-white text-black py-3.5 px-4 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-amber-400 hover:to-yellow-300 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                  >
                    🛒 <span>شراء الآن</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* نافذة استمارة الطلب الزجاجية */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl max-w-md w-full p-6 relative overflow-hidden shadow-2xl">
            
            {isOrderSent ? (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl text-amber-400">🎉</div>
                <h3 className="text-2xl font-black text-white">تم إرسال طلبك بنجاح!</h3>
                <p className="text-sm text-zinc-400">جاري توجيهك لتأكيد الطلب عبر الواتساب...</p>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center mb-6 border-b border-zinc-800 pb-4">
                  <h3 className="text-xl font-black bg-gradient-to-r from-amber-400 to-yellow-200 bg-clip-text text-transparent">
                    تأكيد طلب: {selectedProduct.name}
                  </h3>
                  <button 
                    onClick={() => setSelectedProduct(null)}
                    className="text-zinc-500 hover:text-white transition-colors text-xl font-bold"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div className="bg-zinc-950/60 p-4 rounded-2xl border border-zinc-800/50 flex justify-between items-center">
                    <div>
                      <label className="block text-xs text-zinc-400 mb-1">الكمية</label>
                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
                          className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 text-lg font-bold"
                        >
                          -
                        </button>
                        <span className="text-lg font-bold w-4 text-center">{quantity}</span>
                        <button 
                          type="button"
                          onClick={() => setQuantity(q => q + 1)}
                          className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 text-lg font-bold"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-zinc-400 mb-1">المجموع الإجمالي</span>
                      <span className="text-xl font-black text-amber-400">
                        {selectedProduct.price * quantity} DH
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">الاسم الكامل</label>
                    <input 
                      type="text" 
                      required
                      placeholder="محمد أمين..."
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm text-right"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">رقم الهاتف</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="0612345678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm text-left tracking-wider"
                      dir="ltr"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 mb-1.5 font-medium">المدينة</label>
                    <input 
                      type="text" 
                      required
                      placeholder="الدار البيضاء، مراكش..."
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-amber-400 transition-colors text-sm text-right"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-gradient-to-r from-amber-400 to-yellow-300 text-black py-4 px-4 rounded-xl font-black text-base transition-all duration-300 hover:scale-[1.02] shadow-[0_0_20px_rgba(251,191,36,0.3)] disabled:opacity-50"
                  >
                    {isSubmitting ? "جاري إرسال طلبك..." : "اضغط هنا لتأكيد الطلب 🛍️"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}