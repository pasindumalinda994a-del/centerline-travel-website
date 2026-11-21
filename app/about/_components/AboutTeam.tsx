"use client";

import Image from "next/image";
import { useRef } from "react";
import { CardCornerArrow } from "@/app/components/ui/CardCornerArrow";
import { CtaButton } from "@/app/components/ui/CtaButton";
import { Eyebrow } from "@/app/components/ui/Eyebrow";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { aboutPage } from "@/app/lib/content/about";
import {
  CARD_FADE,
  gsap,
  prefersReducedMotion,
  registerGsap,
  useGSAP,
} from "@/app/lib/gsap";

function TeamCard({
  member,
  featured = false,
}: {
  member: (typeof aboutPage.team.members)[number];
  featured?: boolean;
}) {
  return (
    <article
      data-team-card
      className={`group relative rounded-xl ${
        featured
          ? "min-h-[420px] lg:col-span-2 lg:min-h-[520px]"
          : "min-h-[420px] lg:min-h-[520px]"
      }`}
    >
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 25vw"
          }
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate/90 via-slate/25 to-transparent" />
      </div>
      <CardCornerArrow />

      <div className="absolute inset-x-0 bottom-0 p-6 lg:p-7">
        <Eyebrow light>{member.role}</Eyebrow>
        <h3
          className={`mt-2 font-medium tracking-tight text-white ${
            featured ? "text-h2 leading-[1.05]" : "text-h3"
          }`}
        >
          {member.name}
        </h3>

        <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] lg:group-focus-within:grid-rows-[1fr]">
          <div className="overflow-hidden">
            <p
              className={`mt-3 leading-relaxed text-white/80 lg:opacity-0 lg:transition-opacity lg:delay-100 lg:duration-400 lg:group-hover:opacity-100 lg:group-focus-within:opacity-100 ${
                featured ? "text-body max-w-[36ch]" : "text-body max-w-[28ch]"
              }`}
            >
              {member.focus}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function AboutTeam() {
  const rootRef = useRef<HTMLElement>(null);
  const { team } = aboutPage;
  const [featured, ...rest] = team.members;

  useGSAP(
    () => {
      registerGsap();
      if (prefersReducedMotion()) return;
      const cards = rootRef.current?.querySelectorAll("[data-team-card]");
      if (!cards?.length) return;
      gsap.from(cards, {
        ...CARD_FADE,
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%",
          once: true,
        },
      });
    },
    { scope: rootRef },
  );

  return (
    <section
      id="team"
      ref={rootRef}
      className="mx-auto w-full max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28"
    >
      <SectionHeader
        className="mb-10 lg:mb-14"
        eyebrow={team.eyebrow}
        title={team.title}
        description={team.description}
        cta={
          <CtaButton href={team.cta.href} variant="dark">
            {team.cta.label}
          </CtaButton>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        <TeamCard member={featured} featured />
        {rest.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
