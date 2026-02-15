/**
 * Komponent ComingSoonBanner – wyświetla gradientowe tło z nagłówkiem.
 * Dodano tekst „Coming Soon” na środku ekranu oraz dwie lampy oświetlające napis.
 */
import Image from "next/image";

const ComingSoonBanner = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      {/* Tło – delikatny gradient */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(111, 111, 255, 0.4), transparent 70%)",
        }}
      />
      {/* Lampy po lewej i prawej stronie */}
      <Image
        src="/lights/left-lamp.png"
        alt="Lewy reflektor"
        width={450}
        height={450}
        className="absolute -top-4 left-0 w-[30vw] max-w-sm select-none pointer-events-none"
        priority
      />
      <Image
        src="/lights/right-lamp.png"
        alt="Prawy reflektor"
        width={450}
        height= {450}
        className="absolute -top-4 right-0 w-[30vw] max-w-sm select-none pointer-events-none"
        priority
      />
      {/* Kontener na treść – napis i opis */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-primary">
          Coming&nbsp;Soon
        </h1>
        <p className="mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground">
          OneScreen już wkrótce. Zapisz się do bety, aby jako pierwszy
          dowiedzieć się o premierze!
        </p>
      </div>
    </section>
  );
};

export default ComingSoonBanner;
