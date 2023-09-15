import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navbar/Navbar';

const PublicAppShell = (props) => {
  return (
    <main className="PublicAppShell">
      <Navbar />
      {props.children}
      <Footer />
    </main>
  );
};

export default PublicAppShell;
