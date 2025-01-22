import { HistoricalImage } from "@/assets/images";

export default function Historical() {
  const timelineEvents = [
    {
      year: "2018",
      title: "Demarrage de l'entreprise",
      description:
        "Fondation de HARVEX GROUPE avec un capital initial dédié aux investissements locaux.",
    },
    {
      year: "2020",
      title: "Expansions",
      description:
        "Expansion des activités à l'international, intégrant des secteurs émergents tels que les énergies renouvelables et les technologies numériques.",
    },
    {
      year: "2022",
      title: "Marketing",
      description:
        "Lancement d'initiatives stratégiques pour promouvoir des investissements responsables.",
    },
  ];

  return (
    <section className="bg-[#F2F2F2]">
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 responvive-p-x py-16">
        <div className="md:w-1/2">
          <h2 className="font-bold text-xl md:text-3xl mb-4">
            Historique de <span className="text-primary">HARVEX GROUPE</span>
          </h2>
          <p className="text-xs md:text-sm">
            Depuis sa création en 2018, HARVEX GROUPE n&apos;a cessé
            d&apos;évoluer pour répondre aux exigences d’un monde en constante
            mutation.
          </p>

          <div className="relative my-7">
            <div className="absolute left-[61px] md:left-[85px] top-0 bottom-2 w-0.5 bg-black" />

            <div className="space-y-12 md:space-y-10">
              {timelineEvents.map((event) => (
                <div
                  key={event.year}
                  className="relative flex items-start gap-4 md:gap-8"
                >
                  <div className="w-10 md:w-12 pt-1 text-right">
                    <span className="text-base md:text-xl text-primary font-semibold">
                      {event.year}
                    </span>
                  </div>
                  <div className="relative z-10 mt-2.5 rounded-full w-3 h-3 bg-primary shrink-0" />
                  <div className="flex-1 pt-1">
                    <h3 className="text-xl md:text-xl font-semibold mb-1">
                      {event.title}
                    </h3>
                    <p className="text-xs md:text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs md:text-sm">
            Aujourd&apos;hui, HARVEX GROUPE se distingue comme un partenaire de
            confiance dans l’écosystème financier mondial.
          </p>
        </div>
        <div className="md:w-1/3">
          <div className="w-auto md:h-[630px]">
            <HistoricalImage alt="" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
}
