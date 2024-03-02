import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma";
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";

interface Props {
  params: { id: string };
}

const IssueDetailsPge = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Box className="max-w-xl">
      <Heading>{issue.title}</Heading>
      <Flex className="space-x-3" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose text-white" mt="4">
        <Markdown>{issue.description}</Markdown>
      </Card>
    </Box>
  );
};

export default IssueDetailsPge;
