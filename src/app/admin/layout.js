// app/admin/layout.js

import DashboardHeader from "@/components/admin/dashbordHeader/DashbordHeader";

export const metadata = {
  title: "Admin | Dashboard",
  description: "My awesome Next.js App",
};

export default function AdminLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}
