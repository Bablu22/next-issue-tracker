import { Text } from "@radix-ui/themes";
import LatestIssue from "./LatestIssue";
import IssueSummary from "./IssueSummary";
import { prisma } from "@/prisma";
import IssueChart from "./IssueChart";
import { Metadata } from "next";

export default async function Home() {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div>
      <LatestIssue />
      <div className="mt-5">
        <Text size="6" mt="5" className="font-bold ">
          Issues Summary
        </Text>
      </div>
      <div className="mx-auto max-w-xl">
        <IssueChart open={open} closed={closed} inProgress={inProgress} />
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Issues Tracker - Dashboard",
  description: "Dashboard for the issues tracker app.",
  keywords: "home, issues",
};
