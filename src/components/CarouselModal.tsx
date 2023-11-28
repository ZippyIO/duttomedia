'use client';

import { Button, Modal, ModalContent } from '@nextui-org/react';
import { type Image as PrismaImage } from '@prisma/client';

import { XIcon } from 'lucide-react';
import { type ReactNode, useCallback, useEffect, useRef } from 'react';

import Carousel from '~/components/Carousel';
import { useSearchParams } from '~/hooks/use-search-params';

type CarouselModalProps = {
  images: Omit<PrismaImage, 'collectionId'>[];
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: () => void;
  children?: ReactNode;
};

const CarouselModal = ({ images, isOpen, onClose, onOpenChange, children }: CarouselModalProps) => {
  const modalRef = useRef<HTMLElement>(null);
  const { deleteSearchParam } = useSearchParams();

  const handleClose = useCallback(() => {
    deleteSearchParam('image');
    onClose();
  }, [deleteSearchParam, onClose]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (event.target instanceof HTMLElement && event.target.id === 'modal-image') {
        return;
      } else if (
        event.target instanceof HTMLElement &&
        event.target.classList.contains('modal-bottom-image')
      ) {
        return;
      }

      if (modalRef.current && modalRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, handleClose]);

  return (
    <>
      <Modal
        ref={modalRef}
        isOpen={isOpen}
        onClose={handleClose}
        onOpenChange={onOpenChange}
        hideCloseButton
        backdrop="blur"
        size="full"
      >
        <ModalContent className="fixed inset-0 z-10 flex items-center justify-center bg-transparent">
          <div className="flex w-full max-w-7xl justify-end justify-self-start">
            <Button
              onClick={() => onClose()}
              isIconOnly
              radius="full"
              size="lg"
              variant="flat"
              color="secondary"
              className="absolute right-3 top-3"
              style={{
                transform: 'translate3d(0, 0, 0)',
              }}
            >
              <XIcon size={24} />
            </Button>
          </div>
          <Carousel images={images} />
        </ModalContent>
      </Modal>
      {children}
    </>
  );
};

export default CarouselModal;
