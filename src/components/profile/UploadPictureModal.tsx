import { IconX } from "@tabler/icons-react";
import { useRef, useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
};

export default function UploadPictureModal({ open, onClose, onUpload }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#2C2C2C80]/50 p-15"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl shadow-xl animate-scaleIn"
      >
        <div className="bg-[#F4F4F4] p-5 font-semibold relative text-[#262626] border-b-[1.5px] border-[#CCCCCC] rounded-t-2xl">
          <IconX
            fill="#161616"
            onClick={onClose}
            className="absolute top-6 right-6 text-2xl cursor-pointer"
          />
          Upload Profile Picture
        </div>

        <div className="p-6 space-y-6">
          <div
            onClick={() => fileRef.current?.click()}
            className="border border-dashed border-[#E0E0E0] rounded-xl p-8 text-center cursor-pointer bg-[#F9F9FA] hover:bg-gray-50"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setSelectedFile(e.target.files[0]);
                }
              }}
            />

            {!selectedFile ? (
              <>
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="#3447AA"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M37.0037 39.642H30.1381V32.7045H32.407C32.9824 32.7045 33.3224 32.0507 32.9824 31.5799L28.5689 25.4728C28.2877 25.0805 27.7058 25.0805 27.4246 25.4728L23.011 31.5799C22.671 32.0507 23.0045 32.7045 23.5864 32.7045H25.8553V39.642H18.1659C14.7331 39.4524 12 36.2419 12 32.7634C12 30.3637 13.3012 28.2713 15.2301 27.1402C15.0535 26.6628 14.962 26.1528 14.962 25.6167C14.962 23.1647 16.9432 21.1835 19.3952 21.1835C19.9248 21.1835 20.4348 21.275 20.9121 21.4516C22.331 18.4438 25.3911 16.358 28.9481 16.358C33.5513 16.3645 37.3437 19.8888 37.7752 24.3809C41.3126 24.9889 44 28.2648 44 31.9722C44 35.9346 40.9138 39.3674 37.0037 39.642Z"
                    fill="#3447AA"
                  />
                </svg>

                <p className="text-gray-600">Click to choose an image</p>
                <p className="text-[#AEAEAE] text-sm">PNG, JPG up to 5MB</p>
              </>
            ) : (
              <>
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto mb-4"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="#3447AA"
                    fillOpacity="0.1"
                  />
                  <path
                    d="M37.0037 39.642H30.1381V32.7045H32.407C32.9824 32.7045 33.3224 32.0507 32.9824 31.5799L28.5689 25.4728C28.2877 25.0805 27.7058 25.0805 27.4246 25.4728L23.011 31.5799C22.671 32.0507 23.0045 32.7045 23.5864 32.7045H25.8553V39.642H18.1659C14.7331 39.4524 12 36.2419 12 32.7634C12 30.3637 13.3012 28.2713 15.2301 27.1402C15.0535 26.6628 14.962 26.1528 14.962 25.6167C14.962 23.1647 16.9432 21.1835 19.3952 21.1835C19.9248 21.1835 20.4348 21.275 20.9121 21.4516C22.331 18.4438 25.3911 16.358 28.9481 16.358C33.5513 16.3645 37.3437 19.8888 37.7752 24.3809C41.3126 24.9889 44 28.2648 44 31.9722C44 35.9346 40.9138 39.3674 37.0037 39.642Z"
                    fill="#3447AA"
                  />
                </svg>

                <p className="text-sm text-gray-600 mt-1">
                  {selectedFile.name}
                </p>
              </>
            )}
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 w-1/2 rounded-lg border border-[#E0E0E0] font-medium"
            >
              Cancel
            </button>
            <button
              disabled={!selectedFile}
              onClick={() => {
                if (selectedFile) {
                  onUpload(selectedFile);
                  onClose();
                  setSelectedFile(null);
                }
              }}
              className={`px-4 py-2 w-1/2 rounded-lg text-white  font-medium ${
                selectedFile ? "bg-[#3447AA]" : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Choose file
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
