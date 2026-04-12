export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/images/alpaca-logo.svg" alt="ALPACA" className="h-6 w-auto" />
            <span className="text-gray-800 font-bold text-sm">ALPACA</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            <a href="#services" className="hover:text-gray-600 transition-colors">サービス</a>
            <a href="#advantage" className="hover:text-gray-600 transition-colors">選ばれる理由</a>
            <a href="#flow" className="hover:text-gray-600 transition-colors">ご利用の流れ</a>
            <a href="#faq" className="hover:text-gray-600 transition-colors">FAQ</a>
            <a href="#about" className="hover:text-gray-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-gray-600 transition-colors">お問い合わせ</a>
          </nav>
          <p className="text-gray-300 text-xs">
            &copy; {new Date().getFullYear()} ALPACA
          </p>
        </div>
      </div>
    </footer>
  );
}
