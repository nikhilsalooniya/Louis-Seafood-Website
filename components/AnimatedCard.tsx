'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';

type Props = {
  title: string;
  description: string;
  imageUrl: string;
};

const AnimatedCard = ({ title, description, imageUrl }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="bg-white shadow-md overflow-hidden h-[500px] w-full"
    >
      <div className="relative w-full h-[60%]">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t"
        />
      </div>
      <div className="p-4 h-[40%] flex flex-col justify-start">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-700 text-sm mt-1">{description}</p>
      </div>
    </motion.div>
  );
};

export default AnimatedCard;
