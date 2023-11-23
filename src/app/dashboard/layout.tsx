import Sidebar from '~/components/dashboard/layout/Sidebar';
import Navbar from '~/components/layout/Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="grid min-h-[calc(100svh-64.8px)] grid-cols-[200px_1fr]">
        <Sidebar />
        {children}
      </div>
    </>
  );
};

export default Layout;
