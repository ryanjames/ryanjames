// src/animations/animationVariants.ts
export const titleVariants = {
  initial: { opacity: 0, y: -20, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    filter: "blur(10px)",
    transition: { duration: 0.4, ease: "easeIn" },
  },
};

export const paragraphVariants = {
  initial: { opacity: 0, x: -30, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    x: 30,
    filter: "blur(10px)",
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

export const buttonVariants = {
  initial: { opacity: 0, scale: 0.5, filter: "blur(10px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: "backOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    filter: "blur(10px)",
    transition: { duration: 0.3, ease: "easeIn" },
  },
};
