export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-white/20 text-white/60 py-8">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TIDA WORKS
        </p>
        <div className="flex gap-6 text-xs">
          <a href="#benefits" className="hover:text-white/80 transition-colors">選ばれる理由</a>
          <a href="#services" className="hover:text-white/80 transition-colors">料金</a>
          <a href="#flow" className="hover:text-white/80 transition-colors">流れ</a>
          <a href="#faq" className="hover:text-white/80 transition-colors">FAQ</a>
          <a href="#about" className="hover:text-white/80 transition-colors">会社概要</a>
          <a href="#contact" className="hover:text-white/80 transition-colors">お問い合わせ</a>
        </div>
      </div>
    </footer>
  );
}
