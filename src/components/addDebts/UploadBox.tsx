import { FaCloudUploadAlt } from "react-icons/fa";

export default function UploadBox() {
  return (
    <div>
      <label className="text-sm text-gray-700 mb-1 block">
        Attachment <span className="text-[#AEAEAE]">(Optional)</span>
      </label>

     
      <input
        type="file"
        id="upload"
        accept="image/png, image/jpeg"
        className="hidden"
      />

   
      <label
        htmlFor="upload"
        className="border border-[#E0E0E0] relative bg-[#F9F9FA] rounded-2xl p-6 text-center cursor-pointer block"
      >
        <div className="w-9 h-9 mx-auto mb-2 flex items-center justify-center rounded-full bg-[#FBEAEB]">
          <FaCloudUploadAlt size={24} fill="#3447AA" className="p-1" />
        </div>

        <div className="text-[14px]">Upload Subject Image</div>
        <p className="text-xs text-[#AEAEAE] mt-1">PNG, JPG up to 5MB</p>
      </label>
    </div>
  );
}
