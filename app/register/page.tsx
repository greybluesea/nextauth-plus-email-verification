import React from "react";
import InputItem from "./components/InputItem";
import prisma from "@/prisma/prismaClient";
import * as bcrypt from "bcrypt";
import { redirect } from "next/navigation";
//import { signIn } from "next-auth/react";
import { randomUUID } from "crypto";

import transporter from "../utils/nodemailer";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

type Props = {};

const page = (props: Props) => {
  async function registerUser(data: FormData) {
    "use server";
    const user = await prisma.user.create({
      data: {
        name: data.get("name") as string,
        email: data.get("email") as string,
        hashedPassword: await bcrypt.hash(data.get("password") as string, 10),
      },
    });

    if (!user) {
      return { error: "Something went wrong" };
    } else {
      const { hashedPassword, ...userWithoutPassword } = user;
      //  console.log(userWithoutPassword);

      const token = await prisma.verifyToken.create({
        data: {
          userId: user.id,
          token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ""),
        },
      });

      const info = await transporter.sendMail({
        from: `"EmailVerifier"<${process.env.BESTMAIL_ADDRESS}>`, // sender address
        to: user.email, // list of receivers
        subject: "Email Verification ✔", // Subject line
        /* text: `Hello ${capitalizeFirstLetter(
          user.name
        )}, please click on the link below to verify your email address: `, */ // plain text body
        html: `<p>Hello ${capitalizeFirstLetter(
          user.name
        )}, </p>  <p>Please click on the link below to verify your email address: <a href="${
          process.env.NEXTAUTH_URL
        }/api/verification/${token.token}">${
          process.env.NEXTAUTH_URL
        }/api/verification/${token.token}</a></p> `, // html body
      });

      console.log(
        "Verification email sent to: " + user.name + " ",
        info.messageId
      );

      /*  setTimeout(async () => {
        await fetch(`${process.env.NEXTAUTH_URL}/api/auth/authorize`, {
          method: "POST",
          body: JSON.stringify({
            email: data.get("email") as string,
            password: data.get("password") as string,
          }),
        });
      }, 5000);

      setTimeout(() => {
        redirect("/post/user");
      }, 9000); */

      redirect("/register/success");
    }
  }

  return (
    <form action={registerUser} className="max-w-sm py-4 px-8 space-y-3">
      <InputItem name={"name"} type="text" />
      <InputItem name={"email"} />
      <InputItem name={"password"} />
      <div className="pt-3">
        <button type="submit" className="bg-orange-600 btn flex w-full">
          Register as a New User
        </button>
      </div>
    </form>
  );
};

export default page;
