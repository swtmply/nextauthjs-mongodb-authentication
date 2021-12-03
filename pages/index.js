import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return <div>Home</div>;
}

// export async function getServerSideProps(context) {
//   const session = await getSession({ req: context.req });

//   // console.log(session);

//   // if (!session) {
//   //   return {
//   //     redirect: {
//   //       destination: "/login",
//   //       permanent: false,
//   //     },
//   //   };
//   // }
//   return {
//     props: { session },
//   };
// }
