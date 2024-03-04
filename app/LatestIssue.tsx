import { prisma } from "@/prisma";
import IssueTable from "./issues/list/IssueTable";
import { Heading } from "@radix-ui/themes";

const LatestIssue = async () => {
  const latestIssues = await prisma.issue.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });
  return (
    <div>
      <Heading>Latest Issues</Heading>
      <IssueTable issues={latestIssues} />
    </div>
  );
};

export default LatestIssue;
