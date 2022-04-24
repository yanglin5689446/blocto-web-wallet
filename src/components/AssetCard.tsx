import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Asset } from "../types";

const AssetCard = ({
  color_icon,
  white_icon,
  value,
  decimals,
  name,
  symbol,
  background_color,
  chain_white_icon,
  usd_price,
  type,
}: Asset) => {
  const balance = parseInt(value) / 10 ** decimals;
  return (
    <Box
      bg={`#${background_color}`}
      borderRadius={10}
      p={4}
      my={2}
      pos="relative"
    >
      <Image
        pos="absolute"
        top={0}
        right={-5}
        src={white_icon}
        height="100%"
        opacity={0.3}
      />
      <Box pos="relative" zIndex={2}>
        <Flex mb={3}>
          <Image src={color_icon} />
          <Text mx={2} fontWeight="bold">
            {name}
          </Text>
        </Flex>
        <Text textAlign="end" fontWeight="bold">
          {balance} {symbol}
        </Text>
        <Flex
          direction="row-reverse"
          justifyContent="space-between"
          align="center"
        >
          <Text>≈ {(balance * parseInt(usd_price)).toFixed(2)} USD</Text>
          {type !== "native" && (
            <Flex bg="rgb(0,0,0,.2)" borderRadius="30px" py={1} px={2}>
              <Image src={chain_white_icon} />
              <Text mx={2} color="white">
                {type.toUpperCase()}
              </Text>
            </Flex>
          )}
        </Flex>
      </Box>
    </Box>
  );
};

export default AssetCard;
