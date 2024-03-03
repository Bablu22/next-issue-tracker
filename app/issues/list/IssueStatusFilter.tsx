"use client";

import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";

const ststuses: {
  label: string;
  value?: string;
}[] = [
  {
    label: "All",
    value: "All",
  },
  {
    label: "Open",
    value: "OPEN",
  },
  {
    label: "Closed",
    value: "CLOSED",
  },
  {
    label: "In Progress",
    value: "IN_PROGRESS",
  },
];

const IssueStatusFilter = () => {
  const router = useRouter();

  return (
    <Select.Root
      onValueChange={(status) => {
        const query = status === "All" ? "" : status;
        router.push(`/issues/list?status=${query}`);
      }}
    >
      <Select.Trigger placeholder="Filter by status...." />
      <Select.Content>
        {ststuses.map((status) => (
          <Select.Item key={status.value} value={status.value || "All"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
