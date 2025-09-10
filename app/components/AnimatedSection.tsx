'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  duration = 0.6
}: AnimatedSectionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration, 
        ease: [0.25, 0.1, 0.25, 1],
        delay 
      }}
    >
      {children}
    </motion.div>
  )
}