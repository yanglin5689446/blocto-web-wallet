import { Asset } from "../types";


export default function calculateAssetValue (asset: Asset) {
  return (parseInt(asset.value) / 10 ** asset.decimals) * +asset.usd_price;
}

