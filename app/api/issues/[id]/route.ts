import { authOptions } from "@/app/auth/authOptions";
import { updateIssueSchema } from "@/app/validationSchemas";
import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const validation = updateIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const { assignToUserId } = body;
  if (assignToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignToUserId },
    });
    if (!user) {
      return NextResponse.json("invalid user", { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    return NextResponse.json("invalid issue", { status: 400 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: params.id },
    data: {
      title: body.title,
      description: body.description,
      userId: assignToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}

// Delete the issue
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });
  if (!issue) {
    return NextResponse.json("invalid issue", { status: 400 });
  }

  await prisma.issue.delete({
    where: { id: params.id },
  });

  return NextResponse.json({}, { status: 200 });
}
