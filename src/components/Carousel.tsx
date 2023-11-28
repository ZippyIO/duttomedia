'use client';

import { Button } from '@nextui-org/react';
import { type Image as PrismaImage } from '@prisma/client';

import { AnimatePresence, motion, MotionConfig } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';

import { useSearchParams } from '~/hooks/use-search-params';

type CarouselProps = {
  images: Omit<PrismaImage, 'collectionId'>[];
};

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

const Carousel = ({ images }: CarouselProps) => {
  const { getSearchParam, setSearchParam } = useSearchParams();

  const [loaded, setLoaded] = useState(false);
  const [direction, setDirection] = useState(0);
  const [index, setIndex] = useState(Number(getSearchParam('image')) ?? 0);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < images?.length - 1) {
        changeIndex(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeIndex(index - 1);
      }
    },
    trackMouse: true,
  });

  const startIndex = Math.max(index - 15, 0);
  const endIndex = Math.min(index + 15, images.length);
  const filteredImages = images.slice(startIndex, endIndex);

  const changeIndex = useCallback(
    (newIndex: number) => {
      if (newIndex > index) {
        setDirection(1);
      } else {
        setDirection(-1);
      }

      setSearchParam('image', newIndex.toString());
      setIndex(newIndex);
    },
    [index, setSearchParam],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        changeIndex(index - 1);
      } else if (event.key === 'ArrowRight') {
        changeIndex(index + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [changeIndex, index, setSearchParam]);

  useEffect(() => {
    setSearchParam('image', index.toString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MotionConfig
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <div
        className="wide:h-full xl:taller-than-854:h-auto relative z-50 flex aspect-[3/2] w-full max-w-7xl items-center"
        {...handlers}
      >
        <div className="w-full overflow-hidden">
          <div className="relative flex aspect-[3/2] items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute"
              >
                <Image
                  src={images[index].url}
                  width={images[index].width}
                  height={images[index].height}
                  priority
                  alt="Next.js Conf image"
                  onLoad={() => setLoaded(true)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="absolute inset-0 mx-auto flex max-w-7xl items-center justify-center">
          {loaded && (
            <div id="modal-image" className="relative aspect-[3/2] max-h-full w-full">
              {index > 0 && (
                <Button
                  onClick={() => changeIndex(index - 1)}
                  isIconOnly
                  size="lg"
                  radius="full"
                  variant="flat"
                  className="absolute left-3 top-[calc(50%-16px)] bg-black/50 backdrop-blur-lg"
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </Button>
              )}
              {index + 1 < images.length && (
                <Button
                  onClick={() => changeIndex(index + 1)}
                  isIconOnly
                  size="lg"
                  radius="full"
                  variant="flat"
                  className="absolute right-3 top-[calc(50%-16px)] bg-black/50 backdrop-blur-lg"
                  style={{ transform: 'translate3d(0, 0, 0)' }}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </Button>
              )}
            </div>
          )}
          <div className="fixed inset-x-0 bottom-0 z-40 overflow-hidden bg-gradient-to-b from-black/0 to-black/60">
            <motion.div initial={false} className="mx-auto mb-6 mt-6 flex aspect-[3/2] h-14">
              <AnimatePresence initial={false}>
                {filteredImages.map(({ id, url }, i) => (
                  <motion.button
                    initial={{
                      width: '0%',
                      x: `${Math.max((index - 1) * -100, 15 * -100)}%`,
                    }}
                    animate={{
                      scale: i === index ? 1.25 : 1,
                      width: '100%',
                      x: `${Math.max(index * -100, 15 * -100)}%`,
                    }}
                    exit={{ width: '0%' }}
                    onClick={() => changeIndex(i)}
                    key={id}
                    className={`${
                      i === index ? 'z-20 rounded-md shadow shadow-black/50' : 'z-10'
                    } ${i === 0 ? 'rounded-l-md' : ''} ${
                      i === images.length - 1 ? 'rounded-r-md' : ''
                    } relative inline-block w-full shrink-0 transform-gpu overflow-hidden focus:outline-none`}
                  >
                    <Image
                      alt="small photos on the bottom"
                      width={180}
                      height={120}
                      className={`${
                        i === index
                          ? 'brightness-100 hover:brightness-100'
                          : 'brightness-50 hover:brightness-75'
                      } modal-bottom-image h-full transform object-cover transition`}
                      src={url}
                    />
                  </motion.button>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
};

export default Carousel;
