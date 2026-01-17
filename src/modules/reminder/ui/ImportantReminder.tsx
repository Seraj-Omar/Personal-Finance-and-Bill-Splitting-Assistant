import Line from "@/src/components/Line"
import Image from "next/image"

const ImportantReminder = () => {
  return (
    <section
  className="py-20 mt-15"
  style={{
    background:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.41), rgba(255, 255, 255, 0.41)), linear-gradient(109.96deg, rgba(255, 255, 255, 0.2) 38.88%, rgba(255, 255, 255, 0.2) 97.14%), radial-gradient(19.21% 36.04% at 23.28% 40.12%, #FFFFFF 0%, rgba(101, 108, 252, 0.49) 0%, rgba(246, 227, 231, 0.64) 100%)",
    borderRadius: "16px",
    padding: "24px",
  }}
>
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col lg:flex-row items-center gap-12">

          {/* LEFT – Image */}
          <div className="flex-shrink-0">
            <div className="relative overflow-hidden rounded-2xl">
              <Image
                src="/money.jpg"
                alt="Important Reminder"
                width={420}
                height={420}
                className="object-cover"
              />
            </div>
          </div>

          {/* RIGHT – Content */}
          <div className="max-w-xl">
            <span className="text-sm text-gray-500 inline-block mb-2 relative">
              Why is this reminder important?
          <Line /> 
            </span>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Smart Reminders That Keep You in Control
            </h2>

            <p className="text-gray-600 mb-6 leading-relaxed">
              Trackly helps you stay ahead of every payment and commitment with an intelligent
              reminder system designed to reduce stress and eliminate missed deadlines.
            </p>

            <ul className="space-y-4">
              {[
                "No missed payments",
                "Smart notifications",
                "Flexible scheduling",
                "Group-friendly reminders",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="w-5 h-5 rounded-full main-bg-color  text-white flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ImportantReminder
