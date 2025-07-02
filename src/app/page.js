import { redirect } from "next/navigation";

export default function Home() {
  redirect("/main"); // Force redirect to /main
}
