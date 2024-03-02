import { Box, Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailsLoading = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton />
      <Flex className="space-x-3" my="2">
        <Skeleton width="100px" />
        <Skeleton />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton width="100%" />
      </Card>
    </Box>
  );
};

export default IssueDetailsLoading;
