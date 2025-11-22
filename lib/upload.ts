import axios from "axios";

export default async function upload(file: any, contentType: string) {
  const response = await axios.put(
    `https://publisher.walrus-testnet.walrus.space/v1/blobs?epochs=5`,
    file,
    {
      headers: {
        "Content-Type": contentType,
      },
    }
  );

  const blobId = response.data?.newlyCreated?.blobObject?.blobId;
  if (!blobId) {
    throw new Error("BlobId not found in Walrus response");
  }

  return blobId;
}
