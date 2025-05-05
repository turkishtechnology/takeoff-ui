import Header from './Header';

function Layout(props: any) {
  return (
    <>
      <Header />
      <main>{props.children}</main>
    </>
  );
}
export default Layout;
