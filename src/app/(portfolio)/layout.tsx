import Navbar from '~/components/layout/Navbar';
import TabBar from '~/components/layout/TabBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full min-h-[100svh]">
      <Navbar />
      {children}
      <TabBar />
    </div>
  );
};

export default Layout;
