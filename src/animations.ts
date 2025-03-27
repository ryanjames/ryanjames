// src/animations/animationVariants.ts
export const heroVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};
