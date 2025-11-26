import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser();
    console.log('DEBUG: POST /api/users called');
    console.log('DEBUG: currentUser:', user ? `User found: ${user.id}` : 'No user found');

    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const email = user.primaryEmailAddress?.emailAddress;
    console.log('DEBUG: Email:', email);

    if (!email) {
      return NextResponse.json({ error: 'No email available on the user' }, { status: 400 });
    }

    const userResult = await db.select().from(usersTable).where(eq(usersTable.email, email));
    console.log('DEBUG: Existing user result:', userResult);

    if (userResult.length === 0) {
      const data = {
        name: user.fullName ?? 'NA',
        email,
        credits: 2,
      };
      console.log('DEBUG: Inserting new user:', data);

      await db.insert(usersTable).values(data);

      const inserted = (await db.select().from(usersTable).where(eq(usersTable.email, email)))[0];
      console.log('DEBUG: Inserted user:', inserted);
      return NextResponse.json({ user: inserted });
    }

    return NextResponse.json({ user: userResult[0] });
  } catch (error) {
    console.error('users POST error', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
