import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { cn } from "@/lib/utils";
import Link from "next/link";

const SignInButton = async () => {
  const session = await getAuthSession();
  return (
    <Link
      href="/sign-in"
      className={session ? "hidden" : cn(buttonVariants(), "whitespace-nowrap")}
    >
      Sign In
    </Link>
  );
};

export default SignInButton;
