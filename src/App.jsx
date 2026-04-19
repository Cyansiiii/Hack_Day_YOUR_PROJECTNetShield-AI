import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { AnimatedNumber } from "./components/AnimatedNumber";
import { HeroConstellation } from "./components/HeroConstellation";
import { Reveal } from "./components/Reveal";
import { useLenis } from "./hooks/useLenis";

const navigation = [
  "Platform",
  "Services",
  "Defense Stack",
  "Dashboard",
  "Resources",
  "About"
];

const githubRepoUrl = "https://github.com/Cyansiiii/Hack_Day_YOUR_PROJECTNetShield-AI.git";

const services = [
  {
    title: "Live traffic visibility",
    copy: "Monitor packet volume, protocol shifts and suspicious spikes in one surface.",
    icon: "pulse"
  },
  {
    title: "Threat detection",
    copy: "Rules and anomaly signals surface malicious behavior the moment it appears.",
    icon: "shield"
  },
  {
    title: "Asset hardening",
    copy: "Pinpoint vulnerable nodes and prioritize exposure before it becomes incident fuel.",
    icon: "cube"
  },
  {
    title: "Executive reporting",
    copy: "Turn raw security telemetry into narrative summaries teams can act on fast.",
    icon: "report"
  },
  {
    title: "Simulation lab",
    copy: "Run safe attack drills to validate controls, playbooks and operator readiness.",
    icon: "flask"
  },
  {
    title: "Policy automation",
    copy: "Move from alert fatigue to recommended actions with ranked response guidance.",
    icon: "spark"
  },
  {
    title: "Threat intelligence",
    copy: "Fuse IP reputation, velocity and protocol context into a unified risk score.",
    icon: "network"
  },
  {
    title: "Analyst workflows",
    copy: "Assign severity, route incidents and keep the team aligned on live response.",
    icon: "grid"
  }
];

const processSteps = [
  {
    number: "01",
    title: "Ingest traffic",
    copy: "Packet events, device context and simulation streams enter a single real-time pipeline."
  },
  {
    number: "02",
    title: "Correlate signals",
    copy: "Protocol anomalies, rate spikes and repeated failures are stitched into live intelligence."
  },
  {
    number: "03",
    title: "Prioritize risk",
    copy: "High-value assets and dangerous sequences rise first with clear severity framing."
  },
  {
    number: "04",
    title: "Guide response",
    copy: "Operators get recommended actions, mitigation paths and incident memory in one flow."
  },
  {
    number: "05",
    title: "Continuously improve",
    copy: "Attack simulations and post-incident reports feed stronger baselines over time."
  }
];

const metrics = [
  { label: "Protected endpoints", value: 128, delta: "+18%" },
  { label: "Threats contained", value: 4.3, decimals: 1, suffix: "k", delta: "+27%" },
  { label: "Median alert latency", value: 320, suffix: "ms", delta: "-11%" }
];

const dashboardStats = [
  { label: "Total alerts", value: 4372, accent: true, delta: "+15%" },
  { label: "Tagged assets", value: 120, delta: "+15%" },
  { label: "Critical incidents", value: 1572, delta: "-5%" },
  { label: "Analysts online", value: 572, delta: "+10%" }
];

const orbitItems = [
  "Startup SOC",
  "Campus Labs",
  "Cloud Infra",
  "API Teams",
  "Fintech Ops",
  "Developer Tools",
  "Managed Security",
  "Internal IT"
];

const pillars = [
  { number: "01", title: "Risk-first thinking", tone: "sm" },
  { number: "02", title: "Continuous validation", tone: "md" },
  { number: "03", title: "Precision response", tone: "lg", featured: true },
  { number: "04", title: "Human-readable insight", tone: "md" },
  { number: "05", title: "Scalable collaboration", tone: "sm" }
];

const incidentTimeline = [
  {
    time: "14:27",
    label: "Unauthorized access attempt blocked",
    tone: "danger"
  },
  {
    time: "14:29",
    label: "Anomalous data traffic detected by AI",
    tone: "success"
  },
  {
    time: "14:31",
    label: "Critical asset isolated for review",
    tone: "neutral"
  },
  {
    time: "14:33",
    label: "Attack surface automatically hardened",
    tone: "neutral"
  },
  {
    time: "14:35",
    label: "Response playbook executed",
    tone: "success"
  }
];

const threatColumns = [
  { label: "Sep", value: 64 },
  { label: "Oct", value: 42 },
  { label: "Nov", value: 56 },
  { label: "Dec", value: 88, accent: true },
  { label: "Jan", value: 61 },
  { label: "Feb", value: 34 }
];

const severityTiles = [
  "5% High",
  "10% Critical",
  "10% Low",
  "35% Medium",
  "15% Info",
  "25% Safe"
];

const faqs = [
  {
    question: "Can NetShield AI run in simulation mode for demos?",
    answer: "Yes. The UI supports attack simulations so teams can showcase and validate response flows without touching production traffic."
  },
  {
    question: "Is the platform built for small teams?",
    answer: "The product is intentionally aimed at developers, students, startups and SMB operators who need visual security tooling without SIEM complexity."
  },
  {
    question: "What does the frontend emphasize first?",
    answer: "Immediate trust, live visibility, clear severity, and a premium motion-heavy interface that makes security feel approachable."
  }
];

const reportMetrics = [
  { label: "System efficiency", value: 99.2, decimals: 1, suffix: "%", width: "82%" },
  { label: "Threat remediation", value: 87.4, decimals: 1, suffix: "%", width: "68%" },
  { label: "Analyst focus time", value: 74.8, decimals: 1, suffix: "%", width: "59%" }
];

const inViewMotion = (delay = 0, amount = 0.2, y = 30) => ({
  initial: { opacity: 0, y, filter: "blur(10px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true, amount },
  transition: { duration: 0.78, delay, ease: [0.22, 1, 0.36, 1] }
});

function Icon({ type }) {
  switch (type) {
    case "pulse":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 13h4l2.2-5.2L13 17l2.3-5H21" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 5 6v5c0 5 3.2 8.7 7 10 3.8-1.3 7-5 7-10V6l-7-3Z" />
        </svg>
      );
    case "cube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 0v9m8-4.5-8 4.5-8-4.5" />
        </svg>
      );
    case "report":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6M10 9h2" />
        </svg>
      );
    case "flask":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 3v5l-4.5 7.6A3 3 0 0 0 8 20h8a3 3 0 0 0 2.5-4.4L14 8V3M9 13h6" />
        </svg>
      );
    case "spark":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
        </svg>
      );
    case "network":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 5v14M5 8h14M7.5 5a2.5 2.5 0 1 1 0 .1Zm9 0a2.5 2.5 0 1 1 0 .1ZM7.5 19a2.5 2.5 0 1 1 0 .1Zm9 0a2.5 2.5 0 1 1 0 .1Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
        </svg>
      );
  }
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.22c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-1.04-.01-1.88-2.78.62-3.37-1.21-3.37-1.21-.46-1.19-1.11-1.5-1.11-1.5-.91-.64.07-.63.07-.63 1 .08 1.53 1.05 1.53 1.05.9 1.57 2.35 1.11 2.92.85.09-.67.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.08 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.74 0 0 .84-.28 2.75 1.05A9.33 9.33 0 0 1 12 6.84c.85 0 1.7.12 2.5.36 1.9-1.33 2.74-1.05 2.74-1.05.55 1.43.21 2.48.11 2.74.64.72 1.03 1.63 1.03 2.75 0 3.95-2.33 4.81-4.56 5.07.36.32.68.95.68 1.92 0 1.39-.01 2.51-.01 2.85 0 .27.18.59.69.49A10.18 10.18 0 0 0 22 12.22C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <Reveal className={`section-heading ${align}`} y={34} blur={12} amount={0.4}>
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </Reveal>
  );
}

function App() {
  const pageRef = useRef(null);
  useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-shell", {
        y: -36,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".hero-copy > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        delay: 0.2,
        ease: "power3.out"
      });

      gsap.from(".hero-badge", {
        scale: 0.86,
        opacity: 0,
        delay: 0.55,
        duration: 1,
        ease: "back.out(1.5)"
      });

      gsap.to(".orbital-chip", {
        yPercent: -14,
        repeat: -1,
        yoyo: true,
        stagger: 0.16,
        duration: 2.2,
        ease: "sine.inOut"
      });

      gsap.to(".hero-grid-line", {
        scaleX: 1.12,
        transformOrigin: "left center",
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="page-shell" ref={pageRef} id="top">
      <div className="ambient ambient-left" aria-hidden="true" />
      <div className="ambient ambient-right" aria-hidden="true" />
      <main className="page-frame">
        <section className="hero-shell">
          <header className="nav-shell">
            <a className="brand" href="#top" aria-label="NetShield AI">
              <span className="brand-mark" />
              <span>NetShield AI</span>
            </a>

            <nav className="nav-links" aria-label="Primary">
              {navigation.map((item) => (
                <a key={item} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>
                  {item}
                </a>
              ))}
              <a
                className="nav-github"
                href={githubRepoUrl}
                aria-label="Open NetShield AI GitHub repository"
                title="GitHub Repository"
              >
                <GitHubIcon />
              </a>
            </nav>

            <a className="nav-cta" href="#contact">
              Start free trial
            </a>
          </header>

          <div className="hero-card">
            <HeroConstellation />

            <div className="hero-copy">
              <span className="eyebrow">AI-native cyber defense</span>
              <h1>Meet the intelligent shield for modern network defense.</h1>
              <p>
                NetShield AI turns live traffic into cinematic, actionable
                intelligence so teams can detect threats, simulate attacks and
                respond with clarity in real time.
              </p>

              <div className="hero-actions">
                <motion.a
                  className="button button-primary"
                  href="#contact"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                >
                  Talk to a Specialist
                </motion.a>
                <motion.a
                  className="button button-secondary"
                  href="#dashboard"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.985 }}
                >
                  See Live Dashboard
                </motion.a>
              </div>

              <div className="hero-metric-row">
                {metrics.map((metric, index) => (
                  <motion.div
                    className="hero-badge interactive-card"
                    key={metric.label}
                    whileHover={{ y: -8, rotateX: 4, rotateY: index % 2 === 0 ? -4 : 4 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span>{metric.label}</span>
                    <AnimatedNumber
                      className="hero-metric-value"
                      value={metric.value}
                      decimals={metric.decimals ?? 0}
                      suffix={metric.suffix ?? ""}
                    />
                    <em>{metric.delta}</em>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="hero-orbits" aria-hidden="true">
              <div className="hero-orbit orbit-a">
                <span className="orbit-node" />
                <span className="orbit-node" />
              </div>
              <div className="hero-orbit orbit-b">
                <span className="orbit-node" />
                <span className="orbit-node" />
              </div>
              <div className="hero-float chip-left">SOC visibility</div>
              <div className="hero-float chip-right">Threat correlation</div>
              <div className="hero-float chip-bottom">Automated mitigation</div>
            </div>
          </div>
        </section>

        <section className="services-section" id="services">
          <SectionHeading
            eyebrow="Our services"
            title="A premium command layer for every security workflow."
            copy="Borrowing the visual sharpness of the reference, this section frames the full product surface with grid cards, soft glows and restrained motion."
          />

          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article
                className="service-card interactive-card"
                key={service.title}
                {...inViewMotion(index * 0.05, 0.18)}
                whileHover={{ y: -10, borderColor: "rgba(134, 246, 196, 0.45)" }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="service-icon">
                  <Icon type={service.icon} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className="service-arrow">→</span>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="how-section" id="platform">
          <div className="how-copy">
            <SectionHeading
              eyebrow="How it works"
              title="Built like a layered defense system, not a pile of widgets."
              copy="The page keeps the same luxury cybersecurity tone from the reference while translating the PRD into a clear, sequential narrative."
            />

            <div className="process-list">
              {processSteps.map((step, index) => (
                <motion.article
                  className="process-step"
                  key={step.number}
                  {...inViewMotion(index * 0.06, 0.25, 24)}
                  whileHover={{ x: 8 }}
                >
                  <span className="step-index">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <Reveal className="device-scene" delay={0.12} y={24} blur={6} amount={0.25}>
            <div className="device-stack">
              <div className="device-layer layer-back" />
              <div className="device-layer layer-middle" />
              <div className="device-layer layer-front">
                <div className="device-screen">
                  <span className="hero-grid-line" />
                  <span className="hero-grid-line short" />
                  <span className="hero-grid-line" />
                  <div className="device-lock">
                    <span />
                  </div>
                </div>
              </div>
            </div>
            <div className="device-callout">
              <span>Visibility</span>
              <span>Detection</span>
              <span>Response</span>
            </div>
          </Reveal>
        </section>

        <section className="orbit-section" id="defense-stack">
          <Reveal className="orbit-visual" amount={0.25}>
            <div className="orbit-core">
              <span className="brand-mark core-mark" />
              <p>Trusted across security teams, campuses and startup infra.</p>
            </div>

            {orbitItems.map((item, index) => (
              <div
                className={`orbital-chip chip-${index + 1}`}
                key={item}
                style={{ "--chip-index": index }}
              >
                {item}
              </div>
            ))}
          </Reveal>

          <SectionHeading
            eyebrow="Shared confidence"
            title="Designed to feel credible before a single metric loads."
            copy="The orbit section mirrors the social-proof geometry of the reference with centered glow, floating badges and tight monochrome contrast."
          />
        </section>

        <section className="pillar-section" id="about">
          <SectionHeading
            eyebrow="Approach"
            title="Our approach to cyber defense"
            copy="NetShield AI balances elegant visibility with operational rigor. The visual language stays premium, while the content stays anchored in the intrusion-detection product brief."
            align="center"
          />

          <div className="pillar-grid">
            {pillars.map((pillar, index) => (
              <motion.article
                className={`pillar-card interactive-card ${pillar.tone} ${pillar.featured ? "featured" : ""}`}
                key={pillar.number}
                {...inViewMotion(index * 0.07, 0.2, 34)}
                whileHover={{ y: -12 }}
              >
                <span className="pillar-number">{pillar.number}</span>
                <h3>{pillar.title}</h3>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="dashboard-section" id="dashboard">
          <SectionHeading
            eyebrow="Monitoring dashboard"
            title="A dashboard preview inspired by the reference control room."
            copy="This section folds the second Dribbble shot into the landing flow with alert cards, an incident timeline and severity analytics."
          />

          <div className="dashboard-shell">
            <Reveal className="dashboard-rail" amount={0.35} y={18} blur={6}>
              <span className="rail-dot active" />
              <span className="rail-dot" />
              <span className="rail-dot" />
              <span className="rail-dot" />
              <span className="rail-divider" />
              <span className="rail-dot small" />
              <span className="rail-dot small" />
            </Reveal>

            <Reveal className="dashboard-main" delay={0.06} amount={0.2}>
              <div className="dashboard-topbar">
                <div className="search-shell">Search incidents, assets, reports</div>
                <div className="date-shell">Today, Mar. 28</div>
                <div className="profile-shell">Analyst Team</div>
              </div>

              <div className="stat-grid">
                {dashboardStats.map((stat, index) => (
                  <motion.article
                    key={stat.label}
                    className={`stat-card interactive-card ${stat.accent ? "accent" : ""}`}
                    {...inViewMotion(index * 0.05, 0.5, 24)}
                    whileHover={{ y: -8 }}
                  >
                    <span>{stat.label}</span>
                    <AnimatedNumber className="dashboard-metric-value" value={stat.value} />
                    <em>{stat.delta}</em>
                  </motion.article>
                ))}
              </div>

              <motion.section
                className="timeline-panel interactive-panel"
                {...inViewMotion(0.08, 0.25, 26)}
              >
                <div className="panel-title-row">
                  <h3>Incident timeline - Finance-DB-01</h3>
                  <span>Live orchestration</span>
                </div>

                <div className="timeline-track">
                  {incidentTimeline.map((item, index) => (
                    <motion.article
                      className={`timeline-point ${item.tone}`}
                      key={item.time}
                      {...inViewMotion(index * 0.06, 0.65, 18)}
                    >
                      <div className="timeline-label">{item.label}</div>
                      <div className="timeline-stem" />
                      <div className="timeline-node" />
                      <div className="timeline-time">{item.time}</div>
                    </motion.article>
                  ))}
                </div>
              </motion.section>

              <div className="chart-row">
                <motion.section
                  className="chart-panel interactive-panel"
                  {...inViewMotion(0.1, 0.25, 24)}
                >
                  <div className="panel-title-row">
                    <h3>Total vulnerability</h3>
                    <span>Hourly trend</span>
                  </div>

                  <motion.svg viewBox="0 0 540 240" className="line-chart" aria-hidden="true">
                    <motion.polyline
                      points="20,170 80,164 140,166 200,112 260,142 320,146 380,96 440,108 500,150"
                      className="line-chart-secondary"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 1.4, delay: 0.2, ease: "easeOut" }}
                    />
                    <motion.polyline
                      points="20,134 80,126 140,128 200,88 260,84 320,114 380,70 440,80 500,134"
                      className="line-chart-primary"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.65 }}
                      transition={{ duration: 1.55, delay: 0.32, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx="200"
                      cy="88"
                      r="7"
                      className="line-point"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.45, delay: 1 }}
                    />
                    <motion.circle
                      cx="380"
                      cy="70"
                      r="7"
                      className="line-point accent"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ duration: 0.45, delay: 1.18 }}
                    />
                  </motion.svg>
                </motion.section>

                <motion.section
                  className="chart-panel severity-panel interactive-panel"
                  {...inViewMotion(0.16, 0.25, 24)}
                >
                  <div className="panel-title-row">
                    <h3>Current threats by severity level</h3>
                    <span>Last 6 months</span>
                  </div>

                  <div className="severity-grid">
                    <div className="bar-group">
                      {threatColumns.map((item, index) => (
                        <div className="bar-column" key={item.label}>
                          <motion.span
                            className={item.accent ? "bar accent" : "bar"}
                            initial={{ scaleY: 0.05, opacity: 0.4 }}
                            whileInView={{ scaleY: 1, opacity: 1 }}
                            viewport={{ once: true, amount: 0.8 }}
                            transition={{
                              duration: 0.9,
                              delay: 0.18 + index * 0.08,
                              ease: [0.22, 1, 0.36, 1]
                            }}
                            style={{ height: `${item.value}%` }}
                          />
                          <small>{item.label}</small>
                        </div>
                      ))}
                    </div>

                    <div className="severity-tiles">
                      {severityTiles.map((tile, index) => (
                        <motion.div
                          className="severity-tile interactive-card"
                          key={tile}
                          {...inViewMotion(0.28 + index * 0.05, 0.6, 16)}
                          whileHover={{ y: -6, scale: 1.02 }}
                        >
                          {tile}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.section>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="report-section" id="resources">
          <Reveal className="report-card" amount={0.25}>
            <SectionHeading
              eyebrow="Threat report"
              title="Executive-ready summaries without losing operator depth."
              copy="The report section keeps the visual language sharp: deep black panels, neon restraint, and layered copy blocks shaped for founders, CTOs and analysts."
            />

            <div className="report-grid">
              {reportMetrics.map((item, index) => (
                <motion.div
                  className="report-metric interactive-card"
                  key={item.label}
                  {...inViewMotion(index * 0.08, 0.35, 18)}
                  whileHover={{ y: -6 }}
                >
                  <span>{item.label}</span>
                  <AnimatedNumber
                    className="report-metric-value"
                    value={item.value}
                    decimals={item.decimals}
                    suffix={item.suffix}
                  />
                  <div className="progress-track">
                    <motion.span
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true, amount: 0.95 }}
                      transition={{
                        duration: 1,
                        delay: 0.3 + index * 0.1,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      style={{ width: item.width }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal className="faq-card" delay={0.08} amount={0.25}>
            <SectionHeading
              eyebrow="Key questions"
              title="Positioning the experience around clarity, not noise."
              copy="These content blocks mirror the reference rhythm: quiet headlines, strong borders, and compact knowledge modules."
            />

            <div className="faq-list">
              {faqs.map((faq, index) => (
                <motion.article
                  className="faq-item interactive-card"
                  key={faq.question}
                  {...inViewMotion(index * 0.07, 0.35, 16)}
                  whileHover={{ y: -6 }}
                >
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </motion.article>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="cta-section" id="contact">
          <Reveal className="cta-card" amount={0.35}>
            <span className="eyebrow">Start now</span>
            <h2>Stay Secure. Stay Ahead.</h2>
            <p>
              NetShield AI gives teams a cinematic front door to real-time
              security monitoring without abandoning the seriousness of the
              product underneath.
            </p>

            <div className="hero-actions">
              <motion.a
                className="button button-primary"
                href="mailto:hello@netshield.ai"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
              >
                Book a Demo
              </motion.a>
              <motion.a
                className="button button-secondary"
                href="#top"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
              >
                Back to Top
              </motion.a>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}

export default App;
