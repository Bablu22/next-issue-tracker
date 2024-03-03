"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get<User[]>("/api/users");
      return res.data;
    },
    staleTime: 60 * 1000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const assignIssue = (userId: string) => {
    try {
      axios.patch(`/api/issues/${issue.id}`, {
        assignToUserId: userId === "unassigned" ? null : userId,
      });
      toast.success("Issue assigned");
    } catch (error) {
      toast.error("Failed to assign issue");
    }
  };

  return (
    <>
      <Select.Root
        onValueChange={(value) => assignIssue(value)}
        defaultValue={issue.userId || "unassigned"}
      >
        <Select.Trigger placeholder="Assign to...." />
        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((user) => (
              <Select.Item key={user.id} value={user.id}>
                {user.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
      <Toaster />
    </>
  );
};

export default AssigneeSelect;
