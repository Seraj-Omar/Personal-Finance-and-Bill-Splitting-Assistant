import Image from "next/image"

export default function AddReminderPage() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        {/* LEFT HERO */}
     <div className="relative rounded-2xl overflow-hidden text-white min-h-[620px] flex flex-col justify-between p-10">

  <Image
    src="/add-reminder.jpg"
    alt="Hero Background"
    fill
    className="object-cover"
    priority
  />

  <div className="absolute inset-0  main-bg-color  opacity-80" />

  <div className="relative z-10 mt-5" >
    <p className="text-sm opacity-90 mb-6">Trackly</p>

    <h2 className="text-4xl font-bold leading-snug">
      Smart management of <br /> your debts in one place.
    </h2>

    <p className="mt-4 text-sm opacity-90 max-w-md leading-relaxed">
      A professional tool for documenting your rights and obligations.
      Record, schedule, and track collections with ease.
    </p>

    {/* Checklist */}
    <ul className="mt-8 space-y-4 text-sm">
      {[
        "Smart and automatic reminders.",
        "Comprehensive organization of all funds.",
        "Complete privacy for your data.",
        "Simple financial reports.",
      ].map((item, i) => (
        <li key={i} className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
            ✓
          </span>
          <span className="opacity-95">{item}</span>
        </li>
      ))}
    </ul>
  </div>
</div>


        {/* RIGHT FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100">
          <form className="space-y-5">
            {/* Reminder Title */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Reminder Title
              </label>
              <input
                type="text"
                placeholder="Enter Reminder Title"
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:main-bg-color"
              />
            </div>

            {/* Related Bill */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Related Bill/Debt
              </label>
              <select className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500">
                <option>Rent Payment</option>
                <option>Electricity</option>
                <option>Water</option>
                <option>Internet</option>
              </select>
            </div>

            {/* Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Description <span className="text-gray-400">(Optional)</span>
              </label>
              <textarea
                placeholder="Add short note about this debt..."
                rows={3}
                className="mt-2 w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">
                Add Image <span className="text-gray-400">(Optional)</span>
              </label>

              <div className="mt-2 border border-dashed border-gray-200 rounded-xl p-6 text-center">
                <p className="text-sm font-medium text-gray-700">
                  Upload Subject Image
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 5MB
                </p>

                <input type="file" className="mt-3 text-sm" />
              </div>
            </div>

            {/* Recurring */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Notification Frequency
              </p>

              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-600">
                {["On time", "Weekly", "Monthly", "Yearly"].map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input type="radio" name="freq" className="accent-blue-600" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                className="flex-1 main-bg-color hover:bg-blue-800 text-white py-3 rounded-xl font-medium transition"
              >
                Save Debt
              </button>

              <button
                type="button"
                className="flex-1 border border-gray-200 hover:bg-gray-50 py-3 rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
