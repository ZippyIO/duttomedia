'use client';

import { Button } from '@nextui-org/react';

import { UploadCloudIcon, XIcon } from 'lucide-react';
import * as React from 'react';
import { type DropzoneOptions, useDropzone } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';

import { useImageDropzone } from '~/hooks/use-image-dropzone';
import { type ImageFile } from '~/types/types';

const variants = {
  base: 'relative rounded-medium flex justify-center items-center flex-col cursor-pointer min-h-[150px] min-w-[200px] border border-dashed border-content3 transition-colors duration-200 ease-in-out',
  image: 'border-0 p-2 min-h-0 min-w-0 relative shadow-md bg-content2 rounded-md',
  active: 'border-2',
  disabled: 'border-gray-300 cursor-default pointer-events-none bg-opacity-30 bg-gray-700',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

export type SingleImageDropzoneProps = {
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
  value?: File | string;
  width: string | number;
  height: string | number;
  disabled?: boolean;
  className?: string;
  imgClassName?: string;
  onChange?: (file?: ImageFile) => void | Promise<void>;
};

const SingleImageDropzone = React.forwardRef<HTMLInputElement, SingleImageDropzoneProps>(
  ({ dropzoneOptions, value, width, height, disabled, className, imgClassName, onChange }, ref) => {
    const {
      getRootProps,
      getInputProps,
      acceptedFiles,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: { 'image/*': [] },
      multiple: false,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
          handleOnChange(file);
        }
      },
      ...dropzoneOptions,
    });

    const { imageUrl, errorMessage, getImageDimensions } = useImageDropzone({
      value: value,
      fileRejections: fileRejections,
      dropzoneOptions: dropzoneOptions,
    });

    async function handleOnChange(file: File) {
      if (file) {
        try {
          const imageDimensions = await getImageDimensions(file);
          onChange?.({ file, properties: imageDimensions });
          console.log('file', file);
          console.log('imageDimensions', imageDimensions);
        } catch {
          onChange?.({ file, properties: undefined });
        }
      }
    }

    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          imageUrl && variants.image,
          (isDragReject ?? fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [isFocused, imageUrl, fileRejections, isDragAccept, isDragReject, disabled, className],
    );

    return (
      <div>
        <div
          {...getRootProps({
            className: dropZoneClassName,
            style: {
              width,
              height,
            },
          })}
        >
          <input ref={ref} {...getInputProps()} />

          {imageUrl ? (
            <img
              className={twMerge('object-contain" h-full w-full rounded-md', imgClassName)}
              src={imageUrl}
              alt={acceptedFiles[0]?.name}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-xs text-gray-400">
              <UploadCloudIcon className="mb-2 h-7 w-7" />
              <div className="text-gray-400">drag & drop to upload</div>
              <div className="mt-3">
                <Button disabled={disabled} size="sm" variant="ghost">
                  select
                </Button>
              </div>
            </div>
          )}

          {imageUrl && !disabled && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                void onChange?.(undefined);
              }}
              aria-label="Remove photo"
              isIconOnly
              size="sm"
              variant="bordered"
              color="danger"
              className="absolute right-1 top-1 h-unit-lg min-h-unit-7 w-unit-lg min-w-unit-7"
            >
              <XIcon size={14} />
            </Button>
          )}
        </div>

        <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
      </div>
    );
  },
);
SingleImageDropzone.displayName = 'SingleImageDropzone';

export default SingleImageDropzone;
