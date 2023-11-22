import GalleryNav from '~/components/gallery/GalleryNav';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex justify-center pt-4">
        <GalleryNav />
      </div>
      {children}
    </div>
  );
};

export default Layout;
