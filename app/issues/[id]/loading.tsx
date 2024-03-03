import { Box, Card, Flex, Grid } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailsLoading = () => {
  return (
    <Grid
      columns={{
        initial: "1",
        md: "5",
      }}
      gap="5"
    >
      <Box className="md:col-span-4">
        <Skeleton />
        <Flex className="space-x-3" my="2">
          <Skeleton />
          <Skeleton />
        </Flex>
        <Card className="prose max-w-full" mt="4">
          <Skeleton height="20rem" />
        </Card>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <Skeleton />
          <Skeleton />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailsLoading;
