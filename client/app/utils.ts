export default function GetIpfsUrlFromPinata(pinataUrl:any) {
    let IPFSUrl = pinataUrl.split("/");
    const lastIndex = IPFSUrl.length;
    IPFSUrl = "https://ipfs.io/ipfs/" + IPFSUrl[lastIndex - 1];
    return IPFSUrl;
  }