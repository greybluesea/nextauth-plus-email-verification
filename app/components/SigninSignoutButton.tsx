"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type Props = {};

const SigninSignoutButton = (props: Props) => {
  const { status } = useSession();

  /* console.log(session); */

  if (status === "authenticated") {
    return (
      <button
        onClick={() =>
          signOut({ callbackUrl: "/" || process.env.NEXTAUTH_URL })
        }
        className="bg-red-600 btn"
      >
        Sign Out
      </button>
    );
  }
  return (
    <button
      onClick={() => signIn(undefined, { callbackUrl: "/post/user" })}
      className=" bg-green-600 btn"
    >
      Sign In
    </button>
  );
};

export default SigninSignoutButton;
