import { Box } from "@chakra-ui/react";
import { Asset } from "../types";
import AssetCard from "./AssetCard";

const AssetGroup = ({ name, assets }: { name: string; assets: Asset[] }) => {
  return (
    <Box cursor="pointer">
      {assets.map((asset, index) => (
        <AssetCard key={asset.id} {...asset} />
      ))}
    </Box>
  );
};

export default AssetGroup;
