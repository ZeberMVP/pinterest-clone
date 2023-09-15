import Link from "next/link";
import { Icons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";

const SignUp = () => {
  return (
    <div className="container mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]">
      <div className="flex flex-col space-y-2 text-center">
        <div className="mx-auto h-12 w-12">
          <Icons.pinterest />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mx-auto max-w-xs text-sm">
          By continuing, you are setting up a Pinterest account and agree to our
          User Agreement and Privacy Policy.
        </p>

        {/* Sign in form */}
        <UserAuthForm />

        <p className="px-8 text-center text-sm text-secondary">
          Already a member?{" "}
          <Link
            href="/sign-in"
            className="text-sm underline underline-offset-4 hover:text-foreground"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
