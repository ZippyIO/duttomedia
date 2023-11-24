'use client';

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Progress,
  Textarea,
} from '@nextui-org/react';
import { type Collection as PrismaCollection } from '@prisma/client';

import { type FormHTMLAttributes, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import SingleImageDropzone from '~/components/dashboard/image/SingleImageDropzone';
import useFileUpload from '~/hooks/use-file-upload';
import { getFileId } from '~/lib/utils';
import { type ImagePayload, ImageValidator } from '~/lib/validators/Image';
import { createImage } from '~/server/image';
import { type ImageFile } from '~/types/types';

type Collection = Pick<PrismaCollection, 'id' | 'name'>;
export type ImageFormProps = FormHTMLAttributes<HTMLFormElement> & {
  collections: Collection[];
  redirectPath?: string;
};

const FormSchema = ImageValidator.omit({
  name: true,
  fileId: true,
  url: true,
  width: true,
  height: true,
}).extend({ name: z.string().optional() });
type FormValues = z.infer<typeof FormSchema>;

const ImageForm = ({ collections, redirectPath, ...props }: ImageFormProps) => {
  const [file, setFile] = useState<ImageFile>({ file: undefined, properties: undefined });

  const { progress, uploadFile } = useFileUpload();

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      alt: '',
      collectionId: '',
    },
  });

  async function onSubmit(data: FormValues) {
    if (!file.file) {
      return toast.error('Please add an Image');
    } else if (typeof file.file === 'string') {
      return toast.error('Image in string format not supported');
    }

    const res = Promise.resolve(uploadFile(file.file));
    const uploadedFile = await toast.promise(
      res,
      {
        loading: 'Uploading Image...',
        success: 'Successfully uploaded Image',
        error: 'Failed to upload Image',
      },
      {
        position: 'bottom-right',
        style: {
          borderRadius: '12px',
          backgroundColor: '#18181b',
          color: '#ECEDEE',
        },
      },
    );

    if (!uploadedFile) {
      return;
    }

    const payload: ImagePayload = {
      name: data.name ?? '',
      description: data.description,
      alt: data.alt,
      fileId: getFileId(uploadedFile.url),
      url: uploadedFile.url,
      width: file.properties?.width ?? 0,
      height: file.properties?.height ?? 0,
      collectionId: collections.find((collection) => collection.name === data.collectionId)?.id,
    };
    console.log(payload);

    const newImage = Promise.resolve(createImage(payload, redirectPath));
    toast.promise(
      newImage,
      {
        loading: 'Creating Image in DB...',
        success: 'Successfully created Image in DB',
        error: 'Failed to create Image in DB',
      },
      {
        position: 'bottom-right',
        style: {
          borderRadius: '12px',
          backgroundColor: '#18181b',
          color: '#ECEDEE',
        },
      },
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <Controller
        control={form.control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <Input
            value={value}
            onChange={onChange}
            label="Name"
            placeholder="Enter a name"
            size="sm"
          />
        )}
      />
      <Controller
        control={form.control}
        name="description"
        render={({ field: { value, onChange } }) => (
          <Textarea
            value={value}
            onChange={onChange}
            label="Description"
            placeholder="Enter an optional description"
            size="sm"
          />
        )}
      />
      <Controller
        control={form.control}
        name="alt"
        render={({ field: { value, onChange } }) => (
          <Textarea
            value={value}
            onChange={onChange}
            maxRows={2}
            label="Alt"
            placeholder="Enter an optional alt"
            size="sm"
          />
        )}
      />
      <Controller
        control={form.control}
        name="collectionId"
        render={({ field: { value, onChange } }) => (
          <Autocomplete value={value} onInputChange={onChange} label="Collection" size="sm">
            {collections.map((collection) => (
              <AutocompleteItem key={collection.id}>{collection.name}</AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />
      <SingleImageDropzone
        width="100%"
        height={800}
        value={file.file}
        onChange={(file) => {
          setFile(file ? file : { file: undefined, properties: undefined });
        }}
      />
      <Progress aria-label="Upload progress" value={progress} color="secondary" />
      <Button type="submit" color="primary">
        Create Image
      </Button>
    </form>
  );
};

export default ImageForm;
