export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/alpaca-logo.png" alt="ALPACA ロゴ" className="h-6 w-auto" />
            <span className="text-gray-800 font-bold text-sm">ALPACA</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <a href="#services" className="hover:text-gray-600 transition-colors">サービス</a>
            <a href="#advantage" className="hover:text-gray-600 transition-colors">選ばれる理由</a>
            <a href="#flow" className="hover:text-gray-600 transition-colors">ご利用の流れ</a>
            <a href="#faq" className="hover:text-gray-600 transition-colors">FAQ</a>
            <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-600 transition-colors">お問い合わせ</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/alpaca_amami" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-gray-500 transition-colors" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <p className="text-gray-300 text-xs">
              &copy; {new Date().getFullYear()} ALPACA
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
