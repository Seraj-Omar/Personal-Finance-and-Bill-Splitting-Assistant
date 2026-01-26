"use client";
import { IconCamera, IconX } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import UploadPictureModal from "./UploadPictureModal";

export default function AvatarSection() {
  const [open, setOpen] = useState(false); 
  const [cameraOpen, setCameraOpen] = useState(false);
  const [avatar, setAvatar] = useState("/profile.jpg");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

 
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setCameraOpen(true);
    } catch (err) {
      console.error("Camera access denied or not available", err);
      alert("Camera not available. You can upload a file instead.");
    }
  };

  
  const closeCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    setCameraOpen(false);
  };

  
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL("image/png");
      setAvatar(url);
      closeCamera();
    }
  };

  
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play();
    }
  }, [cameraOpen]);

 
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleCameraUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleUpload = (file: File) => setAvatar(URL.createObjectURL(file));

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 mb-6 lg:gap-50">
        <div className="relative">
          <img src={avatar} className="w-40 h-40  rounded-full object-cover" />

         
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleCameraUpload}
          />

         
          <button
            onClick={openCamera}
            className="absolute bottom-1 right-1 w-10 h-10 sm:w-8 sm:h-8 bg-[#3447AA] border-2 border-white rounded-full flex items-center justify-center text-white"
          >
            <IconCamera size={18} />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(true)}
            className="px-5 py-2 rounded-lg bg-[#3447AA] text-white font-medium"
          >
            Upload New
          </button>
          <button
            onClick={() => setAvatar("/profile.jpg")}
            className="px-5 py-2 rounded-lg bg-gray-200 text-[#707070] font-medium"
          >
            Delete avatar
          </button>
        </div>
      </div>

      <UploadPictureModal
        open={open}
        onClose={() => setOpen(false)}
        onUpload={handleUpload}
      />

     
      {cameraOpen && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div
      onClick={(e) => e.stopPropagation()}
      className="bg-white rounded-2xl w-full max-w-2xl shadow-xl animate-scaleIn"
    >
     
      <div className="bg-[#F4F4F4] p-5 font-semibold relative text-[#262626] border-b-[1.5px] border-[#CCCCCC] rounded-t-2xl">
        <IconX
          fill="#161616"
          onClick={closeCamera}
          className="absolute top-6 right-6 text-2xl cursor-pointer"
        />
        Take Photo
      </div>

     
      <div className="p-6 flex flex-col items-center justify-center space-y-6">
        <video
          ref={videoRef}
          className="w-full h-72 rounded-xl object-cover border border-[#E0E0E0]"
        />
        <canvas ref={canvasRef} className="hidden" />

        <div className="flex  gap-3 w-full">
          <button
            onClick={takePhoto}
            className="px-6 py-2 w-full h-full bg-[#3447AA] text-white font-medium rounded-lg"
          >
            Take Photo
          </button>
          <button
            onClick={closeCamera}
            className="px-6 py-2 w-full border border-[#E0E0E0] bg-white font-medium rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
)}
    </>
  );
}
