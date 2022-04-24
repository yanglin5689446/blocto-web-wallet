import { Box } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import AuthContext from "../context/auth";

const WalletChip = () => {
  const { login, logout, user } = useContext(AuthContext);

  const address = (user as any)?.addr;

  const onWalletClick = useCallback(() => {
    if (!address) {
      login();
    } else {
      logout();
    }
  }, [address, login, logout]);

  return (
    <Box
      as="button"
      d="flex"
      bgColor="#32323D"
      borderRadius={25}
      alignItems="center"
      color="white"
      px={3}
      fontWeight={600}
      minW={110}
      h="40px"
      onClick={onWalletClick}
      transition=".2s all"
      _hover={{
        opacity: 0.8,
      }}
      _active={{
        transform: "scale(0.98)",
      }}
    >
      <Box mx={2}>{address || "Connect Wallet"}</Box>
    </Box>
  );
};

export default WalletChip;
