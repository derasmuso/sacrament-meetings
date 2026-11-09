import Image from "next/image";
import temple from '@/public/temple.webp';

export default function Home() {
  return (
    <section className="relative h-64 sm:h-96 w-full">
      <Image
        src={temple}
        alt="Orem Utah Temple"
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h1 className="text-white text-3xl sm:text-5xl font-bold">
          Sacrament Meeting Planner
        </h1>
      </div>
    </section>
  );
}
