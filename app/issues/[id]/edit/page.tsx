import { prisma } from "@/prisma";
import { notFound } from "next/navigation";
import React from "react";
import IssueFormSkeleton from "./loading";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("../../_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface Props {
  params: {
    id: string;
  };
}

const EditIssue = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssue;
