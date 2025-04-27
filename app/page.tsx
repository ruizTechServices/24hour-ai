import Link from "next/link";
import ClerkHeader from "@/components/ClerkHeader";

export default function Home() {
  return (
    <>
    <Link href="/chat" className="text-blue-500">Chat</Link>
    <ClerkHeader />

    <!-- THe landing page will be modified at a later time. The main product is the chat page DO NOT WORK ON THIS -->
    </>
  );
}