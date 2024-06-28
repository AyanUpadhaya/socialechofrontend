import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { errorNotify } from "../../../utils/getNotify";
import {closecircle} from "../../../assets/getAssets"
const ImageUploader = ({
  setter,
  title = "Upload",
  preview,
  name = "imageUploader",
  label,
  identifier,
  ...rest
}) => {
  const imageRef = useRef(null);
  const [localFile, setLocalFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isImage, setIsImage] = useState(false);
  const allowedExtensions = ["jpg", "jpeg", "png"];

  const handleChangeImage = (event) => {
    const files = event.target.files;
    if (files?.length > 0) {
      const file = event.target.files[0];
      setExtention(file?.name);
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setter(file);
      setLocalFile(file?.name);
    } else {
      errorNotify("Invalid file type");
    }
  };

  const setExtention = (fileName) => {
    if (fileName) {
      const fileExtension = fileName?.split(".").pop().toLowerCase();
      if (allowedExtensions.includes(fileExtension)) {
        setIsImage(true);
      } else {
        setIsImage(false);
        errorNotify("File type not allowed");
      }
    } else {
      return;
    }
  };

  const handleDelete = () => {
    setter(null);
    setImagePreview(null);
    setLocalFile(null);
    imageRef.current.value = "";
  };

  useEffect(() => {
    if (preview) {
      setExtention(preview);
      setLocalFile(preview);
      setImagePreview(preview);
    }
  }, []);

  return (
    <div className="w-full ">
      <div className="w-full">
        <div className={`${label ? "mt-4" : ""}`}>
          <div className="w-full flex flex-col-reverse sm:flex-row gap-6">
            {/* placeholder */}
            <div className="w-full sm:max-w-[400px] h-full  rounded-xl flex justify-center items-center  mb-2 relative ">
              <label
                htmlFor={name}
                className="w-full p-4  flex flex-col justify-center items-center gap-4  cursor-pointer py-8 px-8 md:px-[60px] bg-main-200 rounded-xl"
              >
                <div className="w-full flex flex-col gap-1 items-center">
                  <span className="text-sm sm:text-xl font-nunito text-black-900 font-bold">
                    Upload your file
                  </span>
                  <span className="text-black-600 text-xs sm:text-sm font-nunito font-normal ">
                    File should be an image
                  </span>
                </div>
                <div className="w-full font-nunito flex flex-col items-center gap-4 border border-dashed border-[#4FAAFD] rounded-xl p-4">
                  <div className="w-10 h-10 p-2 rounded-full bg-main-100 flex justify-center item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        opacity="0.4"
                        d="M16.2854 12.7141L16.2851 12.7135L13.9376 7.22349L13.9374 7.22306C13.5268 6.25781 12.9511 5.79273 12.3621 5.76237L12.362 5.76236C11.7808 5.73209 11.1555 6.13612 10.6436 7.05896L10.6434 7.05938L9.21852 9.61661L16.2854 12.7141ZM16.2854 12.7141C16.6497 13.5596 16.5668 14.5267 16.0456 15.2948L16.0456 15.2948M16.2854 12.7141L16.0456 15.2948M16.0456 15.2948L16.0439 15.2974M16.0456 15.2948L16.0439 15.2974M16.0439 15.2974C15.5353 16.0672 14.6762 16.5277 13.755 16.5277H4.18498C3.22929 16.5277 2.35713 16.0402 1.85509 15.2287C1.35386 14.4185 1.31173 13.423 1.73872 12.5617C1.73879 12.5616 1.73887 12.5614 1.73895 12.5613L3.03564 9.97538C3.0357 9.97527 3.03576 9.97515 3.03582 9.97504C3.3924 9.26908 3.90695 8.878 4.47236 8.82146C5.04171 8.76452 5.62487 9.03136 6.119 9.65041C6.11918 9.65064 6.11937 9.65087 6.11955 9.6511L6.2833 9.85952L16.0439 15.2974ZM7.82938 10.6442C8.40293 10.5972 8.89269 10.203 9.21837 9.61688L7.82938 10.6442ZM7.82938 10.6442C7.24648 10.699 6.69928 10.3896 6.2834 9.85965L7.82938 10.6442Z"
                        fill="#4FAAFD"
                        stroke="#4FAAFD"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M5.22738 6.28484C6.62742 6.28484 7.76238 5.14989 7.76238 3.74984C7.76238 2.3498 6.62742 1.21484 5.22738 1.21484C3.82734 1.21484 2.69238 2.3498 2.69238 3.74984C2.69238 5.14989 3.82734 6.28484 5.22738 6.28484Z"
                        fill="#4FAAFD"
                      />
                    </svg>
                  </div>

                  <div className="text-xs sm:text-sm text-black-600 font-normal">
                    Click to{" "}
                    <span className="text-[#4FAAFD] font-semibold">
                      Upload File
                    </span>
                  </div>
                </div>
              </label>
              <input
                type="file"
                id={name}
                className="opacity-0 absolute w-0.5"
                ref={imageRef}
                accept="image/*"
                onChange={handleChangeImage}
                alt="preview"
                {...rest}
              />
            </div>

            {/* image preview */}

            {imagePreview && isImage && (
              <div className="sm:h-[225px] w-full sm:max-w-[400px] rounded-xl relative">
                {/* Show image preview */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="rounded-xl h-[240px] w-full sm:max-w-[400px] object-cover"
                />
                <div className="absolute top-[10px] right-[10px]">
                  <button type="button" onClick={handleDelete}>
                    <img src={closecircle} alt="" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
