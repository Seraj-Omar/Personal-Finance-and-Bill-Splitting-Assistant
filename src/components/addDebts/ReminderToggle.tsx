import { IconBellRingingFilled } from "@tabler/icons-react";
type Props = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
};

export default function ReminderToggle({ enabled, setEnabled }: Props) {
  return (
    <>
 
    <div className="flex items-center justify-between bg-[#FBEAEB] rounded-2xl p-4">
        
      <div className="flex items-start gap-3">
 
  <div className="w-10 h-10 flex items-center justify-center  rounded-full bg-white">
    <IconBellRingingFilled size={18} fill="#3447AA" className="p-0 h-6 w-6" />
  </div>


  <div>
    <h4 className=" text-sm">Reminder</h4>
    <p className="text-sm text-[#AEAEAE]">Get notified before due date</p>
  </div>
</div>

      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-13 h-8 rounded-full transition ${
          enabled ? "bg-[#3447AA]" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-5 h-5 bg-white rounded-full transition ${
            enabled ? "translate-x-6.5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
    </>
  );
}
