import { Flex, Image, Text } from "@chakra-ui/react";
import WalletChip from "./WalletChip";
import logo from "../assets/logo.png";

const Header = () => (
  <Flex
    justify="space-between"
    align="center"
    boxShadow="0px 4px 8px rgba(0, 0, 0, 0.05)"
    height="60px"
    px={5}
  >
    <Flex align="center">
      <Image src={logo} height="40px" />
      <Text ml="2" fontWeight="bold" fontSize="2rem" letterSpacing={2}>
        Blocto
      </Text>
    </Flex>
    <WalletChip />
  </Flex>
);

export default Header;
