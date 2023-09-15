"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    signOut({
      callbackUrl: `${window.location.origin}/sign-in`,
    });
  });
  return;
};

export default page;
