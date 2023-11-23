'use client';

import { Button, Input, Textarea } from '@nextui-org/react';

import { type FormHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { type CategoryPayload } from '~/lib/validators/Category';
import { createCategory } from '~/server/category';

export type CategoryFormProps = FormHTMLAttributes<HTMLFormElement> & {
  redirectPath?: string;
};

const CategoryForm = ({ redirectPath, ...props }: CategoryFormProps) => {
  const form = useForm<CategoryPayload>({
    defaultValues: {
      name: '',
      description: '',
    },
  });

  async function onSubmit(data: CategoryPayload) {
    const payload: CategoryPayload = {
      name: data.name,
      description: data.description?.length ? data.description : undefined,
    };

    const updateSettings = Promise.resolve(createCategory(payload, redirectPath));
    toast.promise(
      updateSettings,
      {
        loading: 'Creating Category...',
        success: 'Successfully created Category',
        error: 'Failed to create Category',
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
      <Button type="submit" color="primary">
        Create Category
      </Button>
    </form>
  );
};

export default CategoryForm;
