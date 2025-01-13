export default function GetIpfsUrlFromPinata(pinataUrl: string): string {
  const IPFSUrlParts = pinataUrl.split("/");
  const lastIndex = IPFSUrlParts.length - 1;
  const IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrlParts[lastIndex];
  return IPFSUrl;
}
