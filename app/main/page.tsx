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
  return (
    <>
      <Header algorithm={algorithm} />
      <Separator className=" mt-4 w-[90%] mx-auto" />
      <Main algorithm={algorithm} />
      <Chart />
    </>
  );
};

export default Page;
