import BillsList from "./BillsList"

const ReminderPage = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 image-soft-bg  mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT – Bills */}
        <div className="space-y-4">
          <BillsList />

          {/* Create new reminder button */}
          <button className="w-full mt-4 flex items-center justify-center gap-2 main-bg-color text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition">
            <span className="text-xl">+</span>
            Create new Reminder
          </button>
        </div>

        {/* RIGHT – Image */}
 <div className="hidden flex lg:items-end lg:justify-end">
  <div className="relative rounded-2xl overflow-hidden main-bg-color/50">
    {/* الصورة */}
    <img
      src="/reminder-img.png"
      alt="Reminder Illustration"
      className="relative z-10 w-full max-w-md object-cover"
    />
  </div>
</div>


      </div>
    </section>
  )
}

export default ReminderPage
