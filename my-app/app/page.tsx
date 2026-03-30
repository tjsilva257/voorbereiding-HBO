import Image from "next/image";
import { Card } from "@/components/Card";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-90 from-sky-500 to-indigo-500 font-sans dark:bg-black">
      <main className="grid grid-cols-1 grid-rows-3 min-h-screen w-full max-w-3xl sm:items-start">
        <div className="text-white p-4 m-5 rounded-lg text-center">
          <h1 className="text-4xl font-bold">
            Zoek jouw gepaste opleiding!
          </h1>
        </div>
        <div className="flex justify-center items-start">
          <Button></Button>
        </div>
      </main>
    </div>
  );
}
