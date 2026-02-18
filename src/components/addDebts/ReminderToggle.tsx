import { IconBellRingingFilled } from "@tabler/icons-react";
type Props = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  onChange?: (e: any) => void;
};

export default function ReminderToggle({ enabled, setEnabled, onChange }: Props) {
  return (
    <>
 
    <div className="flex items-center justify-between bg-[#FBEAEB] rounded-2xl p-4">
        
      <div className="flex items-start gap-3">
 
  <div className="w-10 h-10 flex items-center justify-center  rounded-full bg-white">
    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.5 9.06828C17.04 9.06828 16.6667 8.69508 16.6667 8.235C16.6667 5.8975 15.7567 3.70086 14.1041 2.04742C13.7784 1.72164 13.7784 1.19508 14.1041 0.869141C14.4299 0.543359 14.9567 0.543359 15.2824 0.869141C17.2501 2.8366 18.3333 5.45258 18.3333 8.235C18.3333 8.69508 17.96 9.06828 17.5 9.06828ZM0.833281 9.06828C0.373398 9.06828 0 8.69508 0 8.235C0 5.45258 1.08336 2.8366 3.05086 0.869141C3.37664 0.543359 3.90336 0.543359 4.22914 0.869141C4.55504 1.19508 4.55504 1.72164 4.22914 2.04742C2.57656 3.7 1.66672 5.89754 1.66672 8.235C1.66672 8.69508 1.29332 9.06828 0.833281 9.06828ZM16.9826 14.0943C15.7225 13.0291 15 11.4725 15 9.82328V7.5C15 4.56758 12.8216 2.14004 10 1.7334V0.833281C10 0.372461 9.6266 0 9.16672 0C8.70668 0 8.33328 0.372461 8.33328 0.833281V1.7334C5.51086 2.14004 3.33328 4.56758 3.33328 7.5V9.82332C3.33328 11.4725 2.61078 13.0292 1.3434 14.1008C1.18334 14.2375 1.05485 14.4073 0.96678 14.5985C0.878712 14.7897 0.833165 14.9978 0.833281 15.2083C0.833281 16.0126 1.48742 16.6667 2.29172 16.6667H16.0417C16.8459 16.6667 17.5 16.0126 17.5 15.2083C17.5 14.7816 17.3141 14.3784 16.9826 14.0943ZM9.16672 20C10.6758 20 11.9383 18.9241 12.2284 17.5H6.10504C6.39496 18.9241 7.65746 20 9.16672 20Z" fill="#3447AA"/>
</svg>

  </div>


  <div>
    <h4 className=" text-sm">Reminder</h4>
    <p className="text-sm text-[#AEAEAE]">Get notified before due date</p>
  </div>
</div>

      <button
        onClick={() => setEnabled(!enabled)}
        onChange={onChange}
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
