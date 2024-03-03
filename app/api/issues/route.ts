import { prisma } from "@/prisma";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authOptions";

export async function POST(req: NextRequest) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = createIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(newIssue, { status: 201 });
}
