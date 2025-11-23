import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Articles - DocScout",
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
