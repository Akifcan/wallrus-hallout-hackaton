import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - DocScout",
};

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
