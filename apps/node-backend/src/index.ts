// apps/backend/index.ts
import express from "express";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cors from "cors";
import {prismaClient as db} from "./utils/prisma.js";

import dotenv from "dotenv";
import { FalAIModel } from "./models/FalAIModel.js";
import { authMiddleware } from "./middleware.js";
import { GenerateImage, GenerateImagesFromPack, TrainModel } from "./utils/zod.js";

dotenv.config();

const falAiModel = new FalAIModel();

const app = express();
const PORT = process.env.PORT || 8020;

app.use(express.json());
app.use(cors())

app.get("/pre-signed-url", async ( req, res) => {
  const r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.ENDPOINT!,
    credentials: {
      accessKeyId: process.env.ACCESS_KEY_ID!,
      secretAccessKey: process.env.SECRET_ACCESS_KEY!,
    },
  });
  const key  = `models/${Date.now()}_${Math.random()}.zip`;
  const command = new PutObjectCommand({
    Bucket: "photoai",
    Key: key,
    ContentType: "application/zip",
  });

  const url = await getSignedUrl(r2Client, command, {
    expiresIn: 60 * 5, // 5 minutes
  });

  res.json({ url,key });
})


app.post("/ai/training", authMiddleware , async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({ message: "Input Incorrect" });
    return;
  }


  const {request_id, response_url} = await falAiModel.trainModel(parsedBody.data.zippedImages,
    parsedBody.data.name)
  const data = await db.photoModel.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethnicity: parsedBody.data.ethnicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      // @ts-ignore
      userId:  req.userId!,
      falAiRequestId: request_id,
      zipUrl: parsedBody.data.zippedImages
    }
  });

  res.json({
    modelId: data.id
  })

})

app.post("/ai/generate", authMiddleware, async (req, res) => {
  const parsedBody = GenerateImage.safeParse(req.body);


  if (!parsedBody.success) {
    res.status(411).json({ message: "Input Incorrent" });
    return;
  }
  const model = await db.photoModel.findUnique({
    where: {
      id: parsedBody.data.modelId
    }
  })

  if (!model || !model.tensorPath) {
    res.status(411).json({ message: "Model not found" });
    return;
  }

  console.log("Model found", model);
  const {request_id, response_url} = await falAiModel.generateImage(
    parsedBody.data.prompt,
    model.tensorPath!
  )

  

  // Call the image generation API here with the parsed data
  const data = await db.outputImages.create({
    data: {
      prompt: parsedBody.data.prompt,
      modelId: parsedBody.data.modelId,
      // @ts-ignore
      userId:  req.userId!,
      imageUrl: "",
      falAiRequestId: request_id,
    }
  })
  res.json({
    imageId: data.id
  })
})

app.post("/pack/generate", authMiddleware, async(req, res) => {
  const parsedBody = GenerateImagesFromPack.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(411).json({ message: "Input Incorrent" });
    return;
  }

  const prompts = await db.packPrompts.findMany({
    where: {
      packId: parsedBody.data.packId
    }
  }) 

  let requestIds: {request_id: string, response_url: string }[] = await Promise.all(prompts.map(
    async (prompt:any) => {
      return await falAiModel.generateImage(prompt.prompt, parsedBody.data.modelId);
    }
  ));

  // Call the image generation API here with the parsed data
  const images = await db.outputImages.createManyAndReturn({
    data: prompts.map((prompt:any,index:number) => ({
      prompt: prompt.prompt,
      modelId: parsedBody.data.modelId,
      // @ts-ignore
      userId:  req.userId!,
      imageUrl: "",
      falAiRequestId: requestIds[index]?.request_id || "",
    }))
  })
  res.json({
    images: images.map((image:any) => image.id)
  })

})

app.get("/pack/bulk", authMiddleware, async (req, res) => {
    const packs = await db.packs.findMany({})
    res.json({packs})
  
})

app.get("/image/bulk", authMiddleware, async (req, res) => {
  const ids = req.query.images as string[];
  const limit = req.query.limit as string ?? "10";
  const offset = req.query.offset as string ?? "0";
  const imagesData = await db.outputImages.findMany({
    where: {
      id: { in: ids},
      // @ts-ignore
      userId:  req.userId!,
    },
    take: parseInt(limit),
    skip: parseInt(offset),
    orderBy: {
      createdAt: "desc"
    }
  })

  res.json({images: imagesData})

})

app.get("/models", authMiddleware, async (req, res) => {
  const models = await db.photoModel.findMany({
    where: {
      // @ts-ignore
      OR: [{userId: req.userId!}, {open: true}],
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  res.json({models})

})

app.post("/fal-ai/webhook/train", async (req, res) => {
  const requestId = req.body.request_id;

  const { imageUrl } = await falAiModel.generateImageSync(req.body.tensor_path);
  await db.photoModel.updateMany({
    where: {
      falAiRequestId: requestId
    },
    data: {
      trainingStatus: "Generated",
      tensorPath: req.body.tensor_path,
      thumbnail: imageUrl ,
    }
  });

  res.json({
    message: "Webhook received and processed successfully",
  });
});

app.post("/fal-ai/webhook/image", async (req, res) => {
  
  const requestId = req.body.request_id;
  console.log("Request ID:", requestId);
  await db.outputImages.updateMany({
    where:{
      falAiRequestId: requestId
    },
    data: {
      status: "Generated",
      imageUrl: req.body.image_url
    }
  });
  res.json({
    message: "Webhook received and processed successfully",
  });

 });


app.listen(PORT, () => {
  console.log(`✅ Backend listening on http://localhost:${PORT}`);
});
