import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TableData = ({
  AT,
  BT,
  TAT,
  CT,
  WT,
  order,
}: {
  AT: [];
  BT: [];
  TAT: [];
  CT: [];
  WT: [];
  order: [];
}) => {
  const dummyArray = Array(AT.length).fill(null);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    setShowTable(true);
  }, []);

  return (
    <div
      className={`mx-auto w-2/3 mt-8 border border-white ${
        showTable ? "opacity-100" : "opacity-0"
      } transition-opacity duration-300`}
    >
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-400 text-center">
              Process No.
            </TableHead>
            <TableHead className="text-gray-400 text-center">
              Arrival Time
            </TableHead>
            <TableHead className="text-gray-400 text-center">
              Burst Time
            </TableHead>
            <TableHead className="text-gray-400 text-center">
              Complete Time
            </TableHead>
            <TableHead className="text-gray-400 text-center">
              Turn Around Time
            </TableHead>
            <TableHead className="text-gray-400 text-center">
              Waiting Time
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyArray.map((_, index) => (
            <TableRow key={index} className="text-white">
              <TableCell className="text-center">P{order[index]}</TableCell>
              <TableCell className="text-center">{AT[index]}</TableCell>
              <TableCell className="text-center">{BT[index]}</TableCell>
              <TableCell className="text-center">{CT[index]}</TableCell>
              <TableCell className="text-center">{TAT[index]}</TableCell>
              <TableCell className="text-center">{WT[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
