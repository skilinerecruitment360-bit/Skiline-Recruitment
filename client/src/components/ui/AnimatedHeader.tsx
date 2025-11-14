import { motion } from 'framer-motion';

interface AnimatedHeaderProps {
  title: string;
  description: string;
  className?: string;
}

export function AnimatedHeader({ title, description, className = '' }: AnimatedHeaderProps) {
  return (
    <div className={`text-center space-y-4 ${className}`}>
      <motion.h1
        className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        {title}
      </motion.h1>
      <motion.p
        className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5}}
      >
        {description}
      </motion.p>
    </div>
  );
}
