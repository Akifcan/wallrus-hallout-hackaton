import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Public Research - DocScout",
};

export default function PublishmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
