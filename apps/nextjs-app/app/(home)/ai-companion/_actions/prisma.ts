"use server"

import { auth } from "@repo/auth/next-auth/auth"
import db from "@repo/prisma-db/client"

export const getCategories = async () => {
    const categories = await db.category.findMany({})
    return categories
}

export const getCompanion = async (id: string) => {
  const session = await auth();
    const companion = await db.companion.findUnique({
        where: {
            id: id,
            userId: session.user.id
        }
    })
    return companion
}

export const getCompanionWithMessages = async (id: string, userId:string) => {
    const companion = await db.companion.findUnique({
        where: {
            id: id
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc'
                },
                where: {
                    userId,
                }
            },
            _count: {
                select: {
                    messages: true
                }
            }

        }
    })
    return companion
}

export const getCompanions = async (name: string | null, categoryId: string | null) => {
    const filters: any = {};
  
    if (categoryId) {
      filters.categoryId = categoryId;
    }
  
    if (name) {
      filters.name = {
        contains: name,
        mode: "insensitive" // optional: makes it case-insensitive
      };
      // OR use `search` if fulltext index is set:
      // filters.name = { search: name };
    }
    const companions = await db.companion.findMany({
      where: filters,
      orderBy: {
        createdAt: "desc"
      },
      include: {
        _count: {
          select: {
            messages: true
          }
        }
      }
    });
  
    return companions;
  };
  