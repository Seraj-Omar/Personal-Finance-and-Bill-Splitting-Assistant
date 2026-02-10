type Avatar =
  | {
      type: "img";
      src: string;
      alt: string;
      scale?: number;
      pos?: string; // object-position
    }
  | { type: "txt"; text: string; bg: string };

export default function AboutUsSection() {
  const avatarsTopRow: Avatar[] = [
    { type: "img", src: "/images/first.jpg", alt: "avatar" },
    { type: "img", src: "/images/second.jpg", alt: "avatar", scale: 1.0, pos: "100% 20%" },
    { type: "img", src: "/images/third.jpg", alt: "avatar", scale: 1.0, pos: "50% 50%" },
    { type: "img", src: "/images/four.jpg", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "img", src: "/images/five.jpg", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "txt", text: "R", bg: "#233759" },
    { type: "txt", text: "FJ", bg: "#3447AA" },
    { type: "img", src: "/images/six.jpg", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "txt", text: "S", bg: "#233759" },
  ];

  const avatarsBottomRow: Avatar[] = [
    { type: "img", src: "/images/saven.png", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "img", src: "/images/eaigh.png", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "img", src: "/images/nine.png", alt: "avatar", scale: 1.7, pos: "50% -190%" },
    { type: "txt", text: "JJ", bg: "#3447AA" },
    { type: "img", src: "/images/ten.png", alt: "avatar", pos: "50% 15%", scale: 1.15 },
    { type: "txt", text: "QV", bg: "#3447AA" },
    { type: "img", src: "/images/eleven.png", alt: "avatar", pos: "50% 15%", scale: 1.0 },
    { type: "img", src: "/images/twelv.png", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "img", src: "/images/thirty.png", alt: "avatar", scale: 1.0, pos: "80% 20%" },
    { type: "txt", text: "IU", bg: "#233759" },
  ];

  const topRowLefts = [0, 14.82, 48.47, 63.29, 78.1, 92.91, 126.57, 141.38, 156.19];
  const bottomRowLefts = [0, 14.81, 29.63, 44.44, 78.1, 92.91, 126.57, 141.38, 175.72, 189.86];

  const DOT_W = 18.1776;
  const DOT_H = 16.3367;

  return (
    <section
      className="w-full 
        -mt-[120px] 
        lg:-mt-[170px] 
        md:-mt-[60px] 
        sm:-mt-[40px]
      "
    >
      <div className="w-full flex justify-center">
        <div className="w-full max-w-[1280px] px-4 sm:px-6 lg:px-0">
          <div className="relative w-full h-auto lg:h-[385px]">
            {/* ===== LEFT IMAGE ===== */}
            <div
              className="
                rounded-[10px] overflow-hidden
                w-full max-w-[333.806px] h-[378px]
                mx-auto
                lg:mx-0
                lg:absolute
              "
              style={{
                left: "0px",
                top: "0px",
              }}
            >
              <img src="/images/about-man.png" alt="About man" className="w-full h-full object-cover" />
            </div>

            {/* ===== WHITE STATS COLUMN ===== */}
            <div
              className="
                mt-6
                flex flex-col gap-5
                w-full items-center
                lg:items-start
                lg:mt-0
                lg:absolute
              "
              style={{
                left: "445.81px",
                top: "0px",
                width: "265.9321px",
              }}
            >
              {/* ===== WHITE STATS CARD ===== */}
              <div
                className="relative bg-white rounded-[10px] w-full"
                style={{
                  maxWidth: "265.9321px",
                  height: "252px",
                  boxShadow: "90px 85px 100px rgba(0,0,0,0.06)",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    left: "24.48px",
                    top: "45px",
                    fontFamily: "Gilroy-Bold, sans-serif",
                    fontWeight: 700,
                    fontSize: "26px",
                    lineHeight: "26px",
                    letterSpacing: "0.01em",
                    color: "#000339",
                  }}
                >
                  30,000+
                </div>

                <div className="absolute" style={{ left: "212.52px", top: "49px" }}>
                  <svg width="30" height="19" viewBox="0 0 30 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1 17.0342L11.7719 7.35316L16.8213 11.8911L28.9397 1M28.9397 1V7.6557M28.9397 1H21.534"
                      stroke="#50D28A"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p
                  className="absolute"
                  style={{
                    left: "24.48px",
                    top: "81px",
                    width: "220.312px",
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "12px",
                    lineHeight: "12px",
                    color: "#97918B",
                    margin: 0,
                  }}
                >
                  Users in July 2027 with 5 star ratings <br />
                  and happy clients.
                </p>

                <div
                  className="absolute"
                  style={{
                    left: "24.68px",
                    top: "135.51px",
                    width: "215.4387px",
                    height: "1.2px",
                    background: "#233759",
                  }}
                />

                {/* ✅ TOP avatars */}
                <div
                  className="absolute"
                  style={{
                    left: "23.56px",
                    top: "162.5px",
                    width: "208.7068px",
                    height: `${DOT_H}px`,
                  }}
                >
                  {avatarsTopRow.map((a, idx) => {
                    const zIndex =
                      a.type === "txt" && a.text === "FJ"
                        ? 999
                        : (a.type === "img" ? 200 : 50) + (avatarsTopRow.length - idx);

                    return (
                      <div
                        key={`top-${idx}`}
                        className="absolute rounded-full overflow-hidden flex items-center justify-center text-white"
                        style={{
                          left: `${topRowLefts[idx] ?? idx * 14.82}px`,
                          top: "0px",
                          width: `${DOT_W}px`,
                          height: `${DOT_H}px`,
                          boxShadow: "4px 4px 16px rgba(0,0,0,0.10)",
                          background: a.type === "txt" ? a.bg : "transparent",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                          fontSize: "7.26px",
                          lineHeight: "11px",
                          letterSpacing: "-0.02em",
                          zIndex,
                        }}
                      >
                        {a.type === "img" ? (
                          <img
                            src={a.src}
                            alt={a.alt}
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "block",
                              objectFit: "cover",
                              objectPosition: a.pos ?? "50% 50%",
                              transform: `scale(${a.scale ?? 1})`,
                              transformOrigin: "center",
                            }}
                          />
                        ) : (
                          a.text
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* ✅ BOTTOM avatars */}
                <div
                  className="absolute"
                  style={{
                    left: "24.23px",
                    top: "195.17px",
                    width: "208.036px",
                    height: `${DOT_H}px`,
                  }}
                >
                  {avatarsBottomRow.map((a, idx) => {
                    const zIndex = (a.type === "img" ? 200 : 50) + (avatarsBottomRow.length - idx);

                    return (
                      <div
                        key={`bot-${idx}`}
                        className="absolute rounded-full overflow-hidden flex items-center justify-center text-white"
                        style={{
                          left: `${bottomRowLefts[idx] ?? idx * 14.81}px`,
                          top: "0px",
                          width: `${DOT_W}px`,
                          height: `${DOT_H}px`,
                          boxShadow: "4px 4px 16px rgba(0,0,0,0.10)",
                          background: a.type === "txt" ? a.bg : "transparent",
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 500,
                          fontSize: "7.26px",
                          lineHeight: "11px",
                          letterSpacing: "-0.02em",
                          zIndex,
                        }}
                      >
                        {a.type === "img" ? (
                          <img
                            src={a.src}
                            alt={a.alt}
                            style={{
                              width: "100%",
                              height: "100%",
                              display: "block",
                              objectFit: "cover",
                              objectPosition: a.pos ?? "50% 50%",
                              transform: `scale(${a.scale ?? 1})`,
                              transformOrigin: "center",
                            }}
                          />
                        ) : (
                          a.text
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ===== BEST RATINGS CARD ===== */}
              <div
                className="relative bg-white rounded-[10px] w-full"
                style={{
                  maxWidth: "188.0441px",
                  height: "113px",
                  borderRadius: "10px",
                  boxShadow: "0px 17px 42px rgba(243,199,201,0.10)",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "23.37px",
                    top: "14px",
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "14px",
                    letterSpacing: "-0.01em",
                    color: "#1C1A1A",
                  }}
                >
                  Best ratings
                </div>

                <div
                  style={{
                    position: "absolute",
                    left: "25.59px",
                    top: "43px",
                    width: "90.1276px",
                    height: "6px",
                    background: "#F0F0F0",
                    borderRadius: "10px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: "25.59px",
                    top: "56px",
                    width: "68.9866px",
                    height: "6px",
                    background: "#F0F0F0",
                    borderRadius: "10px",
                  }}
                />

                <span style={{ position: "absolute", left: "23.37px", top: "76px", fontSize: "21px", lineHeight: "21px" }}>😡</span>
                <span style={{ position: "absolute", left: "51.4px", top: "76px", fontSize: "21px", lineHeight: "21px" }}>😟</span>
                <span style={{ position: "absolute", left: "79.44px", top: "76px", fontSize: "21px", lineHeight: "21px" }}>😑</span>
                <span style={{ position: "absolute", left: "107.48px", top: "76px", fontSize: "21px", lineHeight: "21px" }}>😜</span>

                <span
                  style={{
                    position: "absolute",
                    left: "139.09px",
                    top: "68px",
                    fontSize: "33px",
                    lineHeight: "33px",
                    textShadow: "0px 8px 20px rgba(0,0,0,0.12)",
                  }}
                >
                  😁
                </span>
              </div>
            </div>

            {/* ✅✅ RIGHT CONTENT (التعديل الوحيد هون) */}
            <div
              className="
                mt-8
                w-full
                flex flex-col
                gap-8
                lg:mt-0
                lg:absolute
                lg:left-[823.74px]
                lg:top-[30px]
                lg:w-[456px]
                lg:h-[333px]
                lg:gap-[96px]
              "
            >
              <div className="w-full flex flex-col gap-4">
                <h2
                  style={{
                    margin: 0,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 500,
                    fontSize: "24px",
                    lineHeight: "65px",
                    letterSpacing: "0px",
                    color: "#10111A",
                    textTransform: "none",
                  }}
                >
                  About Us
                </h2>

                <p
                  style={{
                    margin: 0,
                    fontFamily: "Roboto, sans-serif",
                    fontWeight: 400,
                    fontSize: "18px",
                    lineHeight: "29px",
                    letterSpacing: "0px",
                    color: "#97918B",
                  }}
                >
                  We are a smart financial management platform designed to simplify budgeting, bill tracking, and shared expenses using modern technology and AI.
                </p>
              </div>

              <button
                className="w-full lg:w-[456px]"
                style={{
                  height: "65px",
                  borderRadius: "8px",
                  background: "#3447AA",
                  color: "#FFFFFF",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "Roboto, sans-serif",
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "14px",
                  letterSpacing: "0",
                  textTransform: "none",
                }}
              >
                Download App
              </button>
            </div>

            <div className="h-10 lg:hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}