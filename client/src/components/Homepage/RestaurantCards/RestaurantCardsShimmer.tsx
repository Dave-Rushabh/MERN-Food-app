import { Box, Divider, Flex, Skeleton, Stack } from '@chakra-ui/react';

interface RestaurantCardsShimmerProps {
  idx: number;
}
const RestaurantCardsShimmer = ({ idx }: RestaurantCardsShimmerProps) => {
  return (
    <>
      <Box key={idx.toString()} className="res-card-info" width="350px">
        <Skeleton height="20px" width="120px" mb="2" />

        <Box className="res-img-wrapper" mb="2">
          <Skeleton height="180px" width="100%" />
        </Box>

        <Skeleton height="20px" width="80%" mb="1" />

        <Divider />

        <Flex align="center" justify="space-between" my="2">
          <Flex align="center">
            <Skeleton height="10px" width="20px" borderRadius="50%" />
            <Box ml="1">
              <Skeleton height="10px" width="40px" />
            </Box>
          </Flex>
          <Flex align="center">
            <Skeleton height="10px" width="40px" />
            <Box ml="1">
              <Skeleton height="10px" width="30px" />
            </Box>
          </Flex>
        </Flex>

        <Divider />

        <Flex align="center" my="2">
          <Box mr="2">
            <Skeleton height="20px" width="20px" borderRadius="50%" />
          </Box>
          <Box>
            <Skeleton height="10px" width="30px" />
          </Box>
        </Flex>

        <Divider />

        <Stack direction="row" align="center" justify="space-between" my="2">
          <Box>
            <Skeleton height="10px" width="40px" />
          </Box>
          <Box>
            <Skeleton height="10px" width="60px" />
          </Box>
        </Stack>

        <Divider />

        <Skeleton className="checkout-btn" />
      </Box>
    </>
  );
};

export default RestaurantCardsShimmer;
