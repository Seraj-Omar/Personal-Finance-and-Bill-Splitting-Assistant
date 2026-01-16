"use client"
import BillsList from "./BillsList"
import Image from "next/image"
import ImportantReminder from "./ImportantReminder"
import { useRouter } from "next/navigation"

const ReminderPage = () => {
    const router = useRouter()
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 ">

  <section className="bg-[#fff7f7] mt-10 p-13 ">
  <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* LEFT – Bills */}
    <div className="flex-1 space-y-4">
          <BillsList />
               <BillsList />
                    <BillsList />
       <BillsList />
          {/* Create new reminder button */}
          <button  onClick={() => router.push("/reminder/new")} className="w-full mt-4 flex items-center justify-center gap-2 main-bg-color text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition">
            <span className="text-xl">+</span>
            Create new Reminder
          </button>
        </div>

        {/* RIGHT – Image */}
 <div className="hidden lg:flex lg:items-end lg:justify-end">
  <div className="relative rounded-2xl overflow-hidden main-bg-color/50">

<Image
  src="/reminder-img.png"
  alt="Reminder Illustration"
  width={400}
  height={400}
/>
    <div className="absolute inset-0 main-bg-color opacity-50"></div>

  </div>
</div>

      </div>

    </section>
      <ImportantReminder />
    </div>
  )
}

export default ReminderPage
