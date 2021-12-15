import { useSession, getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/login");
  }, [session]);

  if (status === "loading") return <p></p>;

  return (
    <div className="center">
      <h1>Welcome {session?.user.name}</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
}
