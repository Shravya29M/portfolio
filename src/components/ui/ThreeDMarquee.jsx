import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const techImages = [
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=300&fit=crop',
];

export default function ThreeDMarquee({ images = techImages, className }) {
  const chunkSize = Math.ceil(images.length / 3);
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        'mx-auto block overflow-hidden rounded-md',
        'h-[400px] md:h-[500px]',
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="aspect-square w-[700px] shrink-0 scale-110 md:scale-125">
          <div
            style={{ transform: 'rotateX(45deg) rotateY(0deg) rotateZ(45deg)' }}
            className="relative top-0 right-[-55%] grid size-full origin-top-left grid-cols-3 gap-4"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
                key={colIndex + 'marquee'}
                className="flex flex-col items-start gap-4"
              >
                {subarray.map((src, imageIndex) => (
                  <div className="relative" key={imageIndex + src}>
                    <img
                      className="aspect-video h-full w-full rounded-lg bg-neutral-100 object-cover select-none"
                      src={src}
                      draggable={false}
                      alt={`Tech image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
