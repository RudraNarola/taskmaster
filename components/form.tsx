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
import { Separator } from "./ui/separator";

export function Form() {
  const router = useRouter();
  const { data, setData } = useData();
  const [algorithm, setAlgorithm] = useState("");
  const [tq, setTq] = useState(0);

  const [file, setFile] = useState(null);
  const [choice, setChoices] = useState("default");
  const [showEntryTable, setShowEntryTable] = useState(false);

  const [ATValue, setATValue] = useState<number | null>();
  const [BTValue, setBTValue] = useState<number | undefined>();
  const [priorityValue, setPriorityValue] = useState<number | undefined>();

  const [tableValue, setTableValue] = useState([]);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!file) {
      console.log(tableValue);
      const data = makeTabluarData(tableValue, algorithm, "manual");
      setData(data);

      console.log(data);
    } else {
      const fileReader = new FileReader();
      let content: string | ArrayBuffer;
      fileReader.onload = (e) => {
        content = e.target?.result || "";

        const data = makeTabluarData(content, algorithm, "csv");

        setData(data);
      };

      fileReader.readAsText(file);
    }
    if (algorithm == "rr") {
      router.push(`/main?algorithm=${algorithm}&tq=${tq}`);
    } else {
      router.push(`/main?algorithm=${algorithm}`);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEnterValues = () => {
    setChoices("enter");
    setShowEntryTable(true);
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
              <SelectItem value="psanp">
                Priority Schedule Algorithm - NP
              </SelectItem>
              <SelectItem value="psap">
                Priority Schedule Algorithm - P
              </SelectItem>
              <SelectItem value="hrrn">Highest Response Ratio Next</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {algorithm == "rr" ? (
          <Input
            type="number"
            className="text-white w-32 bg-black/15"
            placeholder="Time Quantum"
            onChange={(e) => {
              setTq(+e.target.value);
            }}
            required
          />
        ) : null}

        {choice == "default" || !file ? (
          <>
            <Button
              onClick={handleEnterValues}
              className="text-black bg-white/80 px-2 py-0.5 text-sm font-custom hover:bg-white"
              type="button"
            >
              Enter Values
            </Button>
            {choice != "enter" ? (
              <span className="font-custom text-white">OR</span>
            ) : null}
          </>
        ) : null}

        {choice != "enter" ? (
          <Input
            type="file"
            className="w-60 text-white bg-black/15"
            onChange={handleFileChange}
            onClick={() => setChoices("csv")}
            required
            accept=".csv"
          />
        ) : null}
      </div>

      {choice === "enter" ? (
        <div className="bg-black/30 py-4 mt-8 mx-auto w-2/3 rounded-lg shadow-md flex flex-col gap-4 justify-center items-center">
          <h2 className="text-white text-xl font-custom">Enter Values</h2>
          <div className="flex flex-row justify-center items-center gap-4 ">
            <Input
              type="number"
              className="text-white w-32 bg-black/15"
              placeholder="Arrival Time"
              onChange={(e) => {
                setATValue(+e.target.value);
              }}
              value={ATValue}
              required
            />
            <Input
              type="number"
              className="text-white w-32 bg-black/15"
              placeholder="Burst Time"
              onChange={(e) => {
                setBTValue(+e.target.value);
              }}
              value={BTValue}
              required
            />
            {algorithm == "psanp" || algorithm == "psap" ? (
              <Input
                type="number"
                className="text-white w-32 bg-black/15"
                placeholder="Priority"
                onChange={(e) => {
                  setPriorityValue(+e.target.value);
                }}
                value={priorityValue}
                required
              />
            ) : null}
            <Button
              type="reset"
              onClick={(e) => {
                e.preventDefault();
                setTableValue([
                  ...tableValue,
                  [ATValue, BTValue, priorityValue],
                ]);
              }}
              className="bg-gray-300 hover:bg-gray-500 text-black"
            >
              Add
            </Button>
          </div>

          {tableValue.length > 0 ? (
            <>
              <Separator className="w-[95%] mx-auto my-2 bg-white/20" />
              <div className="bg-black/40 rounded-md w-[40%] px-4 py-2">
                {tableValue.map((value, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="flex flex-row justify-center items-center gap-4 "
                      >
                        <Input
                          type="number"
                          className="text-white  bg-black/15 border-transparent cursor-default "
                          placeholder="Arrival Time"
                          value={value[0]}
                          readOnly
                          required
                        />
                        <Input
                          type="number"
                          className="text-white bg-black/15 border-transparent cursor-default"
                          placeholder="Burst Time"
                          value={value[1]}
                          readOnly
                          required
                        />
                        {algorithm == "psanp" || algorithm == "psap" ? (
                          <Input
                            type="number"
                            className="text-white  bg-black/15 border-transparent cursor-default"
                            placeholder="Priority"
                            value={value[2]}
                            readOnly
                            required
                          />
                        ) : null}
                        <Button
                          type="button"
                          className=" text-white px-1 py-0"
                          onClick={() => {
                            tableValue.splice(index, 1);
                            setTableValue([...tableValue]);
                          }}
                          variant="ghost"
                          size="sm"
                        >
                          Remove
                        </Button>
                      </div>
                    </>
                  );
                })}
              </div>
            </>
          ) : null}
        </div>
      ) : null}

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
