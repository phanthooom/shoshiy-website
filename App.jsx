import { useEffect, useRef, useState, useCallback } from "react";
import "./styles.css";

/* ============================================================
   Shoshiy вЂ” React (Vite) single-file app
   Drop this in src/App.jsx, styles.css next to it, main.jsx renders <App/>.
   Icons: lucide-react. Run: npm i lucide-react
   ============================================================ */
import {
    Moon, Sun, Menu, ArrowRight, ArrowUpRight, ArrowLeft, Check, Send,
    GitBranch, ShieldCheck, MapPin, Code2, Map as MapIcon, LayoutGrid,
    Smartphone, Landmark, Building2, BrainCircuit, BarChart3, Cloud,
    Mail, Phone, Download, Linkedin, Github,
} from "lucide-react";

const EASE_EXPO = "cubic-bezier(0.16,1,0.3,1)";
const prefersReduced = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion:reduce)").matches;

/* ---------- data ---------- */
const SERVICES = [
    { Icon: Code2, t: "Software Development", d: "Custom platforms built on clean architecture, designed to outlive their first release." },
    { Icon: MapIcon, t: "GIS Solutions", d: "Spatial intelligence, cadastre, and mapping systems built on ArcGIS and open geo stacks." },
    { Icon: LayoutGrid, t: "Web Platforms", d: "High-traffic portals and dashboards that stay fast under millions of sessions." },
    { Icon: Smartphone, t: "Mobile Applications", d: "Native-grade iOS and Android experiences with offline-first reliability." },
    { Icon: Landmark, t: "Government Digitalization", d: "e-Gov services, registries, and inter-agency systems built for the public good." },
    { Icon: Building2, t: "Enterprise Systems", d: "ERP, CRM, and workflow engines that replace spreadsheets with real infrastructure." },
    { Icon: BrainCircuit, t: "Artificial Intelligence", d: "LLMs, computer vision, and decision systems wired directly into your operations." },
    { Icon: BarChart3, t: "Data Analytics", d: "Pipelines and warehouses that turn raw events into decisions leadership can act on." },
    { Icon: Cloud, t: "Cloud Technologies", d: "Resilient, observable infrastructure on Kubernetes, designed to scale on demand." },
];

const SOLUTIONS = [
    { tab: "Enterprise software", tag: "Enterprise", h: "Systems of record your whole org runs on.", p: "We replace the patchwork of spreadsheets and legacy tools with one coherent platform: finance, logistics, HR, and operations, modeled around how your business actually works.", f: ["ERP & CRM tailored to your processes", "Role-based access & full audit trails", "On-prem or private cloud deployment", "Migration from legacy systems"] },
    { tab: "GIS technologies", tag: "Geospatial", h: "Maps that make decisions, not just pictures.", p: "National cadastre, utility networks, and field operations powered by ArcGIS and open geospatial stacks, with real-time spatial analytics layered on top.", f: ["Cadastre & land registry platforms", "Real-time asset & fleet tracking", "Custom spatial analytics engines", "Offline field-data collection"] },
    { tab: "Mobile apps", tag: "Mobile", h: "Apps people open every single day.", p: "Native-grade iOS and Android products with offline-first sync, biometric security, and the kind of polish that earns a permanent spot on the home screen.", f: ["Offline-first architecture", "Biometric & secure auth", "Push, geofencing & deep links", "Shared codebase, native feel"] },
    { tab: "AI solutions", tag: "AI", h: "Intelligence wired into your operations.", p: "From document understanding to predictive forecasting, we ship AI that lives inside your workflows, not in a demo, with guardrails and human oversight built in.", f: ["LLM-powered assistants & search", "Computer vision & OCR pipelines", "Forecasting & anomaly detection", "Private, on-prem model hosting"] },
    { tab: "Government systems", tag: "e-Government", h: "Public services that respect citizens' time.", p: "Registries, e-services, and inter-agency platforms built to national-scale reliability and security standards, serving millions without breaking a sweat.", f: ["Citizen-facing e-service portals", "Inter-agency data exchange", "Digital identity integration", "Compliance & national security standards"] },
];

const CASES = [
    { cls: "lg", g: "g-gis", live: "map", cat: "GIS В· National scale", h: "National Cadastre Platform", p: "A unified land registry mapping 6.4M parcels with real-time spatial validation across every region." },
    { cls: "", g: "g-ai", cat: "AI", h: "DocSense OCR Engine", p: "Document understanding pipeline processing 40K filings a day at 98.7% accuracy." },
    { cls: "", g: "g-fin", live: "chart", cat: "Enterprise", h: "NaviBank Core", p: "Banking back-office handling 12M transactions monthly." },
    { cls: "wide", g: "g-gov", cat: "Government В· e-Services", h: "e-Gov Citizen Portal", p: "One front door to 120+ public services, serving 3.2M registered citizens." },
    { cls: "tall", g: "g-mob", cat: "Mobile", h: "AgroField", p: "Offline-first field app for 18K agronomists collecting crop data with zero connectivity." },
    { cls: "", g: "g-gis", cat: "Data", h: "StatCom Warehouse", p: "National statistics pipeline unifying 40 data sources into one warehouse." },
    { cls: "", g: "g-ai", cat: "Cloud", h: "CityOne Infrastructure", p: "Kubernetes platform powering a smart-city stack with 99.98% uptime." },
];

const TECH = ["React", "ArcGIS", "Node.js", "PostgreSQL", "TypeScript", "Kubernetes", "PostGIS", "Python", "Go", "PyTorch", "Kafka", "Redis", "Next.js", "Swift", "Kotlin", "Terraform", "gRPC"];
const BIG_TECH = new Set(["React", "ArcGIS", "Node.js", "PostgreSQL"]);

const ACH = [
    { n: 180, s: "+", l: "Projects shipped" },
    { n: 12, s: "M+", l: "Daily requests served" },
    { n: 40, s: "+", l: "Government systems" },
    { n: 99, s: "%", l: "Client satisfaction" },
];

const TESTI = [
    { av: "AK", nm: "Akmal Karimov", rl: "CIO, Ministry of Digital Development", q: "Shoshiy delivered a national-scale registry that other vendors said was impossible on our timeline. Two years in, it hasn't gone down once." },
    { av: "DS", nm: "Dilnoza Saidova", rl: "Head of Geodata, UzGeo", q: "They don't just write code, they understand public infrastructure. The GIS platform handles peak load like it's nothing." },
    { av: "RT", nm: "Rustam Tashkentov", rl: "CTO, NaviBank", q: "Our core banking migration was the cleanest enterprise rollout I've seen in 15 years. Zero downtime, zero data loss." },
    { av: "MN", nm: "Madina Nazarova", rl: "Director of Operations, StatCom", q: "The AI document pipeline cut our processing time by 80%. The team treated accuracy and governance as non-negotiable." },
];

const NAV_SECTIONS = ["Home", "Services", "Solutions", "Work", "Reach", "Technology", "Contact"];

/* ---------- hooks ---------- */
function useReveal() {
    const ref = useRef(null);
    const [shown, setShown] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } },
            { threshold: 0.14 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return [ref, shown];
}

function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
    const [ref, shown] = useReveal();
    return (
        <Tag ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`}
            style={{ transitionDelay: `${delay * 0.08}s` }} {...rest}>
            {children}
        </Tag>
    );
}

function useAccent() {
    return useCallback(() => {
        if (typeof window === "undefined") return "#3B82F6";
        return getComputedStyle(document.documentElement).getPropertyValue("--accent-soft").trim() || "#3B82F6";
    }, []);
}

/* ---------- count up ---------- */
function CountUp({ to, suffix = "" }) {
    const ref = useRef(null);
    const [val, setVal] = useState(0);
    useEffect(() => {
        const el = ref.current;
        const io = new IntersectionObserver(([e]) => {
            if (!e.isIntersecting) return;
            io.unobserve(el);
            const t0 = performance.now();
            const tick = (t) => {
                const p = Math.min((t - t0) / 1500, 1);
                setVal(Math.round(to * (1 - Math.pow(1 - p, 4))));
                if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        }, { threshold: 0.6 });
        io.observe(el);
        return () => io.disconnect();
    }, [to]);
    return <span ref={ref}>{val}<span className="suffix">{suffix}</span></span>;
}

/* ---------- preloader ---------- */
function Preloader({ onDone }) {
    const [pct, setPct] = useState(0);
    const [done, setDone] = useState(false);
    useEffect(() => {
        let p = 0;
        let id;
        const tick = () => {
            p += Math.random() * 16 + 6;
            if (p >= 100) {
                setPct(100);
                id = setTimeout(() => { setDone(true); onDone(); }, 420);
                return;
            }
            setPct(Math.floor(p));
            id = setTimeout(tick, 90 + Math.random() * 120);
        };
        id = setTimeout(tick, 260);
        return () => clearTimeout(id);
    }, [onDone]);
    return (
        <div className={`loader ${done ? "done" : ""}`}>
            <div className="loader-inner">
                <svg viewBox="0 0 32 32"><path className="draw" d="M11 21c0 2.2 1.9 3.6 4.6 3.6 2.7 0 4.5-1.4 4.5-3.6 0-5-8.3-2.8-8.3-6.2 0-1.7 1.5-2.9 3.7-2.9 2.1 0 3.6 1.1 3.8 2.9" /></svg>
                <div className="loader-bar"><i style={{ width: `${pct}%` }} /></div>
                <div className="pct">{pct}</div>
            </div>
        </div>
    );
}

/* ---------- logo ---------- */
const Logo = () => (
    <a href="#top" className="logo magnetic">
        <span className="mark">
            <svg viewBox="0 0 32 32" fill="none">
                <rect x="1" y="1" width="30" height="30" rx="9" fill="var(--accent)" />
                <path d="M11 21c0 2.2 1.9 3.6 4.6 3.6 2.7 0 4.5-1.4 4.5-3.6 0-5-8.3-2.8-8.3-6.2 0-1.7 1.5-2.9 3.7-2.9 2.1 0 3.6 1.1 3.8 2.9" stroke="var(--on-accent)" strokeWidth="2.1" strokeLinecap="round" />
            </svg>
        </span>
        Shoshiy
    </a>
);

/* ---------- hero canvas (icosahedron + particles) ---------- */
function HeroCanvas({ start }) {
    const ref = useRef(null);
    const accent = useAccent();
    useEffect(() => {
        if (!start) return;
        const cv = ref.current, ctx = cv.getContext("2d");
        const reduce = prefersReduced();
        let W, H, DPR, cx, cy, raf;
        const size = () => {
            DPR = Math.min(devicePixelRatio || 1, 2);
            W = cv.clientWidth; H = cv.clientHeight;
            cv.width = W * DPR; cv.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            cx = W * 0.72; cy = H * 0.5;
        };
        size(); addEventListener("resize", size);
        const t = (1 + Math.sqrt(5)) / 2;
        let V = [[-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0], [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t], [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]];
        const nm = Math.hypot(1, t); V = V.map((p) => p.map((c) => c / nm));
        const E = [];
        for (let i = 0; i < V.length; i++) for (let j = i + 1; j < V.length; j++)
            if (Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]) < 1.2) E.push([i, j]);
        const N = reduce ? 28 : 70, P = [];
        for (let i = 0; i < N; i++) P.push({ x: Math.random() * W, y: Math.random() * H, z: Math.random(), r: Math.random() * 1.6 + 0.4, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18 });
        let mx = 0, my = 0, tx = 0, ty = 0;
        const onMove = (e) => { tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5; };
        addEventListener("mousemove", onMove);
        const txt = () => getComputedStyle(document.documentElement).getPropertyValue("--text-3").trim() || "#888";
        let a = 0;
        const frame = () => {
            a += reduce ? 0 : 0.0035; mx += (tx - mx) * 0.05; my += (ty - my) * 0.05;
            ctx.clearRect(0, 0, W, H);
            const col = accent(), tc = txt();
            ctx.fillStyle = tc;
            for (const p of P) {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
                ctx.globalAlpha = 0.1 + p.z * 0.18; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7); ctx.fill();
            }
            ctx.globalAlpha = 1;
            const ax = a * 0.8 + my * 0.9, ay = a + mx * 0.9, R = Math.min(W, H) * 0.26;
            const pts = V.map(([x, y, z]) => {
                const y1 = y * Math.cos(ax) - z * Math.sin(ax), z1 = y * Math.sin(ax) + z * Math.cos(ax);
                const x2 = x * Math.cos(ay) + z1 * Math.sin(ay), z2 = -x * Math.sin(ay) + z1 * Math.cos(ay);
                const per = 2.6 / (2.6 + z2);
                return { x: cx + x2 * R * per, y: cy + y1 * R * per, z: z2, s: per };
            });
            for (const [i, j] of E) {
                const A = pts[i], B = pts[j], d = (A.z + B.z) / 2;
                ctx.globalAlpha = 0.18 + ((d + 1) / 2) * 0.55; ctx.strokeStyle = col;
                ctx.lineWidth = 0.6 + ((d + 1) / 2) * 1.1;
                ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.stroke();
            }
            for (const p of pts) {
                ctx.globalAlpha = 0.4 + ((p.z + 1) / 2) * 0.6; ctx.fillStyle = col;
                ctx.beginPath(); ctx.arc(p.x, p.y, 1.4 + p.s * 1.6, 0, 7); ctx.fill();
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(frame);
        };
        frame();
        return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); removeEventListener("mousemove", onMove); };
    }, [start, accent]);
    return <canvas id="hero-canvas" ref={ref} />;
}

/* ---------- globe ---------- */
function Globe({ start }) {
    const ref = useRef(null);
    const accent = useAccent();
    useEffect(() => {
        if (!start) return;
        const cv = ref.current, ctx = cv.getContext("2d");
        const reduce = prefersReduced();
        let W, H, DPR, cx, cy, R, raf;
        const size = () => {
            DPR = Math.min(devicePixelRatio || 1, 2);
            W = cv.clientWidth; H = cv.clientHeight;
            cv.width = W * DPR; cv.height = H * DPR;
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            cx = W / 2; cy = H / 2; R = Math.min(W, H) * 0.38;
        };
        size(); addEventListener("resize", size);
        const pts = [], NP = reduce ? 260 : 620;
        for (let i = 0; i < NP; i++) {
            const y = 1 - (i / (NP - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * 2.399963;
            pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
        }
        const hot = Array.from({ length: 7 }, () => {
            const y = Math.random() * 2 - 1, r = Math.sqrt(1 - y * y), th = Math.random() * 7;
            return [Math.cos(th) * r, y, Math.sin(th) * r];
        });
        let a = 0;
        const project = ([x, y, z]) => {
            const x2 = x * Math.cos(a) + z * Math.sin(a), z2 = -x * Math.sin(a) + z * Math.cos(a);
            const per = 1.8 / (1.8 + z2);
            return { x: cx + x2 * R * per, y: cy + y * R * per, z: z2, s: per };
        };
        const frame = () => {
            a += reduce ? 0 : 0.0045; ctx.clearRect(0, 0, W, H);
            const col = accent();
            pts.forEach((p) => {
                const q = project(p), front = (q.z + 1) / 2;
                ctx.globalAlpha = 0.12 + front * 0.5; ctx.fillStyle = col;
                ctx.beginPath(); ctx.arc(q.x, q.y, 0.6 + q.s * 1.1, 0, 7); ctx.fill();
            });
            for (let i = 0; i < hot.length; i++) {
                const A = project(hot[i]), B = project(hot[(i + 1) % hot.length]);
                const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2 - 40;
                ctx.globalAlpha = 0.5; ctx.strokeStyle = col; ctx.lineWidth = 1;
                ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.quadraticCurveTo(mx, my, B.x, B.y); ctx.stroke();
                const pulse = (Math.sin(a * 5 + i) + 1) / 2;
                ctx.globalAlpha = 0.9; ctx.fillStyle = col;
                ctx.beginPath(); ctx.arc(A.x, A.y, 2 + pulse * 2, 0, 7); ctx.fill();
            }
            ctx.globalAlpha = 1;
            raf = requestAnimationFrame(frame);
        };
        frame();
        return () => { cancelAnimationFrame(raf); removeEventListener("resize", size); };
    }, [start, accent]);
    return <canvas id="globe-canvas" ref={ref} />;
}

/* ---------- bento live canvas ---------- */
function LiveCanvas({ kind }) {
    const ref = useRef(null);
    useEffect(() => {
        const cv = ref.current, ctx = cv.getContext("2d");
        let raf;
        const sz = () => { cv.width = cv.clientWidth * 2; cv.height = cv.clientHeight * 2; ctx.setTransform(2, 0, 0, 2, 0, 0); };
        sz(); addEventListener("resize", sz);
        const W = () => cv.clientWidth, H = () => cv.clientHeight;
        let a = 0;
        if (kind === "map") {
            const nodes = Array.from({ length: 26 }, () => ({ x: Math.random(), y: Math.random() }));
            const draw = () => {
                a += 0.004; ctx.clearRect(0, 0, W(), H());
                ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 0.6;
                for (let i = 0; i < nodes.length; i++) for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
                    if (Math.hypot(dx, dy) < 0.22) { ctx.beginPath(); ctx.moveTo(nodes[i].x * W(), nodes[i].y * H()); ctx.lineTo(nodes[j].x * W(), nodes[j].y * H()); ctx.stroke(); }
                }
                ctx.fillStyle = "rgba(255,255,255,.85)";
                nodes.forEach((n, k) => { const pulse = 1 + Math.sin(a * 4 + k) * 0.4; ctx.beginPath(); ctx.arc(n.x * W(), n.y * H(), 1.6 * pulse, 0, 7); ctx.fill(); });
                raf = requestAnimationFrame(draw);
            };
            draw();
        } else {
            let pts = Array.from({ length: 40 }, (_, i) => 0.5 + Math.sin(i * 0.5) * 0.2);
            const draw = () => {
                a += 0.02; ctx.clearRect(0, 0, W(), H());
                pts = pts.map((p, i) => 0.5 + Math.sin(i * 0.45 + a) * 0.22 + Math.sin(i * 0.13 + a * 0.6) * 0.12);
                ctx.beginPath(); pts.forEach((p, i) => { const x = (i / (pts.length - 1)) * W(), y = (1 - p) * H(); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
                ctx.lineTo(W(), H()); ctx.lineTo(0, H()); ctx.closePath(); ctx.fillStyle = "rgba(255,255,255,.12)"; ctx.fill();
                ctx.beginPath(); pts.forEach((p, i) => { const x = (i / (pts.length - 1)) * W(), y = (1 - p) * H(); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
                ctx.strokeStyle = "rgba(255,255,255,.9)"; ctx.lineWidth = 1.6; ctx.stroke();
                raf = requestAnimationFrame(draw);
            };
            draw();
        }
        return () => { cancelAnimationFrame(raf); removeEventListener("resize", sz); };
    }, [kind]);
    return <canvas className="live" ref={ref} />;
}

/* ---------- scramble heading ---------- */
function Scramble({ text, run }) {
    const [out, setOut] = useState(text);
    useEffect(() => {
        if (!run || prefersReduced()) { setOut(text); return; }
        const ch = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&_/<>";
        let f = 0, id;
        id = setInterval(() => {
            setOut(text.split("").map((c, i) => (i < f ? text[i] : c === " " ? " " : ch[Math.floor(Math.random() * ch.length)])).join(""));
            f += 0.5;
            if (f >= text.length) { clearInterval(id); setOut(text); }
        }, 38);
        return () => clearInterval(id);
    }, [run, text]);
    return <em className="accent" style={{ fontStyle: "normal" }}>{out}</em>;
}

/* ---------- magnetic + cursor + tilt handlers (attached globally) ---------- */
function useInteractions(ready) {
    const accent = useAccent();
    useEffect(() => {
        if (!ready) return;
        const fine = matchMedia("(pointer:fine)").matches;
        const cleanups = [];

        if (fine) {
            const dot = document.getElementById("curDot"), ring = document.getElementById("curRing");
            let rx = 0, ry = 0, dx = 0, dy = 0, raf;
            const move = (e) => { dx = e.clientX; dy = e.clientY; dot.style.transform = `translate(${dx}px,${dy}px) translate(-50%,-50%)`; };
            addEventListener("mousemove", move);
            const loop = () => { rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18; ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`; raf = requestAnimationFrame(loop); };
            loop();
            const grow = () => ring.classList.add("grow"), shrink = () => ring.classList.remove("grow");
            const hot = document.querySelectorAll("a,button,.svc,.case,.chip,input,textarea,select");
            hot.forEach((el) => { el.addEventListener("mouseenter", grow); el.addEventListener("mouseleave", shrink); });
            cleanups.push(() => { removeEventListener("mousemove", move); cancelAnimationFrame(raf); hot.forEach((el) => { el.removeEventListener("mouseenter", grow); el.removeEventListener("mouseleave", shrink); }); });

            document.querySelectorAll(".magnetic").forEach((btn) => {
                const m = (e) => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px,${(e.clientY - r.top - r.height / 2) * 0.35}px)`; };
                const out = () => (btn.style.transform = "");
                btn.addEventListener("mousemove", m); btn.addEventListener("mouseleave", out);
                cleanups.push(() => { btn.removeEventListener("mousemove", m); btn.removeEventListener("mouseleave", out); });
            });
        }

        document.querySelectorAll(".svc").forEach((card) => {
            const m = (e) => {
                const r = card.getBoundingClientRect();
                card.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
                card.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
                const rxx = ((e.clientY - r.top) / r.height - 0.5) * -5, ryy = ((e.clientX - r.left) / r.width - 0.5) * 5;
                card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rxx}deg) rotateY(${ryy}deg)`;
            };
            const out = () => (card.style.transform = "");
            card.addEventListener("mousemove", m); card.addEventListener("mouseleave", out);
            cleanups.push(() => { card.removeEventListener("mousemove", m); card.removeEventListener("mouseleave", out); });
        });

        return () => cleanups.forEach((c) => c());
    }, [ready, accent]);
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
    const [loaded, setLoaded] = useState(false);
    const [theme, setTheme] = useState("dark");
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [hideNav, setHideNav] = useState(false);
    const [progress, setProgress] = useState(0);
    const [activeSol, setActiveSol] = useState(0);
    const [activeNav, setActiveNav] = useState(0);
    const [ti, setTi] = useState(0);
    const [sent, setSent] = useState(false);
    const lastY = useRef(0);

    useEffect(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
    useEffect(() => { document.body.classList.toggle("lock", !loaded); }, [loaded]);

    useInteractions(loaded);

    /* scroll */
    useEffect(() => {
        const onScroll = () => {
            const y = scrollY;
            setScrolled(y > 20);
            setHideNav(y > lastY.current && y > 400);
            lastY.current = y;
            setProgress((y / (document.body.scrollHeight - innerHeight)) * 100);
        };
        addEventListener("scroll", onScroll);
        return () => removeEventListener("scroll", onScroll);
    }, []);

    /* scroll spy */
    useEffect(() => {
        const secs = document.querySelectorAll("[data-nav]");
        const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setActiveNav(+e.target.dataset.nav); }), { threshold: 0.4 });
        secs.forEach((s) => io.observe(s));
        return () => io.disconnect();
    }, [loaded]);

    /* hero parallax */
    useEffect(() => {
        const el = document.getElementById("heroVisual");
        const onScroll = () => { if (el) el.style.transform = `translateY(${scrollY * 0.12}px)`; };
        addEventListener("scroll", onScroll);
        return () => removeEventListener("scroll", onScroll);
    }, []);

    const perView = () => (typeof window !== "undefined" && innerWidth <= 760 ? 1 : 2);
    const maxTi = Math.max(0, TESTI.length - perView());
    const clampedTi = Math.max(0, Math.min(ti, maxTi));

    return (
        <>
            <Preloader onDone={() => setLoaded(true)} />
            <div className="grain" />
            <div className="progress" style={{ width: `${progress}%` }} />
            <div className="cur-dot" id="curDot" />
            <div className="cur-ring" id="curRing" />

            <nav className="dotnav">
                {NAV_SECTIONS.map((s, i) => (
                    <a key={s} href={`#${["top", "services", "solutions", "work", "reach", "stack", "contact"][i]}`} className={activeNav === i ? "on" : ""}><span>{s}</span></a>
                ))}
            </nav>

            <header className={`${scrolled ? "scrolled" : ""} ${hideNav ? "hide" : ""}`}>
                <div className="wrap">
                    <nav className="nav">
                        <Logo />
                        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
                            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
                            <a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</a>
                            <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
                            <a href="#stack" onClick={() => setMenuOpen(false)}>Technology</a>
                            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
                        </div>
                        <div className="nav-actions">
                            <button className="theme-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle theme">
                                {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                            <a href="#contact" className="btn btn-primary magnetic" style={{ padding: "11px 20px" }}>Start a project</a>
                            <button className="burger" onClick={() => setMenuOpen((v) => !v)} aria-label="Menu"><Menu size={20} /></button>
                        </div>
                    </nav>
                </div>
            </header>

            <main id="top">
                {/* HERO */}
                <section className="hero" data-nav="0">
                    <HeroCanvas start={loaded} />
                    <div className="hero-aurora"><b className="a1" /><b className="a2" /></div>
                    <div className="wrap">
                        <div className="hero-grid">
                            <div className="hero-copy">
                                <span className="eyebrow reveal in">Digital engineering, from Tashkent to the world</span>
                                <h1 className={`reveal-h ${loaded ? "in" : ""}`}>
                                    <span className="line-mask"><span>We engineer the</span></span>
                                    <span className="line-mask"><span><Scramble text="digital state" run={loaded} /></span></span>
                                    <span className="line-mask"><span>and the systems that run it.</span></span>
                                </h1>
                                <Reveal as="p" className="hero-sub" delay={2}>Shoshiy builds enterprise software, GIS platforms, and AI systems that power governments, ministries, and ambitious companies across Central Asia.</Reveal>
                                <Reveal className="hero-cta" delay={3}>
                                    <a href="#contact" className="btn btn-primary magnetic">Start a project <ArrowRight size={17} /></a>
                                    <a href="#work" className="btn btn-ghost magnetic">View our work</a>
                                </Reveal>
                                <Reveal className="hero-stats" delay={4}>
                                    <div className="stat"><div className="num tnum"><CountUp to={180} suffix="+" /></div><div className="label">Projects delivered</div></div>
                                    <div className="stat"><div className="num tnum"><CountUp to={40} suffix="+" /></div><div className="label">Government systems</div></div>
                                    <div className="stat"><div className="num tnum"><CountUp to={99} suffix="%" /></div><div className="label">Client retention</div></div>
                                </Reveal>
                            </div>
                            <div className="hero-visual" id="heroVisual">
                                <div className="hero-badge b1"><GitBranch size={16} /> 12M+ daily requests</div>
                                <div className="hero-badge b2"><ShieldCheck size={16} /> ISO 27001 secured</div>
                                <div className="hero-badge b3"><MapPin size={16} /> National GIS coverage</div>
                            </div>
                        </div>
                    </div>
                    <div className="scroll-hint"><span>Scroll</span><span className="line" /></div>
                </section>

                {/* TRUST */}
                <div className="trust">
                    <p>Trusted by institutions that can't afford to get it wrong</p>
                    <div className="marquee">
                        {["Ministry of Digital", "UzGeo", "NaviBank", "StatCom", "AgroData", "CityOne", "e-Gov", "CadastreUZ"].concat(["Ministry of Digital", "UzGeo", "NaviBank", "StatCom", "AgroData", "CityOne", "e-Gov", "CadastreUZ"]).map((s, i) => <span key={i}>{s}</span>)}
                    </div>
                </div>

                {/* SERVICES */}
                <section className="sec" id="services" data-nav="1">
                    <div className="wrap">
                        <Reveal className="sec-head"><span className="eyebrow">What we do</span><h2>Capabilities engineered for scale.</h2><p>Nine disciplines, one integrated team. We take systems from blank repository to national infrastructure.</p></Reveal>
                        <div className="svc-grid">
                            {SERVICES.map(({ Icon, t, d }, i) => (
                                <Reveal as="article" className="svc" delay={i % 3} key={t}>
                                    <div className="ic"><Icon size={24} /></div>
                                    <h3>{t}</h3><p>{d}</p>
                                    <span className="more">Explore <ArrowUpRight size={15} /></span>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* SOLUTIONS */}
                <section className="sec" id="solutions" data-nav="2" style={{ background: "var(--surface-1)", borderBlock: "1px solid var(--line-soft)" }}>
                    <div className="wrap">
                        <Reveal className="sec-head"><span className="eyebrow">Solutions</span><h2>Built for the work that actually matters.</h2></Reveal>
                        <div className="sol">
                            <div className="sol-nav">
                                {SOLUTIONS.map((s, i) => (
                                    <button key={s.tab} className={`sol-tab ${activeSol === i ? "active" : ""}`} onClick={() => setActiveSol(i)}>{s.tab}</button>
                                ))}
                            </div>
                            <div className="sol-panels">
                                {SOLUTIONS.map((s, i) => (
                                    <div key={s.tab} className={`sol-panel ${activeSol === i ? "active" : ""}`}>
                                        <div className="visual"><div className="mesh" /><div className="orb" /><span className="tag">{s.tag}</span></div>
                                        <h3>{s.h}</h3><p>{s.p}</p>
                                        <ul className="sol-feats">{s.f.map((x) => <li key={x}><Check size={18} />{x}</li>)}</ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* WORK */}
                <section className="sec" id="work" data-nav="3">
                    <div className="wrap">
                        <Reveal className="sec-head"><span className="eyebrow">Selected work</span><h2>Infrastructure with millions of users behind it.</h2><p>A few of the systems we've shipped. The rest are under NDA.</p></Reveal>
                        <div className="bento">
                            {CASES.map((c, i) => (
                                <Reveal as="article" className={`case ${c.cls}`} delay={i % 3} key={c.h}>
                                    <div className={`bg ${c.g}`} />
                                    {c.live && <LiveCanvas kind={c.live} />}
                                    <div className="veil" />
                                    <div className="arrow"><ArrowUpRight size={18} /></div>
                                    <div className="cat">{c.cat}</div>
                                    <h3>{c.h}</h3><p>{c.p}</p>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>

                {/* REACH / GLOBE */}
                <section className="sec globe-sec" id="reach" data-nav="4">
                    <div className="wrap">
                        <div className="globe-grid">
                            <Reveal>
                                <span className="eyebrow">National reach</span>
                                <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginTop: 18 }}>Systems live in every region we serve.</h2>
                                <p className="muted" style={{ fontSize: "1.08rem", marginTop: 20, maxWidth: "46ch" }}>From the capital to the most remote districts, our platforms keep running. Real-time, resilient, and built to stay online when it matters most.</p>
                                <div className="hero-cta" style={{ marginTop: 30 }}><a href="#contact" className="btn btn-ghost magnetic">Partner with us <ArrowRight size={17} /></a></div>
                            </Reveal>
                            <Reveal className="globe-wrap" delay={1}>
                                <Globe start={loaded} />
                                <div className="globe-stat g1">Uptime<b className="tnum">99.98%</b></div>
                                <div className="globe-stat g2">Active nodes<b className="tnum">214</b></div>
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* STACK */}
                <section className="sec" id="stack" data-nav="5" style={{ background: "var(--surface-1)", borderBlock: "1px solid var(--line-soft)" }}>
                    <div className="wrap">
                        <div className="tech">
                            <Reveal>
                                <span className="eyebrow">Technology</span>
                                <h2 style={{ fontSize: "clamp(2rem,4vw,3rem)", marginTop: 18 }}>A stack chosen for the next decade, not the last one.</h2>
                                <p className="muted" style={{ fontSize: "1.08rem", marginTop: 20, maxWidth: "46ch" }}>We pick boring, proven foundations and reserve the bleeding edge for where it earns its keep. Every choice is one we'll still defend in five years.</p>
                                <div className="hero-cta" style={{ marginTop: 30 }}><a href="#contact" className="btn btn-ghost magnetic">Talk architecture <ArrowRight size={17} /></a></div>
                            </Reveal>
                            <Reveal className="tech-cloud" delay={1}>
                                {TECH.map((t) => <span key={t} className={`chip ${BIG_TECH.has(t) ? "big" : ""}`}><span className="dot" />{t}</span>)}
                            </Reveal>
                        </div>
                    </div>
                </section>

                {/* ACHIEVEMENTS */}
                <section className="ach">
                    <div className="ach-grid">
                        {ACH.map((a, i) => (
                            <Reveal className="ach-cell" delay={i} key={a.l}><div className="num tnum"><CountUp to={a.n} suffix={a.s} /></div><div className="label">{a.l}</div></Reveal>
                        ))}
                    </div>
                </section>

                {/* TESTIMONIALS */}
                <section className="sec" id="testimonials">
                    <div className="wrap">
                        <Reveal className="sec-head" style={{ maxWidth: 560 }}><span className="eyebrow">Clients</span><h2 style={{ marginTop: 18 }}>The reviews that get repeat contracts.</h2></Reveal>
                        <div className="testi-wrap">
                            <div className="testi-track" style={{ transform: `translateX(-${clampedTi * (100 / perView())}%)` }}>
                                {TESTI.map((t) => (
                                    <article className="testi" key={t.nm}>
                                        <p className="quote">"{t.q}"</p>
                                        <div className="by"><div className="av">{t.av}</div><div><div className="nm">{t.nm}</div><div className="rl">{t.rl}</div></div></div>
                                    </article>
                                ))}
                            </div>
                        </div>
                        <div className="testi-ctrl">
                            <button onClick={() => setTi((v) => Math.max(0, v - 1))} aria-label="Previous"><ArrowLeft size={19} /></button>
                            <button onClick={() => setTi((v) => Math.min(maxTi, v + 1))} aria-label="Next"><ArrowRight size={19} /></button>
                        </div>
                    </div>
                </section>

                {/* CONTACT */}
                <section className="sec" id="contact" data-nav="6">
                    <div className="wrap">
                        <Reveal className="sec-head"><span className="eyebrow">Contact</span><h2>Tell us what you're building.</h2><p>Whether it's a national platform or a focused MVP, we'll tell you straight whether we're the right team for it.</p></Reveal>
                        <div className="contact-grid">
                            <Reveal as="form" className="contact-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                                <div className="two">
                                    <div className="field"><label htmlFor="nm">Full name</label><input id="nm" type="text" placeholder="Jane Doe" required /></div>
                                    <div className="field"><label htmlFor="em">Work email</label><input id="em" type="email" placeholder="jane@company.com" required /></div>
                                </div>
                                <div className="two">
                                    <div className="field"><label htmlFor="co">Organization</label><input id="co" type="text" placeholder="Acme Corp" /></div>
                                    <div className="field"><label htmlFor="sv">Service</label><select id="sv"><option>Software Development</option><option>GIS Solutions</option><option>Government Digitalization</option><option>AI & Data</option><option>Enterprise Systems</option><option>Something else</option></select></div>
                                </div>
                                <div className="field"><label htmlFor="msg">Project details</label><textarea id="msg" placeholder="A few sentences about scope, timeline, and what success looks like." /></div>
                                <button type="submit" className="btn btn-primary magnetic" style={{ width: "100%", justifyContent: "center", background: sent ? "var(--accent-soft)" : undefined }}>
                                    {sent ? <>Sent. We'll be in touch <Check size={17} /></> : <>Send inquiry <Send size={17} /></>}
                                </button>
                                <div className="dl"><div><div className="t">Corporate presentation</div><div className="s">Capabilities, case studies & methodology В· PDF, 4.2 MB</div></div><a href="#" className="btn btn-ghost magnetic" style={{ padding: "11px 18px" }}><Download size={17} /> Download</a></div>
                            </Reveal>
                            <div className="contact-side">
                                <Reveal className="contact-info" delay={1}>
                                    <div className="info-row"><div className="ic"><Mail size={19} /></div><div><div className="k">Email</div><div className="v">hello@shoshiy.uz</div></div></div>
                                    <div className="info-row"><div className="ic"><Phone size={19} /></div><div><div className="k">Phone</div><div className="v">+998 71 200 11 66</div></div></div>
                                    <div className="info-row"><div className="ic"><MapPin size={19} /></div><div><div className="k">Office</div><div className="v">Tashkent, Uzbekistan</div></div></div>
                                </Reveal>
                                <Reveal className="map" delay={2}><div className="mesh" /><div className="pin" /><div className="place">Shoshiy HQ В· Tashkent</div></Reveal>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="sec" style={{ paddingTop: 0 }}>
                    <div className="wrap">
                        <Reveal className="cta-band"><div className="glow" /><h2>Ready to build something national-scale?</h2><p>Let's turn the system you're imagining into infrastructure people depend on every day.</p><div className="hero-cta"><a href="#contact" className="btn btn-primary magnetic">Start a project <ArrowRight size={17} /></a><a href="#work" className="btn btn-ghost magnetic">See the work</a></div></Reveal>
                    </div>
                </section>
            </main>

            <footer>
                <div className="wrap">
                    <div className="foot-grid">
                        <div className="foot-brand"><Logo /><p>Engineering the digital state and the enterprise systems that run alongside it. Based in Tashkent, building for the world.</p></div>
                        <div className="foot-col"><h4>Services</h4><a href="#services">Software Development</a><a href="#services">GIS Solutions</a><a href="#services">Government Digitalization</a><a href="#services">Artificial Intelligence</a><a href="#services">Cloud Technologies</a></div>
                        <div className="foot-col"><h4>Company</h4><a href="#work">Our work</a><a href="#solutions">Solutions</a><a href="#stack">Technology</a><a href="#testimonials">Clients</a><a href="#contact">Contact</a></div>
                        <div className="foot-col"><h4>Connect</h4><a href="#">LinkedIn</a><a href="#">GitHub</a><a href="#">Telegram</a><a href="mailto:hello@shoshiy.uz">hello@shoshiy.uz</a></div>
                    </div>
                    <div className="foot-bottom"><span>В© 2026 Shoshiy. All rights reserved.</span><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a><a href="#" aria-label="GitHub"><Github size={17} /></a><a href="#" aria-label="Send"><Send size={17} /></a></div></div>
                </div>
            </footer>
        </>
    );
}