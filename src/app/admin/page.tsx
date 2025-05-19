import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions"; // adjust the path accordingly

import { redirect } from "next/navigation";
import AdminClient from "./AdminClient";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <AdminClient />;
};

export default AdminPage;
