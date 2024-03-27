"use client";
import { useAlgorithm } from "@/store/useAlgorithm";

const Header = () => {
  const { algorithm } = useAlgorithm();

  return (
    <>
      <div className="flex justify-around text-white font-custom text-xl mt-8 w-full">
        <div>
          <span className="text-orange-500">Algorithm:</span>
          {algorithm}
        </div>
        <div>
          <span className="text-orange-500">Mode: </span>
          {/* {mode} */}
        </div>
        <div>
          <span className="text-orange-500"> Criteria: </span>

          {/* {criteria} */}
        </div>
      </div>
    </>
  );
};

export default Header;
