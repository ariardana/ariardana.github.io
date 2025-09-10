'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface StaggeredAnimationProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  initialDelay?: number
}

export default function StaggeredAnimation({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0
}: StaggeredAnimationProps) {
  const childrenArray = Array.isArray(children) ? children : [children]
  
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: staggerDelay, delayChildren: initialDelay }}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5,
                ease: [0.25, 0.1, 0.25, 1]
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}