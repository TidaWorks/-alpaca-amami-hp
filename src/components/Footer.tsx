export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 text-white/50 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-lg tracking-wider">
            <span className="text-[#F5A623]">TIDA</span>{" "}
            <span className="text-white/70">WORKS</span>
          </span>
        </div>
        <div className="flex flex-wrap justify-center gap-6 text-xs">
          <a href="#benefits" className="hover:text-[#F5A623] transition-colors">選ばれる理由</a>
          <a href="#services" className="hover:text-[#F5A623] transition-colors">料金</a>
          <a href="#flow" className="hover:text-[#F5A623] transition-colors">流れ</a>
          <a href="#faq" className="hover:text-[#F5A623] transition-colors">FAQ</a>
          <a href="#about" className="hover:text-[#F5A623] transition-colors">会社概要</a>
          <a href="#contact" className="hover:text-[#F5A623] transition-colors">お問い合わせ</a>
        </div>
        <p className="text-xs text-white/30">
          &copy; {new Date().getFullYear()} TIDA WORKS
        </p>
      </div>
    </footer>
  );
}
