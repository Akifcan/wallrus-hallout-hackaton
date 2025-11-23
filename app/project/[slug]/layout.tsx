import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Archive - DocScout",
};

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
