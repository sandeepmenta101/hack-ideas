import AppNav from "./AppNav";
import Footer from "./Footer";

export default function AppLayout(props: any) {
  return (
    <>
      <AppNav />
      {props.children}
      <Footer />
    </>
  );
}
