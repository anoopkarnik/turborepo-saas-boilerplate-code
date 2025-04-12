"use server"

import { auth } from "@repo/auth/better-auth/auth";
import axios from "axios";
import { headers } from "next/headers";

export const uploadZipAction = async (formData: FormData) => {
    try {
        const session = await auth.api.getSession({
        headers: await headers(),
    });;
        console.log(session)
        const  response = await fetch(`${process.env.NODE_BACKEND_URL}/pre-signed-url`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.user.accessToken}`,
            },
        });
        const res = await response.json()
        const url = res.url;
        const key = res?.key;
        const response2 = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/zip",

            },
            body: formData.get("file"),
        });
    
        if (!response2.ok) {
            throw new Error("Failed to upload file");
        }

        const s3url = `${process.env.CLOUDFLARE_URL}/${key}`;

        return { success: true, url: s3url };
    } catch (error) {
        console.error("Error uploading file:", error);
        return {  };
    }
}

export const trainModel = async (data: any) => {
    try {
        const response = await axios.post(`${process.env.NODE_BACKEND_URL}/ai/training`, data);
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        console.log("Model started:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}
