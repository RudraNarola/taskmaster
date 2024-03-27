import Form from "@/components/form"

export default function Home() {
  return (
    <>
      <div className="flex justify-center mt-32">
        <div className="w-full text-7xl font-custom text-center text-white">
          Welcome to
          <span className="text-orange-600 "> TaskMaster </span>
          Visualizer
        </div>
      </div>
      <Form />
    </>
  );
}
