// utils/uploadToS3.ts

interface UploadParams {
  file: File;
  key: string;
  bucket: string;
}

export const uploadToCloudflare = async ({
  file,
  key,
  bucket
}: UploadParams) => {
  try {
    const  response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cloudflare/pre-signed-url`, {
      method: "POST",
      body: JSON.stringify({ key, bucket }),
      headers: {
          "Content-Type": "application/json",
      },
  });
  const res = await response.json()
  const url = res.url;
  await fetch(url, {
      method: "PUT",
      body: file,
  });
  const publicUrl = `${process.env.NEXT_PUBLIC_CLOUDFLARE_URL}/${key}`;
    return { success: true, url: publicUrl };
  } catch (err) {
    console.error("S3 upload error:", err);
    return { success: false, error: err };
  }
};
