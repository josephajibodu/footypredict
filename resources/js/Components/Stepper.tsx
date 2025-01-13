import React from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Stepper = ({ steps, currentStep }: {
    steps: { label:string }[],
    currentStep: number
}) => {
    return (
        <div className="flex justify-between items-center my-4">
            {steps.map((s, index) => (
                <div
                    key={index}
                    className={cn("flex items-center", {
                        "w-full": index !== steps.length - 1,
                    })}
                >
                    {/* Circle */}
                    <div
                        className={cn("w-8 h-8 flex items-center justify-center rounded-full text-white", {
                            "bg-gradient-to-r from-secondary to-accent": currentStep === index + 1,
                            "bg-primary": currentStep > index + 1,
                            "bg-primary/40": currentStep < index + 1,
                        })}
                    >
                        {index + 1}
                    </div>

                    {/* Animated Connector Line */}
                    {index < steps.length - 1 && (
                        <div className="flex-1 h-[2px] bg-gray-300 relative overflow-hidden">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{
                                    x: currentStep > index + 1 ? "0%" : "-100%"
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                    delay: index * 0.1
                                }}
                                className="absolute inset-0 bg-indigo-600 origin-left"
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Stepper;