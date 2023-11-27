const Layout = ({ children }) => (
  <div className=" antialiased ">
    <div className="flex flex-1 p-6 text-center items-center justify-center">
      <a href="/">
        <img src="logo.png" alt="logo" className="h-7 px-2" />
      </a>
      <h1 className="font-extrabold font-serif font text-3xl">Todo Application</h1>
    </div>
    {children}
  </div>
);

export default Layout;
