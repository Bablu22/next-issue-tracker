import { Status } from "@prisma/client";
import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueSummary = ({ open, closed, inProgress }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    {
      label: "Open",
      value: open,
      status: "OPEN",
    },
    {
      label: "Closed",
      value: closed,
      status: "CLOSED",
    },
    {
      label: "In Progress",
      value: inProgress,
      status: "IN_PROGRESS",
    },
  ];

  return (
    <Flex gap="4" mt="5">
      {statuses.map((status) => (
        <Card key={status.status}>
          <Flex direction="column">
            <Text className="text-sm font-medium">{status.label}</Text>
            <Text size="5" className="font-bold">
              {status.value}
            </Text>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default IssueSummary;
