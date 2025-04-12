// app/api/settings/modifyAvatar/route.ts
import { NextResponse } from "next/server";
import { putBlob } from "@repo/storage/vercel-blob";
import { shareRoute } from "../../shareRoute";

export async function POST(request: Request) {
  return shareRoute(request, async (req: Request, formData: any) => {

    // 2. Extract fields
    const file = formData.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // 3. Upload to Vercel Blob
    const filename = (file as File).name || "avatar.png";
    const response = await putBlob({
      filename,
      body: file,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });

    return NextResponse.json({ url:response.url });
  });
}
