"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const Page = () => {
  useEffect(() => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  });
  return;
};

export default Page;
