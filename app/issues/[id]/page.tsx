import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { prisma } from "@/prisma";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RiPencilFill } from "react-icons/ri";
import Markdown from "react-markdown";
import DeleteIssueButton from "./DeleteIssueButton";
import { authOptions } from "@/app/auth/authOptions";
import { getServerSession } from "next-auth";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const IssueDetailsPge = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  const issue = await prisma.issue.findUnique({
    where: { id: params.id },
  });

  if (!issue) {
    notFound();
  }

  return (
    <Grid
      columns={{
        initial: "1",
        md: "5",
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <Heading>{issue.title}</Heading>
        <Flex className="space-x-3" my="2">
          <IssueStatusBadge status={issue.status} />
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose max-w-full" mt="4">
          <Markdown>{issue.description}</Markdown>
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          {session && (
            <>
              <AssigneeSelect />
              <Button>
                <RiPencilFill />
                <Link href={`/issues/edit/${issue.id}`}>Edit Issue</Link>
              </Button>
              <DeleteIssueButton issueId={issue.id} />
            </>
          )}
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsPge;
