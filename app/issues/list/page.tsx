import { prisma } from "@/prisma";
import { Button, Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import CustomLink from "../../components/CustomLink";
import IssueStatusFilter from "./IssueStatusFilter";
import { Status } from "@prisma/client";
import Pagination from "@/app/components/Pagination";
import IssueTable from "./IssueTable";
import { Metadata } from "next";

const IssuesPage = async ({
  searchParams,
}: {
  searchParams: { status: Status; page: string };
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const page = parseInt(searchParams.page, 10) || 1;
  const pageSize = 6;

  const issues = await prisma.issue.findMany({
    where: {
      status,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const itemCount = await prisma.issue.count({ where: { status } });

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <Button>
          <Link href="/issues/new">New Issue</Link>
        </Button>
        <IssueStatusFilter />
      </div>
      <IssueTable issues={issues} />
      <Pagination
        itemCount={itemCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export const revalidate = 0;
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issues Tracker - List",
  description: "List of issues in the issues tracker app.",
  keywords: "issues, list",
};
