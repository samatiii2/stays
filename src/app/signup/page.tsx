"use client";
import React, {FC, useState} from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {Route} from "@/routers/types";
import {signIn} from "next-auth/react";
import Github from "@/images/Github.svg";


interface User {
  email:string,
  password:string,
  firstName:string,
  lastName:string,
}
export interface PageSignUpProps {}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
    action: () => signIn("google",{ callbackUrl: "/" })
  },
  {
    name: "Continue with Github",
    href: "#",
    icon: Github,
    action: () => signIn("github",{ callbackUrl: "/" })
  },
];

const PageSignUp: FC<PageSignUpProps> = ({}) => {
  const [email, setEmail] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [firstName, setFirstName] = useState<string>()
  const [lastName, setlastName] = useState<string>()
  const router = useRouter();

  async function onSubmit() {
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
      }),
    });

    const data = await response.json();

    if (data.error) {
      toast.error(data.error);
    }

    toast.success("Account created!");
    router.push("/places" as Route);
  }

  return (
    <div className={`nc-PageSignUp  `}>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Signup
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a onClick={item?.action}
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={email}
                onChange={(e)=>setEmail(e?.target?.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
              </span>
              <Input
                  type="password"
                  className="mt-1"
                  value={password}
                  onChange={(e)=>setPassword(e?.target?.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                First name
              </span>
              <Input
                  type="text"
                  className="mt-1"
                  value={firstName}
                  onChange={(e)=>setFirstName(e?.target?.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                First name
              </span>
              <Input
                  type="text"
                  className="mt-1"
                  value={lastName}
                  onChange={(e)=>setlastName(e?.target?.value)}
              />
            </label>
            <ButtonPrimary type="submit" onClick={onSubmit}>Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <Link href="/login" className="font-semibold underline">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
