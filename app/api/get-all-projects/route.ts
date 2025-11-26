import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const user = await currentUser();

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
    }

    const result = await db.select({
        projectId: projectTable.projectId,
        id: projectTable.id,
        createdOn: projectTable.createdOn,
        createdBy: projectTable.createdBy,
        frameId: frameTable.frameId,
        message: chatTable.chatMessage
    }).from(projectTable)
        .leftJoin(frameTable, eq(projectTable.projectId, frameTable.projectId))
        .leftJoin(chatTable, eq(frameTable.frameId, chatTable.frameId))
        .where(eq(projectTable.createdBy, user.primaryEmailAddress.emailAddress))
        .orderBy(desc(projectTable.id));

    return NextResponse.json(result);
}
