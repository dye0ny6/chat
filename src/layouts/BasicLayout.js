import Header from "./Header";
import Footer from "./Footer";

const BasicLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div>{children}</div>
      <Footer />
    </>
  );
};

export default BasicLayout;
