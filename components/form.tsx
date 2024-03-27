"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { useRouter } from "next/navigation";
import { makeTabluarData } from "@/lib/utils";

import { useData } from "@/store/useData";
import { useAlgorithm } from "@/store/useAlgorithm";

export function Form() {
  const router = useRouter();
  const { data, setData } = useData();
  const { algorithm, setAlgorithm } = useAlgorithm();

  const [file, setFile] = useState(null);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      console.error("No file selected");
      return;
    }

    const fileReader = new FileReader();
    let content, dataArray;
    fileReader.onload = (e) => {
      content = e.target?.result || "";
      console.log(content);

      const data = makeTabluarData(content);

      setData(data);

      console.log("ohh she mine", data);
    };

    fileReader.readAsText(file);
    router.push("/main");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full flex flex-row justify-center items-center mt-12 gap-4">
        <Select
          onValueChange={(e) => {
            setAlgorithm(e);
          }}
          required
        >
          <SelectTrigger className="w-80 bg-black/15 text-white">
            <SelectValue placeholder="Select a algorithm" />
          </SelectTrigger>
          <SelectContent className="bg-black/15 text-white">
            <SelectGroup>
              <SelectItem value="fcfs">First Come First Serve</SelectItem>
              <SelectItem value="sjf">Shortest Job First - NP</SelectItem>
              <SelectItem value="srtf">
                Shortest Remaining Time First - P
              </SelectItem>
              <SelectItem value="rr">Round Robin </SelectItem>
              <SelectItem value="psa">Priority Schedule Algorithm</SelectItem>
              {/* <SelectItem value="srtfio">
                Shortest Remaining Time First with I/O
              </SelectItem> */}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Input
          type="file"
          className="w-60 text-white bg-black/15"
          onChange={handleFileChange}
          required
          accept=".csv"
        />
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button
          className="text-white bg-orange-600 px-6 py-1 text-xl font-custom hover:bg-orange-500"
          disabled={false}
          type="submit"
        >
          Start
        </Button>
      </div>
    </form>
  );
}

export default Form;
