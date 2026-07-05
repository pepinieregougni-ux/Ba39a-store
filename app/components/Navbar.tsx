import React from 'react';

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 bg-black/80 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* اللوغو بالبريق الذهبي والفضي */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-amber-400 via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
              BA39A<span className="text-white font-light">.STORE</span>
            </span>
          </div>

          {/* روابط التنقل وسلة التسوق */}
          <div className="flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors duration-300">
              الرئيسية
            </a>
            <a href="#" className="text-sm font-medium text-zinc-400 hover:text-amber-400 transition-colors duration-300">
              المنتجات
            </a>
            
            {/* زر السلة المتطور */}
            <button className="relative p-2 text-zinc-300 hover:text-amber-400 hover:scale-110 transition-all duration-300 bg-zinc-900/50 rounded-full border border-zinc-800">
              🛒
              <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-[10px] font-bold text-black bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]">
                0
              </span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}