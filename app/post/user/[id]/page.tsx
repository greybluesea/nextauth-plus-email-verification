import Backdrop from "@/app/components/Backdrop";
import PostCard from "@/app/components/PostCard";
import UserProfile from "@/app/components/UserProfile";
import { authOptions } from "@/app/utils/authOptions";
import getUserPosts from "@/app/utils/getUserPosts";
import { verifyJWT } from "@/app/utils/unused/jwt";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { title } from "process";
import React from "react";

const page = async ({ params }: { params: { id: number } }) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const { accessToken, ...simpliedUser } = user!;

  /*  const res = await fetch(`http://localhost:3000/api/post/user/${params.id}`
   //, { cache: "no-cache",} 
   ); 
   
   const userPosts = await res.json();
   */
  if (!session?.user.emailVerified)
    return (
      <div className="mt-20">{"Please check your email for verification."}</div>
    );

  if (session?.user.id != params.id)
    return <div className="mt-20">{"unauthorized!"}</div>;

  /* if (!accessToken || !verifyJWT(accessToken))
    return <div>{"unauthorized!"}</div>; */

  const userPosts = await getUserPosts(+params.id);

  return (
    <>
      <div className="fixed flex h-screen w-full max-w-[1220px] flex-col items-center p-24 ">
        <div className="flex flex-col items-start w-full">
          <h3>Email: {simpliedUser.email}</h3>
          <br />
          <h3>Posts:</h3>

          <div className="flex flex-row flex-wrap justify-center gap-6 ">
            {userPosts.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                content={post.content || ""}
                published={post.published}
                author={post.author.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <Backdrop /> */}
    </>
  );
};

export default page;
