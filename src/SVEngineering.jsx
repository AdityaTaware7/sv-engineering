import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "About", "Products", "Quality", "Infrastructure", "Clients", "Contact"];

const PRODUCTS = [
  { icon: "⚗️", title: "Distillation Columns", desc: "CU-type, rectification & analyzer columns in SS304, SS316, Copper up to 27m tall." },
  { icon: "🔥", title: "Heat Exchangers", desc: "Shell & tube heat exchangers in copper, SS304 and various custom sizes." },
  { icon: "🧪", title: "Pressure Vessels", desc: "All types of pressure vessels per ASME SEC-IX in SS, Copper, Brass & Mild Steel." },
  { icon: "💧", title: "Evaporators", desc: "Falling film & forced circulation evaporators for sugar, dairy & pharma industries." },
  { icon: "🏭", title: "Process Equipment", desc: "Vapor liquid separators, molecular sieves, limpet coil tanks & bag filters." },
  { icon: "🌀", title: "Dryers", desc: "Germ dryers (1200 kg/hr), rotary dryers (2000 kg/hr) & paddle dryers (500 kg/hr)." },
  { icon: "🍬", title: "Sugar Equipment", desc: "Complete sugar boiling house equipment and allied process machinery." },
  { icon: "🔧", title: "Site Work", desc: "Complete erection & commissioning of distillery, dairy & process plant projects." },
];

const INDUSTRIES = ["Sugar", "Distillery", "Pharmaceuticals", "Petro-Chemicals", "Dairy", "Food Processing"];

const CLIENTS = [
  { name: "Busia Sugar & Allied Ltd.", location: "Uganda" },
  { name: "Desmet Bellestra India Pvt. Ltd.", location: "Bangalore" },
  { name: "Praj Industries Ltd.", location: "Pune" },
  { name: "Rathi Vessels & System Pvt. Ltd.", location: "Pune" },
  { name: "Shri Saikrupa Sugar & Allied Ltd.", location: "Nagar" },
  { name: "Mojj Engineering Systems Pvt. Ltd.", location: "Pune" },
  { name: "Vigel Manufacturing Technologies", location: "Pune (Origin: Italy)" },
  { name: "Pyrocrats Systems", location: "Mumbai" },
  { name: "Racold Thermo Limited", location: "Pune" },
  { name: "Vapco Engineers Pvt. Ltd.", location: "India" },
  { name: "Thermotech Engineering", location: "India" },
  { name: "Clean Earth Energy Solutions", location: "India" },
];

const MACHINES = [
  { label: "CNC Laser Cutter", spec: "2.5m × 6.5m | 8mm SS capacity" },
  { label: "CNC Plasma Cutter", spec: "3m × 12m | 50mm SS / 250mm MS" },
  { label: "Bending Machine", spec: "2.5m width | 200 Tonne capacity" },
  { label: "Shearing Machine", spec: "2500mm span | 8mm capacity" },
  { label: "EOT Crane", spec: "10 Metric Ton capacity" },
  { label: "Hydra Crane", spec: "12 Ton capacity" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function SVEngineering() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#0a0c10", color: "#e8e0d4", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --gold: #c9a84c;
          --gold-light: #e8c96f;
          --rust: #b54a1e;
          --steel: #7a8fa6;
          --dark: #0a0c10;
          --dark2: #111520;
          --dark3: #161c28;
          --cream: #e8e0d4;
          --muted: #8a8a9a;
        }
        html { scroll-behavior: smooth; }
        ::selection { background: var(--gold); color: #000; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: var(--dark); }
        ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

        .nav-link {
          cursor: pointer;
          font-size: 0.78rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          padding: 6px 0;
          position: relative;
          color: #b0b8c8;
          transition: color 0.3s;
          font-family: 'Trebuchet MS', sans-serif;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--gold);
          transition: width 0.3s ease;
        }
        .nav-link:hover, .nav-link.active { color: var(--gold-light); }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }

        .product-card {
          background: linear-gradient(135deg, #141824 0%, #1a2030 100%);
          border: 1px solid #2a3040;
          border-radius: 4px;
          padding: 28px 24px;
          transition: border-color 0.3s, transform 0.3s, box-shadow 0.3s;
          position: relative;
          overflow: hidden;
        }
        .product-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 3px; height: 0;
          background: var(--gold);
          transition: height 0.4s ease;
        }
        .product-card:hover { border-color: #3a4555; transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
        .product-card:hover::before { height: 100%; }

        .client-row {
          display: flex; align-items: center; gap: 16px;
          padding: 14px 20px;
          border-bottom: 1px solid #1e2535;
          transition: background 0.25s;
        }
        .client-row:hover { background: #131927; }
        .client-row:last-child { border-bottom: none; }

        .stat-box {
          text-align: center;
          padding: 28px 20px;
          border: 1px solid #2a3040;
          background: #0f1320;
        }

        .machine-item {
          display: flex; justify-content: space-between; align-items: center;
          padding: 14px 20px;
          border-left: 2px solid var(--gold);
          background: #0f1520;
          margin-bottom: 10px;
          transition: background 0.2s;
        }
        .machine-item:hover { background: #141e2e; }

        .industry-pill {
          display: inline-block;
          padding: 6px 16px;
          border: 1px solid var(--gold);
          border-radius: 2px;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gold-light);
          margin: 4px;
          font-family: 'Trebuchet MS', sans-serif;
          transition: background 0.2s;
        }
        .industry-pill:hover { background: rgba(201,168,76,0.12); }

        .section-label {
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }

        .divider { height: 1px; background: linear-gradient(to right, transparent, #3a4555, transparent); margin: 4px 0; }

        .contact-card {
          background: #0f1520;
          border: 1px solid #2a3040;
          padding: 24px 28px;
          border-radius: 2px;
          transition: border-color 0.3s;
        }
        .contact-card:hover { border-color: var(--gold); }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, var(--gold) 0%, var(--gold-light) 40%, var(--cream) 50%, var(--gold-light) 60%, var(--gold) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 0.5; }
          100% { transform: scale(1.3); opacity: 0; }
        }

        .grid-pattern {
          background-image: 
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .btn-primary {
          display: inline-block;
          padding: 12px 32px;
          background: var(--gold);
          color: #000;
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          font-weight: 700;
          transition: background 0.25s, transform 0.2s;
        }
        .btn-primary:hover { background: var(--gold-light); transform: translateY(-2px); }

        .btn-outline {
          display: inline-block;
          padding: 12px 32px;
          background: transparent;
          color: var(--gold);
          font-family: 'Trebuchet MS', sans-serif;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          border: 1px solid var(--gold);
          cursor: pointer;
          transition: background 0.25s, transform 0.2s;
        }
        .btn-outline:hover { background: rgba(201,168,76,0.1); transform: translateY(-2px); }

        @media (max-width: 768px) {
          .mobile-menu { display: flex !important; }
          .desktop-nav { display: none !important; }
          .hero-title { font-size: 2.8rem !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .three-col { grid-template-columns: 1fr 1fr !important; }
          .four-col { grid-template-columns: 1fr 1fr !important; }
          .stat-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .three-col { grid-template-columns: 1fr !important; }
          .four-col { grid-template-columns: 1fr !important; }
          .stat-row { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 2.2rem !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: scrolled ? "rgba(10,12,16,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #2a3040" : "none",
        transition: "all 0.4s ease",
        padding: "0 32px",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("Home")}>
            <div style={{
              width: 42, height: 42,
              background: "var(--gold)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "1.1rem", color: "#000",
              fontFamily: "'Trebuchet MS', sans-serif",
              clipPath: "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)"
            }}>SV</div>
            <div>
              <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, letterSpacing: "0.12em", fontSize: "0.95rem", color: "var(--cream)" }}>S V ENGINEERING</div>
              <div style={{ fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif" }}>Est. 2009 · Pune, India</div>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="desktop-nav" style={{ display: "flex", gap: 32 }}>
            {NAV_LINKS.map(link => (
              <span key={link} className={`nav-link ${activeNav === link ? "active" : ""}`} onClick={() => scrollTo(link)}>{link}</span>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu"
            style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ width: 24, height: 2, background: "var(--gold)", display: "block", transition: "all 0.3s",
                transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "scaleX(0)") : "none"
              }}/>
            ))}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: "rgba(10,12,16,0.98)", borderTop: "1px solid #2a3040", padding: "16px 32px 24px" }}>
            {NAV_LINKS.map(link => (
              <div key={link} className="nav-link" style={{ padding: "12px 0", fontSize: "0.85rem", borderBottom: "1px solid #1e2535" }} onClick={() => scrollTo(link)}>{link}</div>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="grid-pattern" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", paddingTop: 72 }}>
        {/* BG decorative circles */}
        <div style={{ position: "absolute", top: "20%", right: "-10%", width: 500, height: 500, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.08)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", top: "25%", right: "-7%", width: 380, height: 380, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.06)", pointerEvents: "none" }}/>
        <div style={{ position: "absolute", bottom: "10%", left: "-8%", width: 320, height: 320, borderRadius: "50%", border: "1px solid rgba(201,168,76,0.05)", pointerEvents: "none" }}/>
        {/* Radial glow */}
        <div style={{ position: "absolute", top: "30%", right: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)", pointerEvents: "none" }}/>

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px", width: "100%" }}>
          <div style={{ maxWidth: 760 }}>
            <div className="section-label" style={{ marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ width: 40, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              Since 2009 · Pune, Maharashtra
            </div>
            <h1 className="hero-title" style={{ fontSize: "4rem", lineHeight: 1.08, fontWeight: 400, marginBottom: 28, letterSpacing: "-0.01em" }}>
              <span style={{ display: "block", color: "#6a7a8e", fontSize: "0.5em", fontFamily: "'Trebuchet MS', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Precision Fabrication for</span>
              <span className="shimmer-text">Process Industry</span><br/>
              <span style={{ color: "var(--cream)" }}>Equipment</span>
            </h1>
            <p style={{ fontSize: "1.05rem", lineHeight: 1.8, color: "#8a94a8", maxWidth: 580, marginBottom: 40 }}>
              Specialists in Stainless Steel & Mild Steel fabrication — designing and manufacturing pressure vessels, distillation columns, heat exchangers, and complete process plant equipment for global industries.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => scrollTo("Products")}>Our Products</button>
              <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get in Touch</button>
            </div>

            {/* Industry tags */}
            <div style={{ marginTop: 48 }}>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif", marginBottom: 12 }}>Industries Served</div>
              {INDUSTRIES.map(i => <span key={i} className="industry-pill">{i}</span>)}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #1e2535", background: "rgba(15,18,28,0.9)", backdropFilter: "blur(8px)" }}>
          <div className="stat-row" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", padding: "0 32px" }}>
            {[
              { n: "7,500", u: "Sq. Ft.", label: "Facility Area" },
              { n: "15+", u: "Years", label: "Experience" },
              { n: "12+", u: "Clients", label: "Across Industries" },
              { n: "ASME", u: "SEC-IX", label: "Certified Standard" },
            ].map((s, i) => (
              <div key={i} style={{ padding: "20px 24px", borderRight: i < 3 ? "1px solid #1e2535" : "none", display: "flex", gap: 16, alignItems: "center" }}>
                <div>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.5rem", fontWeight: 700, color: "var(--gold-light)", lineHeight: 1 }}>{s.n} <span style={{ fontSize: "0.7rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{s.u}</span></div>
                  <div style={{ fontSize: "0.68rem", letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif", marginTop: 4 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 32px", background: "var(--dark2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <FadeIn>
              <div className="section-label">Who We Are</div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, lineHeight: 1.2, marginBottom: 28, color: "var(--cream)" }}>
                Built on Engineering<br/><span style={{ color: "var(--gold)" }}>Excellence</span>
              </h2>
              <p style={{ color: "#8a94a8", lineHeight: 1.9, marginBottom: 20 }}>
                M/s S V Engineering is a Pune-based fabrication unit with deep expertise in Stainless Steel & Mild Steel process equipment manufacturing. Founded in 2009 as a partnership firm and restructured as a proprietor firm in 2019, we have grown into a trusted name across process industries.
              </p>
              <p style={{ color: "#8a94a8", lineHeight: 1.9, marginBottom: 32 }}>
                Our 7,500 sq. ft. fully covered facility at Kuruli, Chakan-Alandi Road houses state-of-the-art CNC machines, welding equipment, and material handling systems — all operated by TUV NORD-qualified welders and experienced engineers.
              </p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["SS304", "SS316", "Copper", "Brass", "Mild Steel"].map(m => (
                  <span key={m} style={{ padding: "5px 14px", border: "1px solid #2a3040", color: "var(--steel)", fontSize: "0.75rem", letterSpacing: "0.08em", fontFamily: "'Trebuchet MS', sans-serif" }}>{m}</span>
                ))}
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div style={{ position: "relative" }}>
                {/* Decorative box */}
                <div style={{ position: "absolute", top: -16, right: -16, bottom: 16, left: 16, border: "1px solid #2a3040", borderRadius: 2, zIndex: 0 }}/>
                <div style={{ position: "relative", zIndex: 1, background: "var(--dark3)", padding: 40 }}>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 28 }}>Company At a Glance</div>
                  <div className="divider" style={{ marginBottom: 24 }}/>
                  {[
                    ["Registered Office", "202 Nandadeep, Chinchwad, Pune 411033"],
                    ["Works", "Plot 33, Chakan-Alandi Road, Kuruli, Khed, Pune 410501"],
                    ["Established", "2009 (Partnership) · 2019 (Proprietor)"],
                    ["GST No.", "27AFWPT5382B1ZV"],
                    ["Design Software", "SolidWorks & CATIA V5"],
                    ["Code Compliance", "ASME SEC-IX"],
                    ["Welders Certified", "TUV NORD Qualified"],
                    ["NDT Methods", "DPT, Radiography, Ultrasonic"],
                    ["Email", "svengineering19@gmail.com"],
                    ["Mobile", "+91 9922437860"],
                  ].map(([k, v]) => (
                    <div key={k} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, marginBottom: 14, fontSize: "0.82rem" }}>
                      <span style={{ color: "var(--muted)", fontFamily: "'Trebuchet MS', sans-serif" }}>{k}</span>
                      <span style={{ color: "var(--cream)", lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "100px 32px", background: "var(--dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
                What We Manufacture
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              </div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--cream)" }}>Products & <span style={{ color: "var(--gold)" }}>Services</span></h2>
              <p style={{ color: "var(--muted)", marginTop: 16, maxWidth: 560, margin: "16px auto 0", lineHeight: 1.8 }}>
                Engineered process equipment built to exacting specifications for demanding industrial environments worldwide.
              </p>
            </div>
          </FadeIn>
          <div className="four-col" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 0.07}>
                <div className="product-card">
                  <div style={{ fontSize: "1.8rem", marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontSize: "0.95rem", fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--cream)", marginBottom: 10, letterSpacing: "0.03em" }}>{p.title}</h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section id="quality" style={{ padding: "100px 32px", background: "var(--dark3)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 600, height: 600, background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>Quality Assurance
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              </div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--cream)" }}>Our Quality <span style={{ color: "var(--gold)" }}>Commitment</span></h2>
            </div>
          </FadeIn>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }}>
            <FadeIn>
              <p style={{ color: "#8a94a8", lineHeight: 1.9, marginBottom: 32 }}>
                At SV Engineering, our quality management system drives every aspect of production. Using the SQPDCME methodology, we ensure total customer satisfaction through disciplined process control and continuous improvement.
              </p>
              <div style={{ borderLeft: "3px solid var(--gold)", paddingLeft: 24, marginBottom: 32 }}>
                <p style={{ color: "var(--cream)", fontStyle: "italic", lineHeight: 1.8, fontSize: "0.95rem" }}>
                  "Our objective is to be among the largest quality suppliers for Distillery, Pharmaceutical, Petro-chemical, Dairy & other process industries worldwide."
                </p>
              </div>
              <div>
                {[
                  "Continual improvement in all areas of operations",
                  "ISO 9001-2008 standard compliance",
                  "SQDCM methodology for process discipline",
                  "Human resource development through training",
                  "Adaptability to global market requirements",
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 14 }}>
                    <span style={{ color: "var(--gold)", marginTop: 2, flexShrink: 0 }}>◆</span>
                    <span style={{ color: "var(--muted)", fontSize: "0.88rem", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ display: "grid", gap: 16 }}>
                {[
                  { icon: "🔬", title: "NDT Testing", desc: "Dye Penetrate, Radiography & Ultrasonic testing on all weld joints per QAP." },
                  { icon: "🏛️", title: "NABL Approved Labs", desc: "All raw materials — plates and pipes — are tested at NABL-approved laboratories." },
                  { icon: "📋", title: "TUV NORD Welders", desc: "Certified welders with complete WPS, PQR, and WPQ qualification records." },
                  { icon: "⚙️", title: "Calibrated Equipment", desc: "All instruments and welding machines are periodically calibrated for accuracy." },
                  { icon: "🤝", title: "Third-Party Inspection", desc: "Full capability to work with third-party inspection agencies." },
                ].map((q, i) => (
                  <div key={i} style={{ display: "flex", gap: 16, padding: "16px 20px", background: "rgba(15,18,28,0.8)", border: "1px solid #1e2535" }}>
                    <div style={{ fontSize: "1.4rem", flexShrink: 0 }}>{q.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: "0.85rem", marginBottom: 4 }}>{q.title}</div>
                      <div style={{ color: "var(--muted)", fontSize: "0.78rem", lineHeight: 1.6 }}>{q.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INFRASTRUCTURE */}
      <section id="infrastructure" style={{ padding: "100px 32px", background: "var(--dark2)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
                Facility & Machines
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              </div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--cream)" }}>World-class <span style={{ color: "var(--gold)" }}>Infrastructure</span></h2>
            </div>
          </FadeIn>

          {/* Stats */}
          <div className="stat-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, marginBottom: 56, background: "#1e2535" }}>
            {[
              { n: "7,500 sq.ft", label: "Covered Workshop" },
              { n: "1,000 sq.ft", label: "Office Space" },
              { n: "75 HP", label: "Power Supply" },
              { n: "10 MT", label: "EOT Crane Capacity" },
            ].map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="stat-box">
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "1.4rem", fontWeight: 700, color: "var(--gold-light)", marginBottom: 8 }}>{s.n}</div>
                  <div style={{ fontSize: "0.7rem", letterSpacing: "0.15em", color: "var(--muted)", textTransform: "uppercase", fontFamily: "'Trebuchet MS', sans-serif" }}>{s.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <FadeIn>
              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>Machines & Equipment</div>
                {MACHINES.map((m, i) => (
                  <div key={i} className="machine-item">
                    <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, color: "var(--cream)", fontSize: "0.88rem" }}>{m.label}</span>
                    <span style={{ color: "var(--gold)", fontSize: "0.78rem", fontFamily: "'Trebuchet MS', sans-serif" }}>{m.spec}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <div className="section-label" style={{ marginBottom: 20 }}>Design Capabilities</div>
                <div style={{ background: "#0f1520", border: "1px solid #2a3040", padding: 32 }}>
                  <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.9, marginBottom: 24 }}>
                    SV Engineering utilizes advanced CAD software for precision design and customer-specific product development, ensuring accurate specifications before fabrication begins.
                  </div>
                  <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                    {["SolidWorks", "CATIA V5"].map(sw => (
                      <div key={sw} style={{ padding: "10px 20px", border: "1px solid var(--gold)", display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: "var(--gold)", fontSize: "1rem" }}>⚙</span>
                        <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: "0.85rem" }}>{sw}</span>
                      </div>
                    ))}
                  </div>
                  <div className="divider" style={{ margin: "28px 0" }}/>
                  <div className="section-label" style={{ marginBottom: 16 }}>Banking Partners</div>
                  {["Indian Overseas Bank", "Saraswat Co-op Bank"].map((b, i) => (
                    <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 10 }}>
                      <span style={{ color: "var(--gold)", fontSize: "0.7rem" }}>▶</span>
                      <span style={{ color: "var(--muted)", fontSize: "0.82rem" }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CLIENTS */}
      <section id="clients" style={{ padding: "100px 32px", background: "var(--dark)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
                Trusted By Leaders
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              </div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--cream)" }}>Our <span style={{ color: "var(--gold)" }}>Clients</span></h2>
              <p style={{ color: "var(--muted)", marginTop: 16, lineHeight: 1.8, maxWidth: 480, margin: "16px auto 0" }}>
                Serving leading companies across India and internationally — from local process engineers to multinational corporations.
              </p>
            </div>
          </FadeIn>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {CLIENTS.map((c, i) => (
              <FadeIn key={i} delay={(i % 6) * 0.06}>
                <div className="client-row">
                  <span style={{ color: "var(--gold)", fontSize: "0.8rem", flexShrink: 0 }}>◆</span>
                  <div>
                    <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 600, color: "var(--cream)", fontSize: "0.88rem" }}>{c.name}</div>
                    <div style={{ color: "var(--muted)", fontSize: "0.73rem", marginTop: 2 }}>{c.location}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section style={{ padding: "80px 32px", background: "linear-gradient(135deg, #1a1400 0%, #0d1020 50%, #0a0c10 100%)", borderTop: "1px solid #3a3010", borderBottom: "1px solid #3a3010", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(201,168,76,0.08) 0%, transparent 70%)", pointerEvents: "none" }}/>
        <FadeIn>
          <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "2rem", fontWeight: 400, color: "var(--cream)", marginBottom: 20 }}>Ready to Start a Project?</h2>
            <p style={{ color: "var(--muted)", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.8 }}>
              Tell us your requirements — we'll design and manufacture process equipment precisely to your specifications.
            </p>
            <button className="btn-primary" onClick={() => scrollTo("Contact")}>Contact Us Today</button>
          </div>
        </FadeIn>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 32px", background: "var(--dark3)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 64 }}>
              <div className="section-label" style={{ justifyContent: "center", display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
                Get In Touch
                <span style={{ width: 30, height: 1, background: "var(--gold)", display: "inline-block" }}/>
              </div>
              <h2 style={{ fontSize: "2.4rem", fontWeight: 400, color: "var(--cream)" }}>Contact <span style={{ color: "var(--gold)" }}>Us</span></h2>
            </div>
          </FadeIn>
          <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, marginBottom: 48 }}>
            {[
              { icon: "📍", title: "Registered Office", lines: ["202 Nandadeep Apartment,", "Shridharnagar, Chinchwad,", "Pune - 411 033, Maharashtra"] },
              { icon: "🏭", title: "Works Address", lines: ["Plot No. 33, Chakan-Alandi Road,", "Kuruli, Tal. Khed,", "Pune - 410 501"] },
              { icon: "📞", title: "Contact Details", lines: ["Mobile: +91 9922437860", "Email: svengineering19@gmail.com", "GST: 27AFWPT5382B1ZV"] },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="contact-card">
                  <div style={{ fontSize: "1.8rem", marginBottom: 14 }}>{card.icon}</div>
                  <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--gold)", fontSize: "0.78rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>{card.title}</div>
                  {card.lines.map((l, j) => <div key={j} style={{ color: "var(--muted)", fontSize: "0.84rem", lineHeight: 1.8 }}>{l}</div>)}
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Contact Form */}
          <FadeIn delay={0.2}>
            <div style={{ background: "#0f1520", border: "1px solid #2a3040", padding: "48px", borderRadius: 2 }}>
              <div className="section-label" style={{ marginBottom: 28 }}>Send an Enquiry</div>
              <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                {[["Your Name", "text"], ["Company Name", "text"], ["Email Address", "email"], ["Phone Number", "tel"]].map(([ph, type]) => (
                  <input key={ph} type={type} placeholder={ph}
                    style={{ padding: "14px 18px", background: "#141928", border: "1px solid #2a3040", color: "var(--cream)", fontSize: "0.85rem", outline: "none", fontFamily: "Georgia, serif", width: "100%" }}
                    onFocus={e => { e.target.style.borderColor = "var(--gold)"; }}
                    onBlur={e => { e.target.style.borderColor = "#2a3040"; }}
                  />
                ))}
              </div>
              <textarea placeholder="Describe your requirement — equipment type, material, size, industry..."
                rows={5}
                style={{ width: "100%", padding: "14px 18px", background: "#141928", border: "1px solid #2a3040", color: "var(--cream)", fontSize: "0.85rem", outline: "none", fontFamily: "Georgia, serif", resize: "vertical", marginBottom: 20 }}
                onFocus={e => { e.target.style.borderColor = "var(--gold)"; }}
                onBlur={e => { e.target.style.borderColor = "#2a3040"; }}
              />
              <button className="btn-primary">Send Enquiry →</button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#060810", borderTop: "1px solid #1e2535", padding: "40px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 36, alignItems: "start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ width: 36, height: 36, background: "var(--gold)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "0.9rem", color: "#000", fontFamily: "'Trebuchet MS', sans-serif", clipPath: "polygon(15% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)" }}>SV</div>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 700, color: "var(--cream)", fontSize: "0.9rem", letterSpacing: "0.1em" }}>S V ENGINEERING</div>
              </div>
              <p style={{ color: "var(--muted)", fontSize: "0.8rem", lineHeight: 1.8, maxWidth: 360 }}>
                Precision fabricators of process equipment for sugar, distillery, pharmaceutical, petro-chemical, and dairy industries. Est. 2009, Pune.
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 48, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 14 }}>Navigation</div>
                {NAV_LINKS.map(l => (
                  <div key={l} style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}
                    onClick={() => scrollTo(l)}
                    onMouseEnter={e => e.target.style.color = "var(--cream)"}
                    onMouseLeave={e => e.target.style.color = "var(--muted)"}
                  >{l}</div>
                ))}
              </div>
              <div>
                <div style={{ fontFamily: "'Trebuchet MS', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: 14 }}>Quick Contact</div>
                <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: 8 }}>+91 9922437860</div>
                <div style={{ color: "var(--muted)", fontSize: "0.8rem", marginBottom: 8 }}>svengineering19@gmail.com</div>
                <div style={{ color: "var(--muted)", fontSize: "0.8rem" }}>Pune, Maharashtra</div>
              </div>
            </div>
          </div>
          <div className="divider"/>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 24 }}>
            <span style={{ color: "#444", fontSize: "0.73rem" }}>© 2024 S V Engineering. All rights reserved.</span>
            <span style={{ color: "#444", fontSize: "0.73rem" }}>ASME SEC-IX · ISO 9001 · TUV NORD Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
