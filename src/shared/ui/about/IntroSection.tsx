export default function IntroSection() {

  const IMG_MAX_W = 1040;
  const IMG_HEIGHT = 385;
  const IMG_OVERLAP = 225;


  const IMG_Y = -30;


  const IMG_SKEW_DEG = -6;


  const RESPONSIVE_IMG_H = "clamp(240px, 38vw, 385px)";        
  const RESPONSIVE_OVERLAP = "clamp(120px, 18vw, 225px)";      
  const RESPONSIVE_MAX_W = `min(100%, ${IMG_MAX_W}px)`;        

  return (
    <section className="w-full">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20">
        {/* ===== Title ===== */}
        <div className="w-full flex flex-col gap-2">
          <h3
            className="m-0"
            style={{
              fontFamily: "Roboto, sans-serif",
              fontWeight: 600,
              fontSize: "clamp(18px, 2.2vw, 24px)", 
              lineHeight: "clamp(30px, 3.4vw, 42px)",
              background: "linear-gradient(90.04deg, #3447AA 7.34%, #EFA5B6 32.61%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            We&apos;re Here To Manage Your Money
          </h3>

          <div
            style={{
              width: "min(306px, 85vw)",
              height: "4px",
              borderRadius: "16px",
              background:
                "linear-gradient(90.01deg, #EFA5B6 44.3%, rgba(52, 71, 170, 0.65) 99.99%)",
            }}
          />
        </div>

        {/* ===== Card + Image ===== */}
        <div className="mt-6 lg:mt-8 relative w-full">
          {/* ===== Top Card ===== */}
          <div className="relative w-full">
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1280 402"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <clipPath id="introCardClip">
                  <path d="M41.8855 400.291C19.0343 401.223 0 382.95 0 360.08V40.2448C0 18.0182 18.0182 0 40.2448 0H1239.76C1261.98 0 1280 18.0182 1280 40.2448V311.137C1280 332.725 1262.97 350.468 1241.4 351.348L41.8855 400.291Z" />
                </clipPath>


                <linearGradient
                  id="cardGradFigma"
                  x1="0"
                  y1="402"
                  x2="520"
                  y2="0"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="-0.0276" stopColor="#EFA5B6" />
                  <stop offset="0.2896" stopColor="#3447AA" />
                  <stop offset="1" stopColor="#3447AA" />
                </linearGradient>


                <radialGradient
                  id="cardPinkCorner"
                  cx="0"
                  cy="0"
                  r="1"
                  gradientUnits="userSpaceOnUse"
                  gradientTransform="translate(165 395) rotate(-10) scale(520 240)"
                >
                  <stop offset="0" stopColor="rgba(239,165,182,0.75)" />
                  <stop offset="0.55" stopColor="rgba(239,165,182,0.18)" />
                  <stop offset="1" stopColor="rgba(239,165,182,0)" />
                </radialGradient>
              </defs>

              <g clipPath="url(#introCardClip)">
                <rect x="0" y="0" width="1280" height="402" fill="url(#cardGradFigma)" />
                <rect x="0" y="0" width="1280" height="402" fill="url(#cardPinkCorner)" />
              </g>
            </svg>

            <div
              className="relative z-10 px-4 sm:px-8 lg:px-[77px] pt-8 lg:pt-[32px] pb-40 sm:pb-52 lg:pb-[210px]"
              style={{ minHeight: "402px" }}
            >
              <p
                style={{
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "clamp(16px, 2vw, 24px)", 
                  lineHeight: "clamp(28px, 3.2vw, 48px)", 
                  color: "#fff",
                  margin: 0,
                }}
              >
                ConsultUs provides consulting services that help business owners and leaders build a more valuable business.
                We worked with their founder to build a professional, modern site that follows the StoryBrand framework to
                clearly communicates the value it adds to potential clients
              </p>
            </div>
          </div>

          {/* ===== Image ===== */}
          <div
            className="relative z-20 flex justify-center"
            style={{ marginTop: `calc(-1 * ${RESPONSIVE_OVERLAP})` }} 
          >
            <div
              className="w-full rounded-[32.49px] overflow-hidden"
              style={{
                maxWidth: RESPONSIVE_MAX_W,             
                height: RESPONSIVE_IMG_H,               
                boxShadow:
                  "40.61px 154.32px 162.44px rgba(38,38,38,0.07), 40.61px 52.35px 67.86px rgba(38,38,38,0.05)",
              }}
            >
              <svg viewBox="0 0 1280 401" preserveAspectRatio="none" width="100%" height="100%">
                <defs>
                  <clipPath id="imgClip">
                    <path
                      d="M41.8855 400.291C19.0343 401.223 0 382.95 0 360.08V40.2448C0 18.0182 18.0182 0 40.2448 0H1239.76C1261.98 0 1280 18.0182 1280 40.2448V311.137C1280 332.725 1262.97 350.468 1241.4 351.348L41.8855 400.291Z"
                      transform="translate(1280 401) scale(-1 -1)"
                    />
                  </clipPath>

                  <linearGradient id="imgOverlayGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0.77" stopColor="rgba(52,71,170,0.05)" />
                    <stop offset="1" stopColor="rgba(239,165,182,0.5)" />
                  </linearGradient>
                </defs>

                <g clipPath="url(#imgClip)">
                  <foreignObject x="0" y="-90" width="1280" height="520">
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage:
                          "linear-gradient(35deg, rgba(52,71,170,0.05) 77.17%, rgba(239,165,182,0.5) 100%), url('/images/intro-image.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "58% 25%",
                      }}
                    />
                  </foreignObject>

                  <rect width="1280" height="401" fill="url(#imgOverlayGrad)" />
                </g>
              </svg>
            </div>
          </div>

          <div className="h-12 sm:h-16 lg:h-24" />
        </div>
      </div>
    </section>
  );
}