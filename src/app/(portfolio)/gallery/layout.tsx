import GalleryNav from '~/components/gallery/GalleryNav';
import db from '~/lib/db';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const collections = await db.collection.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <div className="flex flex-col gap-2 px-4 py-2">
      <div className="flex items-center justify-center pb-2">
        <h2 className="text-2xl font-semibold">Gallery</h2>
      </div>
      <GalleryNav collections={collections} />
      {children}
    </div>
  );
};

export default Layout;
