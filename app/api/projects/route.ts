import { db } from "@/config/db";
import { chatTable, frameTable, projectTable, usersTable } from "@/config/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { projectId, frameId, messages, credits } = await req.json();
    const user = await currentUser()
    const { has } = await auth()
    const hasUnlimitedAccess = has && has({ plan: 'unlimited' })

    if (!user?.primaryEmailAddress?.emailAddress) {
        return NextResponse.json({ error: 'User email not found' }, { status: 400 });
    }

    const projectResult = await db.insert(projectTable).values({
        projectId: projectId,
        createdBy: user.primaryEmailAddress.emailAddress
    })

    const frameResult = await db.insert(frameTable).values({
        frameId: frameId,
        projectId: projectId,

    })

    const chatResult = await db.insert(chatTable).values({
        chatMessage: messages,
        frameId: frameId,
        createdBy: user.primaryEmailAddress.emailAddress
    })

    //Update user credits
    if (!hasUnlimitedAccess) {
        const userResult = await db.update(usersTable).set({
            credits: credits - 1
        }).where(eq(usersTable.email, user.primaryEmailAddress.emailAddress))
    }

    return NextResponse.json({ projectId, frameId, messages })


}
