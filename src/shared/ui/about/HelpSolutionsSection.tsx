export default function HelpSolutionsSection() {
  return (
    <section
      className="
        w-full flex justify-center
        py-20
        -mt-10
        md:-mt-16
        lg:-mt-24
      "
    >
      {/* ===== Main Card ===== */}
      <div
        className="
          relative flex flex-col lg:flex-row
          p-6 rounded-[16px]
          w-full max-w-[1278px]
          gap-6 lg:gap-[12px]
        "
        style={{
          background:
            "radial-gradient(44.23% 123.38% at 37.32% 37.62%, #FFFFFF 0%, rgba(101, 108, 252, 0.19) 37.98%, rgba(239, 165, 182, 0.14) 95.67%)",
        }}
      >
        {/* ===== LEFT IMAGE ===== */}
        <div
          className="
            relative rounded-[16px] overflow-hidden
            w-full lg:w-[627px]
            h-[280px] sm:h-[340px] md:h-[420px] lg:h-[485px]
            flex-shrink-0
          "
        >
          <img
            src="/images/help.jpg"
            alt="Helping people"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* ✅ الشعاع الزهري (أقوى + ممتد لليمين أكثر) */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(348.25deg, rgba(239,165,182,0.65) -12%, rgba(239,165,182,0.25) 12%, rgba(239,165,182,0) 42%)",
            }}
          />

          {/* ✅ شعاع إضافي من اليمين لتقويته */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(75% 70% at 80% 75%, rgba(239,165,182,0.28) 0%, rgba(239,165,182,0) 62%)",
            }}
          />

          {/* ✅ نعومة إضافية */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 60% at 22% 85%, rgba(239,165,182,0.18) 0%, rgba(239,165,182,0) 70%)",
            }}
          />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="flex items-center justify-center rounded-full bg-white shadow-lg"
              style={{ width: "97px", height: "97px" }}
            >
              <div
                style={{
                  width: "0",
                  height: "0",
                  borderLeft: "14px solid black",
                  borderTop: "10px solid transparent",
                  borderBottom: "10px solid transparent",
                  marginLeft: "6px",
                }}
              />
            </div>
          </div>
        </div>

        {/* ===== RIGHT CONTENT ===== */}
        <div
          className="
            flex flex-col justify-center
            gap-6
            w-full lg:w-[380px]
            lg:pl-[8px]
          "
        >
          {/* Title */}
          <h3
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "42px",
              color: "#1C1A1A",
              margin: 0,
            }}
          >
            We Help To Get Solutions
          </h3>

          {/* Item 1 */}
          <div className="flex items-start gap-3">
            <img src="/images/check1.svg" alt="" className="w-6 h-6 mt-1" />
            <p
              className="whitespace-normal md:whitespace-nowrap"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "117%",
                color: "#1C1A1A",
                margin: 0,
              }}
            >
              Helping You Find Smart Financial Solutions.
            </p>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3" style={{ marginTop: "-8px" }}>
            <img src="/images/check2.svg" alt="" className="w-6 h-6 mt-1" />
            <p
              className="whitespace-normal md:whitespace-nowrap"
              style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "117%",
                color: "#1C1A1A",
                margin: 0,
              }}
            >
              We Help You Get the Right Solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}