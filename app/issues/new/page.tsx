"use client";

import { Button, Callout, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

type IssuesForm = z.infer<typeof createIssueSchema>;

const NewIssue = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssuesForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  });

  return (
    <div>
      <form
        className="max-w-3xl space-y-3 mx-auto bg-slate-900 text-white px-6 py-4 rounded-lg shadow-lg"
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
            className="bg-slate-900 text-white px-4 py-2 rounded-md border border-gray-400 w-full focus:outline-none focus:border-blue-500"
            placeholder="Title"
            {...register("title")}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </div>

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Button disabled={loading} type="submit" size="3">
          Submit New Issue {loading && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssue;
