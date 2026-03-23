import Image from "next/image";
import { Card } from "@/components/Card";
import Button from "@/components/Button";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="grid grid-cols-1 grid-rows-3 min-h-screen w-full max-w-3xl bg-white dark:bg-black sm:items-start">
        <div className="bg-mauve-400 p-4 m-5 rounded-lg text-center">
          <h1 className="text-2xl font-bold">
            Zoek jouw gepaste opleiding!
          </h1>
        </div>
        <div>
          <Button></Button>
        </div>
      </main>
    </div>
  );
}
