'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Input,
  Progress,
  Textarea,
} from '@nextui-org/react';
import { type Category as PrismaCategory } from '@prisma/client';

import { type FormHTMLAttributes, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { type z } from 'zod';

import SingleImageDropzone from '~/components/dashboard/image/SingleImageDropzone';
import useFileUpload from '~/hooks/use-file-upload';
import { getFileId } from '~/lib/utils';
import { type CollectionPayload, CollectionValidator } from '~/lib/validators/Collection';
import { type ImagePayload, ImageValidator } from '~/lib/validators/Image';
import { createCollection } from '~/server/collection';
import { type ImageFile } from '~/types/types';

type Category = Pick<PrismaCategory, 'id' | 'name'>;

export type CollectionFormProps = FormHTMLAttributes<HTMLFormElement> & {
  categories: Category[];
  redirectPath?: string;
};

const FormSchema = CollectionValidator.extend({
  imageName: ImageValidator.shape.name,
  imageDescription: ImageValidator.shape.description,
  imageAlt: ImageValidator.shape.alt,
});
type FormValues = z.infer<typeof FormSchema>;

const CollectionForm = ({ categories, redirectPath, ...props }: CollectionFormProps) => {
  const [file, setFile] = useState<ImageFile>({ file: undefined, properties: undefined });

  const { progress, uploadFile } = useFileUpload();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
      imageName: '',
      imageDescription: '',
      imageAlt: '',
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

    const collectionPayload: CollectionPayload = {
      name: data.name,
      description: data.description?.length ? data.description : undefined,
      categoryId: categories.find((category) => category.name === data.categoryId)?.id,
    };
    const imagePayload: ImagePayload = {
      name: data.imageName,
      description: data.imageDescription,
      alt: data.imageAlt,
      fileId: getFileId(uploadedFile.url),
      url: uploadedFile.url,
      width: file.properties?.width ?? 0,
      height: file.properties?.height ?? 0,
    };

    const newCollection = Promise.resolve(
      createCollection(collectionPayload, imagePayload, redirectPath),
    );
    toast.promise(
      newCollection,
      {
        loading: 'Creating Collection...',
        success: 'Successfully created Collection',
        error: 'Failed to create Collection',
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
      <h3 className="text-large font-medium">Collection</h3>
      <Controller
        control={form.control}
        name="name"
        render={({ field: { value, onChange } }) => (
          <Input
            value={value}
            onChange={onChange}
            isRequired
            label="Name"
            placeholder="Enter a name"
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
          />
        )}
      />
      <Controller
        control={form.control}
        name="categoryId"
        render={({ field: { value, onChange } }) => (
          <Autocomplete value={value} onInputChange={onChange} label="Category">
            {categories.map((category) => (
              <AutocompleteItem key={category.id}>{category.name}</AutocompleteItem>
            ))}
          </Autocomplete>
        )}
      />
      <Divider />
      <h3 className="text-large font-medium">Cover Image</h3>
      <Controller
        control={form.control}
        name="imageName"
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
        name="imageDescription"
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
        name="imageAlt"
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
      <SingleImageDropzone
        value={file.file}
        onChange={(file) => {
          setFile(file ? file : { file: undefined, properties: undefined });
        }}
        width={400}
        height={600}
        imgClassName="object-cover"
      />
      <Progress aria-label="Upload progress" value={progress} color="secondary" />
      <Button type="submit" color="primary">
        Create
      </Button>
    </form>
  );
};

export default CollectionForm;
