type ConfirmModalProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Continue",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[90%] max-w-sm rounded-2xl bg-[#F6F6F7] p-6 text-center shadow-xl">
        
        <div className="h-[2px] rounded-full mx-auto mb-4 w-[45px] bg-[#707070]"></div>
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400">
          <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="35" cy="35" r="33.5" fill="#FFCC00" stroke="white" stroke-width="3"/>
 <svg width={70} height={70} viewBox={"0 0 70 70"}>
  <circle
    cx={35}
    cy={35}
    r={33.5}
    fill="#FFCC00"
    stroke="white"
    strokeWidth={3}
  />

 <svg width="24" height="23" x="23" y="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.5013 17.3058L15.0233 1.72102C13.6612 -0.57215 10.3407 -0.575197 8.9767 1.72102L0.499073 17.3058C-0.893396 19.6491 0.792463 22.6163 3.52167 22.6163H20.478C23.2049 22.6163 24.8938 19.6515 23.5013 17.3058ZM12 19.8038C11.2248 19.8038 10.5937 19.1728 10.5937 18.3976C10.5937 17.6224 11.2248 16.9913 12 16.9913C12.7752 16.9913 13.4062 17.6224 13.4062 18.3976C13.4062 19.1728 12.7752 19.8038 12 19.8038ZM13.4062 14.1788C13.4062 14.9541 12.7752 15.5851 12 15.5851C11.2248 15.5851 10.5937 14.9541 10.5937 14.1788V7.1476C10.5937 6.37238 11.2248 5.74135 12 5.74135C12.7752 5.74135 13.4062 6.37238 13.4062 7.1476V14.1788Z" fill="white"/>
</svg>
</svg>
</svg>



        

        </div>

        {/* Text */}
        <h2 className="mb-2 text-lg font-semibold">{title}</h2>
        {description && (
          <p className="mb-6 text-sm text-gray-500">{description}</p>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-[#3B4DB7] py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border border-gray-300 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}
