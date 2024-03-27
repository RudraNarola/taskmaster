import Chart from "../../components/chart";
import Header from "../../components/header";
import Main from "../../components/main";
import { Separator } from "../../components/ui/separator";
import React from "react";

const Page = () => {
  return (
    <>
      <Header />
      <Separator className=" mt-4 w-[90%] mx-auto" />
      <Main />
      <Chart />
    </>
  );
};

export default Page;
