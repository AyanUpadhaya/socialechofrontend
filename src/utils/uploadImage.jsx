import { imageUploadApi } from "./api";
import { infoNotify } from "./getNotify";

export const fetchImageData = async (
  file,
  setImgLoading,
  setIsRequestLoading
) => {
  const data = new FormData();
  data.append("file", file);
  data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);
  data.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);
  setImgLoading(true);

  try {
    const res = await fetch(imageUploadApi, {
      method: "POST",
      body: data,
    });

    const res_data = await res.json();
    if (res_data.version_id) {
      setImgLoading(false);
      setIsRequestLoading(false);
      return res_data.url;
    } else {
      throw new Error("Failed to upload image");
    }
  } catch (error) {
    infoNotify(error.message);
    setImgLoading(false);
    setIsRequestLoading(false);
    return null;
  }
};
