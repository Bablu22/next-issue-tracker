"use client";

import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  return (
    <Flex align="center" gap="2" mt="3">
      <Text size="3">
        Page {currentPage} of {pageCount}
      </Text>
      <Button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
      >
        <MdKeyboardDoubleArrowLeft />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="soft"
        color="gray"
      >
        <MdKeyboardArrowLeft />
      </Button>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
      >
        <MdKeyboardArrowRight />
      </Button>
      <Button
        onClick={() => handlePageChange(pageCount)}
        disabled={currentPage === pageCount}
        variant="soft"
        color="gray"
      >
        <MdKeyboardDoubleArrowRight />
      </Button>
    </Flex>
  );
};

export default Pagination;
