import type { Variants } from 'framer-motion';

export const boxVariants: Variants = {
  initial: {
    x: 500,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween' },
  },
  exit: {
    x: -500,
    opacity: 0,
  },
};
