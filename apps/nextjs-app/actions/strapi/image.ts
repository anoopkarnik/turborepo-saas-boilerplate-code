"use server";

import axios from "axios";

export const uploadImageToStrapi = async (formData:any) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/upload`,
      formData,
      {
        headers: {
          "Authorization": `Bearer ${process.env.STRAPI_TOKEN ?? ""}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload successful:", response.data);

    return response.data; // will contain uploaded file info (URL, id, etc.)
  } catch (error) {
    console.error("Upload failed:", error);
    return null;
  }
};
