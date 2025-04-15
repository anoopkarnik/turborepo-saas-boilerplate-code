"use server"

import { auth } from "@repo/auth/better-auth/auth";
import axios from "axios";
import jwt from "jsonwebtoken";
import { headers } from "next/headers";

export const uploadZipAction = async (formData: FormData) => {
    try {
        
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
            
        const  response = await fetch(`${process.env.NODE_BACKEND_URL}/pre-signed-url`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const res = await response.json()
        const url = res.url;
        const key = res.key;
        await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/zip",

            },
            body: formData.get("file"),
        });

        const s3url = `${process.env.CLOUDFLARE_URL}/${key}`;

        return { success: true, url: s3url };
    } catch (error) {
        console.error("Error uploading file:", error);
        return { sucess: false, url: null };
    }
}

export const trainModel = async (data: any) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.post(`${process.env.NODE_BACKEND_URL}/ai/training`, data,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
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

export const getPacks = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.get(`${process.env.NODE_BACKEND_URL}/pack/bulk`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        console.log("Packs:", response.data);
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}

export const getImages = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.get(`${process.env.NODE_BACKEND_URL}/image/bulk`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}

export const getModels = async () => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.get(`${process.env.NODE_BACKEND_URL}/models`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}

export const generateImage = async (prompt:string,modelId:string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.post(`${process.env.NODE_BACKEND_URL}/ai/generate`,
            {
                prompt,
                modelId,
                num:1,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}

export const generatePack = async (packId:string,modelId:string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });;
        if (!session?.user?.id) {
            throw new Error("User not authenticated");
        }

        const token = jwt.sign(
            {id:session.user.id,email:session.user.email,role:session.user.role},
            process.env.JWT_SECRET as string,
            { expiresIn: "1h" }
        )
        const response = await axios.post(`${process.env.NODE_BACKEND_URL}/pack/generate`,
            {
                packId,
                modelId,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.status !== 200) {
            throw new Error("Failed to train model");
        }
        return response.data;
    } catch (error) {
        console.error("Error training model:", error);
        return null;
    }
}




