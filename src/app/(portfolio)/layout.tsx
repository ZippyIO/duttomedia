import Navbar from '~/components/layout/Navbar';
import TabBar from '~/components/layout/TabBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full min-h-[100svh]">
      <Navbar />
      <div className="pb-[62px] sm:pb-0">{children}</div>
      <TabBar />
    </div>
  );
};

export default Layout;
