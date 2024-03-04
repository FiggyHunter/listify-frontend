import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import { Helmet } from "react-helmet";
const App = () => {
  return (
    <>
      <Helmet>
        <meta
          property="og:description"
          content="This is a description of my page"
        />
        <meta name="description" content="This is a description of my page" />
        <meta name="keywords" content="react, meta tags, seo" />
        <meta name="author" content="Your Name" />
        <meta property="og:title" content="My Page Title" />
        <meta property="og:image" content="https://example.com/image.jpg" />
        <meta property="og:url" content="https://example.com/my-page" />
        <meta name="twitter:title" content="My Page Title" />
        <meta
          name="twitter:description"
          content="This is a description of my page"
        />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="h-my-screen bg-bkg w-full ">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
