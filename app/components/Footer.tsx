import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className=" none lg:fixed bottom-16 flex flex-row justify-center">
      <ul className="hidden fixed bottom-20 lg:flex lg:flex-col mt-auto  mx-auto  justify-end items-center text-gray-500 bg-transparent space-y-1 px-7 py-5 rounded-xl w-160">
        <li>NextAuth + email verification(NodeMailer)</li>
        <li>Prisma + PostgreSQL + schema migrations for change</li>
        <li>customized ‘session’ object + server action for Register form</li>
        <li>learned from Sakura Dev, Antonio, & Ethan Mick</li>
        <li>powered by greybluesea</li>
      </ul>
    </footer>
  );
};

export default Footer;
