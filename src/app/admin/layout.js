// import DashboardHeader from "@/components/admin/dashboardHeader/DashboardHeader";

import DashboardHeader from "@/components/admin/dashbordHeader/DashbordHeader";

export const metadata = {
  title: "Admin Panel",
};

export default function DashboardLayout({ children }) {
  return (
    <>
      <DashboardHeader />
      {children}
    </>
  );
}