'use client';

import { formatFileSize } from '@edgestore/react/utils';

import { useMemo } from 'react';
import { type DropzoneOptions, type FileRejection } from 'react-dropzone';

import { getImageDimensions } from '~/lib/utils';

export const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

export type UseImageDropzoneProps = {
  value?: File | string;
  fileRejections: FileRejection[];
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
};

export const useImageDropzone = ({
  value,
  fileRejections,
  dropzoneOptions,
}: UseImageDropzoneProps) => {
  const imageUrl = useMemo(() => {
    if (typeof value === 'string') {
      return value;
    } else if (value) {
      return URL.createObjectURL(value);
    }
    return null;
  }, [value]);

  const errorMessage = useMemo(() => {
    if (fileRejections[0]) {
      const { errors } = fileRejections[0];
      if (errors[0]?.code === 'file-too-large') {
        return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
      } else if (errors[0]?.code === 'file-invalid-type') {
        return ERROR_MESSAGES.fileInvalidType();
      } else if (errors[0]?.code === 'too-many-files') {
        return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
      } else {
        return ERROR_MESSAGES.fileNotSupported();
      }
    }
    return undefined;
  }, [fileRejections, dropzoneOptions]);

  return { imageUrl, errorMessage, getImageDimensions };
};
