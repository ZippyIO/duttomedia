import CategoriesTable from '~/components/dashboard/category/CategoriesTable';
import { getCategories } from '~/server/category';

const Page = async () => {
  const categories = await getCategories({
    id: true,
    createdAt: true,
    updatedAt: true,
    name: true,
    description: true,
    collections: true,
  });

  return (
    <main className="flex flex-col gap-2">
      <div className="flex justify-center p-2">
        <h2 className="text-2xl font-semibold">Collection Categories</h2>
      </div>
      <div className="px-4">
        <CategoriesTable categories={categories} />
      </div>
    </main>
  );
};

export default Page;
