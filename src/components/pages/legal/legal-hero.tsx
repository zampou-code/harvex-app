import { AuthImage } from "@/assets/images";

export function LegalHero() {
  return (
    <div className="relative w-full h-60 md:h-80 overflow-hidden">
      <AuthImage alt="" className="w-full h-full object-cover" />
      <div className="absolute top-0 left-0 w-full h-full bg-primary/70 flex justify-center items-center">
        <h2 className="font-bold text-white text-center text-xl md:text-3xl">
          Conditions Générales et Politiques{" "}
          <span className="text-black">HARVEX GROUPE</span>
        </h2>
      </div>
    </div>
  );
}
