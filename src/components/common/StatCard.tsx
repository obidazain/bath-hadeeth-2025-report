import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';
import { formatNumber } from '../../utils/formatters';

interface StatCardProps {
  title: string;
  value: number;
  icon?: React.ReactNode;
  color?: string;
  suffix?: string;
  delay?: number;
  useRawValue?: boolean;
  animate?: boolean;
}

export function StatCard({
  title,
  value,
  icon,
  color = '#2383e2',
  suffix = '',
  delay = 0,
  useRawValue = false,
  animate = true
}: StatCardProps) {
  const animatedValue = useCountUp({
    end: value,
    duration: 2000,
    delay: (delay + 0.3) * 1000, // Convert to ms and add extra delay for entrance
  });

  const displayValue = animate
    ? (useRawValue ? animatedValue.toString() : formatNumber(animatedValue))
    : (useRawValue ? value.toString() : formatNumber(value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card card-hover p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-notion-text-secondary text-sm mb-2">{title}</p>
          <motion.p
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="text-4xl font-bold tabular-nums"
            style={{ color }}
          >
            {displayValue}{suffix}
          </motion.p>
        </div>
        {icon && (
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${color}15` }}
          >
            {icon}
          </div>
        )}
      </div>
    </motion.div>
  );
}
