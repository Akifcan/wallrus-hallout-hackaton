import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Article - DocScout",
};

export default function ArticleDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
