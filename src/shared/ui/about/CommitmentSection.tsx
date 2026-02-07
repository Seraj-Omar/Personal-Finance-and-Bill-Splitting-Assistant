export default function CommitmentSection() {
  const rows = [
    {
      title: "Ethics",
      desc:
        "We are committed to ethical practices in all aspects of our work. We value honesty, transparency, and respect for our users’ data and privacy.\nOur application is designed to handle financial information responsibly, ensuring fairness, security, and trust in every interaction.",
      rowH: 128,
      titleW: 320,
      descW: 856,
    },
    {
      title: "Quality",
      desc:
        "We prioritize quality in every aspect of our application. From accurate data processing to a clean and intuitive interface, we ensure that every feature is designed to deliver reliable and consistent performance.",
      rowH: 96,
      titleW: 320,
      descW: 856,
    },
    {
      title: "Continuity",
      desc:
        "We are committed to continuous improvement and long-term support. Our goal is to ensure that the application evolves with users’ needs through regular updates, feature enhancements, and performance optimization.",
      rowH: 96,
      titleW: 320,
      descW: 856,
    },
  ];

  return (
    <section className="w-full flex justify-center px-4 lg:px-0">
      <div
        className="w-full"
        style={{
          maxWidth: "1280px",
          // ✅ height auto للموبايل
          height: "auto",
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          boxSizing: "border-box",
        }}
      >
        {/* ===== Header ===== */}
        <div
          style={{
            width: "100%",
            maxWidth: "887px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {/* ===== Title ===== */}
          <div
            style={{
              width: "auto",
              height: "55px",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "88px",
              letterSpacing: "0%",
              display: "flex",
              alignItems: "center",
              marginBottom: "6px",
              flexWrap: "nowrap",
            }}
          >
            <span style={{ color: "#1C1A1A" }}>Our</span>
            <span style={{ width: "6px" }} />
            <span
              style={{
                background: "linear-gradient(90deg, #3447AA 0%, #0079FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Commitment
            </span>
          </div>

          {/* ===== Underline ===== */}
          <div
            style={{
              width: "200px",
              height: "4px",
              borderRadius: "16px",
              background:
                "linear-gradient(90.01deg, #EFA5B6 44.3%, rgba(52, 71, 170, 0.65) 99.99%)",
            }}
          />
        </div>

        {/* ===== Content Rows ===== */}
        <div
          style={{
            width: "100%",
            maxWidth: "1232px",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {rows.map((r, idx) => (
            <div
              key={idx}
              className="flex flex-col lg:flex-row"
              style={{
                width: "100%",
                maxWidth: "1232px",
                height: "auto",
                display: "flex",
                gap: "56px",
                alignItems: "flex-start",
              }}
            >
              {/* Left title */}
              <div
                style={{
                  width: "100%",
                  maxWidth: `${r.titleW}px`,
                  height: "32px",
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 600,
                  fontSize: "24px",
                  lineHeight: "32px",
                  letterSpacing: "0%",
                  color: "#1C1A1A",
                }}
              >
                {r.title}
              </div>

              {/* Right description */}
              <div
                style={{
                  width: "100%",
                  maxWidth: `${r.descW}px`,
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 400,
                  fontSize: "20px",
                  lineHeight: "32px",
                  letterSpacing: "0%",
                  color: "#858484",
                  whiteSpace: "pre-line",
                }}
              >
                {r.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}