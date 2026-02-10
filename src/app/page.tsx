"use client";

import { useRouter } from "next/navigation";
import Preloader from "@/components/Preloader";

/** Root page: Preloader that navigates to /home on completion. */
export default function PreloaderPage() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/home");
  };

  return <Preloader onComplete={handleComplete} />;
}
