import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Stepper = ({
    steps,
    currentStep,
}: {
    steps: { label: string }[];
    currentStep: number;
}) => {
    return (
        <div className="my-4 flex items-center justify-between">
            {steps.map((s, index) => (
                <div
                    key={index}
                    className={cn('flex items-center', {
                        'w-full': index !== steps.length - 1,
                    })}
                >
                    {/* Circle */}
                    <div
                        className={cn(
                            'flex h-8 w-8 items-center justify-center rounded-full text-white',
                            {
                                'bg-gradient-to-r from-secondary to-accent':
                                    currentStep === index + 1,
                                'bg-primary': currentStep > index + 1,
                                'bg-primary/40': currentStep < index + 1,
                            },
                        )}
                    >
                        {index + 1}
                    </div>

                    {/* Animated Connector Line */}
                    {index < steps.length - 1 && (
                        <div className="relative h-[2px] flex-1 overflow-hidden bg-gray-300">
                            <motion.div
                                initial={{ x: '-100%' }}
                                animate={{
                                    x: currentStep > index + 1 ? '0%' : '-100%',
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: 'easeInOut',
                                    delay: index * 0.1,
                                }}
                                className="absolute inset-0 origin-left bg-indigo-600"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;
