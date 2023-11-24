'use client';

import { Autocomplete, AutocompleteItem, Button, Input, Textarea } from '@nextui-org/react';
import { type Category as PrismaCategory } from '@prisma/client';

import { type FormHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { type CollectionPayload } from '~/lib/validators/Collection';
import { createCollection } from '~/server/collection';

type Category = Pick<PrismaCategory, 'id' | 'name'>;

export type CollectionFormProps = FormHTMLAttributes<HTMLFormElement> & {
  categories: Category[];
  redirectPath?: string;
};

const CollectionForm = ({ categories, redirectPath, ...props }: CollectionFormProps) => {
  const form = useForm<CollectionPayload>({
    defaultValues: {
      name: '',
      description: '',
      categoryId: '',
    },
  });

  async function onSubmit(data: CollectionPayload) {
    const payload: CollectionPayload = {
      name: data.name,
      description: data.description?.length ? data.description : undefined,
      categoryId: categories.find((category) => category.name === data.categoryId)?.id,
    };

    console.log(payload);
    const updateSettings = Promise.resolve(createCollection(payload, redirectPath));
    toast.promise(
      updateSettings,
      {
        loading: 'Creating Collection...',
        success: 'Successfully created Collection',
        error: 'Failed to create Collection',
      },
      {
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
      <Button type="submit" color="primary">
        Create Collection
      </Button>
    </form>
  );
};

export default CollectionForm;
