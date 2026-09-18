import { createFileRoute } from "@tanstack/react-router";
import { AcquazulExperience } from "@/components/acquazul-experience";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Acquazul — Soluções Químicas, Água e Precisão" },
      { name: "description", content: "Indústria química, tratamento de água, higiene profissional, piscinas e equipamentos em MG, BA e ES desde 1995." },
      { property: "og:title", content: "Acquazul — Soluções Químicas, Água e Precisão" },
      { property: "og:description", content: "Soluções químicas, tratamento de água, higiene profissional e equipamentos desde 1995." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <AcquazulExperience />;
}
