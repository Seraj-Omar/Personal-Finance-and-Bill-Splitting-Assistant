export default function MissionSection() {
  const rows = [
    {
      title: "Unmatched service",
      desc:
        "We are dedicated to delivering an unmatched level of service by focusing on user needs, responsiveness, and simplicity. Every feature is designed to provide maximum value with minimal effort.",
      rowH: 99,
      titleW: 320,
      descW: 807,
    },
    {
      title: "Specific",
      desc:
        "We focus on providing clear and purpose-driven features that address real financial needs. Every tool in the application is designed with a specific goal in mind, ensuring clarity, accuracy, and efficiency.",
      rowH: 96,
      titleW: 320,
      descW: 854,
    },
    {
      title: "Experience",
      desc:
        "We focus on delivering a smooth and intuitive user experience that makes financial management simple and enjoyable. Every interaction is carefully designed to be clear, efficient, and user-friendly.",
      rowH: 96,
      titleW: 320,
      descW: 854,
    },
    {
      title: "Technology",
      desc:
        "We leverage modern technology and AI-driven solutions to simplify financial management. Our platform uses intelligent systems to automate processes, reduce errors, and enhance accuracy.",
      rowH: 64,
      titleW: 320,
      descW: 854,
      titleFontFamily: "Inter, sans-serif",
    },
  ];

  return (
    <section className="w-full flex justify-center -mt-[80px] px-4 lg:px-0">
      <div
        className="w-full"
        style={{
          maxWidth: "1278px",

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
            height: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "auto",
              height: "auto",
              fontFamily: "Roboto, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              lineHeight: "88px",
              letterSpacing: "0%",
              display: "flex",
              gap: "6px",
              alignItems: "center",
              flexWrap: "nowrap",
            }}
          >
            <span style={{ color: "#1C1A1A" }}>Our</span>
            <span
              style={{
                background: "linear-gradient(90deg, #3447AA 0%, #0079FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mission
            </span>
          </div>

          <div
            style={{
              width: "142px",
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

            maxWidth: "1230px",
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
                maxWidth: "1230px",
                height: "auto",
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
                  fontFamily: r.titleFontFamily ?? "Roboto, sans-serif",
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