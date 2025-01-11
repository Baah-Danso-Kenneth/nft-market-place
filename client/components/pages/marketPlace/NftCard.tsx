import Link from "next/link";
import GetIpfsUrlFromPinata from "../../../app/utils";
import Image from "next/image";

type NftCarouselProp = {
  name: string;
  title: string;
  image: string;
  tokenId: string;
  description: string;
  price?: string;
  date_created?: string;
  category?: string;
  buzz?: string;
  sold?: boolean;
  isVertical?: boolean;
  promo?: boolean;
};

function NftCard({ nft }: { nft: NftCarouselProp }) {
  const IPFSUrl = GetIpfsUrlFromPinata(nft.image);

  return (
    <Link href={`/nft/${nft.tokenId}`}>
      <div className="w-80">
        <Image
          alt={nft.title}
          src={IPFSUrl}
          width={1920}
          height={1080}
          className="h-80 w-80 object-cover object-top"
        />

        <div className="border border-black grid grid-cols-3 font-nunito uppercase w-80">
          <div className="border-r border-black font-extrabold text-center p-2">
            {nft.price}
          </div>
          <div className="border-r border-black font-allura p-2 truncate">
            {nft.title}
          </div>
          <div className="ml-3 p-2">{nft.name}</div>
        </div>
      </div>
    </Link>
  );
}

export default NftCard;
