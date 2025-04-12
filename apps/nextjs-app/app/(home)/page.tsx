"use client";

import React from "react";
import { useNotificationPolling } from "../../hooks/useNotificationPolling";
import { useSession } from "@repo/auth/better-auth/auth-client";
import LoadingCard from "@repo/ui/organisms/custom/auth/v1/LoadingCard";

const Home = () => {
  const { data: session, status } = useSession();

  useNotificationPolling(session?.user?.id || "", 30000);


  if (status === "loading") {
    return <LoadingCard title="Loading" description="Patience ia a virtue beyond anything" />;
  }


  return <div>
    <pre>
      {JSON.stringify(session, null, 2)}
    </pre>
    </div>
};

export default Home;
