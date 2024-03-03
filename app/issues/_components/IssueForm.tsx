"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";
import { z } from "zod";

interface Props {
  issue?: Issue;
}

type IssuesFormData = z.infer<typeof createIssueSchema>;

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesFormData>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  });

  return (
    <div>
      <form
        className="max-w-3xl space-y-3 mx-auto  px-6 py-4 rounded-lg shadow"
        onSubmit={onSubmit}
      >
        {error && (
          <Callout.Root color="red">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <div>
          <input
            type="text"
            className="px-4 py-2 rounded-md border border-gray-400 w-full focus:outline-none focus:border-blue-500"
            placeholder="Title"
            {...register("title")}
            defaultValue={issue?.title}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Description" {...field} />
          )}
          defaultValue={issue?.description}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Button disabled={loading} type="submit" size="3">
          {issue ? "Update Issue" : "Submit New Issue"} {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
