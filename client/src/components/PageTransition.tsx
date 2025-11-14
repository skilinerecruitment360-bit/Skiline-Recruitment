import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const variants = {
  hidden: { opacity: 0, x: -20, y: 0 },
  enter: { 
    opacity: 1, 
    x: 0, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    x: 0, 
    y: 20,
    transition: {
      duration: 0.2
    }
  }
};

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = '' }: PageTransitionProps) {
  const [location] = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial="hidden"
        animate="enter"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
