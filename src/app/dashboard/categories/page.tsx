import { Button, Link } from '@nextui-org/react';

const Page = () => {
  return (
    <main>
      <div className="flex justify-between p-2">
        <div />
        <h2>Collection Categories</h2>
        <Button as={Link} href="/dashboard/categories/create" size="sm" color="secondary">
          Create Category
        </Button>
      </div>
    </main>
  );
};

export default Page;
