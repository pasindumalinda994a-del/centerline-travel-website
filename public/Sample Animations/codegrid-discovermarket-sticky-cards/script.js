import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

const cards = gsap.utils.toArray(".spotlight-card");
const pin = () => getComputedStyle(cards[0]).top;

cards.forEach((card, i) => {
  const depth = cards.length - 1 - i;
  if (!depth) return;

  const st = {
    trigger: card,
    start: () => `top ${pin()}`,
    endTrigger: cards.at(-1),
    end: () => `top ${pin()}`,
    scrub: true,
    invalidateOnRefresh: true,
  };

  gsap.to(card, {
    scale: 1 - 0.1 * depth,
    y: -20 * depth,
    ease: "none",
    scrollTrigger: { ...st },
  });

  gsap.to(card.querySelector(".spotlight-face"), {
    opacity: 0,
    ease: "none",
    scrollTrigger: { ...st },
  });
});
