import React, {FC} from 'react';
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: any) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i, type: "spring", duration: 1.1, bounce: 0 },
      opacity: { delay: i, duration: 0.01 }
    }
  })
};

const lineColor = '#528d4e'

export const Nav: FC = () => {
    return (
        <nav>
          <motion.svg
            width="70"
            height="70"
            viewBox="0 0 70 60"
            initial="hidden"
            animate="visible"
            style={{ marginLeft: "-10px" }} 
          >
        <motion.line
      x1="20"
      y1="20"
      x2="30"
      y2="40"
      stroke={lineColor}
      strokeWidth="4"
      variants={draw}
      custom={0.5}
    />
<motion.line
  x1="30"
  y1="40"
  x2="40"
  y2="20"
  stroke={lineColor}
  strokeWidth="4"
  variants={draw}
  custom={1}
/>
<motion.line
  x1="40"
  y1="20"
  x2="50"
  y2="40"
  stroke={lineColor}
  strokeWidth="4"
  variants={draw}
  custom={1.5}
/>
<motion.line
  x1="50"
  y1="40"
  x2="60"
  y2="20"
  stroke={lineColor}
  strokeWidth="4"
  variants={draw}
  custom={2}
/>

          </motion.svg>
          <h1>Wordle</h1>
        </nav>
    )
}
