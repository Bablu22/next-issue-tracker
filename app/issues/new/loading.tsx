import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoading = () => {
  return (
    <Box className="max-w-3xl space-y-3 mx-auto">
      <Skeleton />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default NewIssueLoading;
