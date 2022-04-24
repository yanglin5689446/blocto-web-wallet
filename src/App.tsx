import { useContext, useEffect, useMemo, useState } from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import Header from "./components/Header";
import AssetGroup from "./components/AssetGroup";
import AuthContext from "./context/auth";
import withContext from "./context";
import { Asset } from "./types";
import Statistics from "./components/Statistics";
import calculateAssetValue from "./utils/calculateAssetValue";

const isMainnet = process.env.REACT_APP_NETWORK === "mainnet";
const BACKEND_URL = isMainnet
  ? "https://flow-wallet.blocto.app/blocto"
  : "https://flow-wallet-testnet.blocto.app/blocto";

const App = () => {
  const { user, accessToken, points } = useContext(AuthContext);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [transactions, setTransactions] = useState([]);

  const enabledAssets = assets.filter((asset) => asset.status === "confirmed");

  const totalAssetsValue = enabledAssets
    .map((asset) => calculateAssetValue(asset))
    .reduce((acc, cur) => acc + cur, 0);

  const assetsGroup = useMemo(() => {
    const result: {
      [key: string]: {
        color: string;
        value: number;
        assets: Asset[];
      };
    } = {};
    enabledAssets.forEach((asset) => {
      if (asset.status !== "confirmed") return;
      if (!result[asset.group]) {
        result[asset.group] = {
          color: asset.background_color,
          value: calculateAssetValue(asset),
          assets: [asset],
        };
      } else {
        result[asset.group].value += calculateAssetValue(asset);
        result[asset.group].assets.push(asset);
      }
    });
    return result;
  }, [enabledAssets]);

  useEffect(() => {
    if (accessToken) {
      fetch(`${BACKEND_URL}/account/assets`, {
        headers: {
          Accept: "application/json",
          authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => setAssets(data.assets));

      fetch(`${BACKEND_URL}/account/transactions`, {
        headers: {
          Accept: "application/json",
          authorization: accessToken,
        },
      })
        .then((response) => response.json())
        .then((data) => setTransactions(data.transactions));
    }
  }, [accessToken]);

  return (
    <Box>
      <Header />
      {user?.addr && (
        <Flex px={10} py={5}>
          <Box flex="1" px={5}>
            <Text fontWeight="bold" fontSize="2rem" align="center">
              Total Asset Value
            </Text>
            <Text fontSize="1.75rem" align="center">
              ≈ {totalAssetsValue.toFixed(2)} USD
            </Text>
            {points != null && (
              <Box textAlign="center">
                <Text fontWeight="bold" align="center" d="inline">
                  {points}
                </Text>{" "}
                Blocto Points
              </Box>
            )}
            <Flex justifyContent="center">
              <Statistics assetGroups={assetsGroup} />
            </Flex>
            <Text fontWeight="bold" fontSize="1.5rem" align="center" my={3}>
              Recent Transactions
            </Text>
            <Box>
              {transactions.slice(0, 10).map((transaction: any) => (
                <Box
                  key={transaction.id}
                  mb={3}
                  py={3}
                  borderBottom="1px solid #aaaaaa"
                >
                  <Flex align="center" justifyContent="space-between">
                    <Text fontWeight="bold" fontSize="1.5rem">
                      {transaction.blockchain}
                    </Text>
                    <Text>
                      {new Date(transaction.created_at * 1000).toString()}
                    </Text>
                  </Flex>

                  <Text fontWeight="bold">
                    TX Hash: {transaction.tx_hash || "Unconfirmed"}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
          <Box flex="1">
            {Object.entries(assetsGroup).map(([name, group]) => (
              <AssetGroup key={name} name={name} assets={group.assets} />
            ))}
          </Box>
        </Flex>
      )}
    </Box>
  );
};

export default withContext(App);
