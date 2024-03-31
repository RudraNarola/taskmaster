"use client";
import { useSearchParams } from "next/navigation";
import Chart from "../../components/chart";
import Header from "../../components/header";
import Main from "../../components/main";
import { Separator } from "../../components/ui/separator";
import React from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const algorithm = searchParams.get("algorithm");
  const tq = searchParams.get("tq");
  console.log(algorithm);
  console.log(tq);
  return (
    <>
      <Header algorithm={algorithm} />
      <Separator className=" mt-6 w-[90%] mx-auto" />
      <Main algorithm={algorithm} tq={+tq} />
    </>
  );
};

export default Page;
