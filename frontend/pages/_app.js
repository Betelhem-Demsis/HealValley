import "../styles/globals.css";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState(router.pathname);

  useEffect(() => {
    const handleRouteChange = (url) => {
      const path = url === "/" ? "/" : url;
      console.log("Route changed to:", path);
      setCurrentPath(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    const initialPath = router.pathname === "/" ? "/" : router.pathname;
    console.log("Initial path:", initialPath);
    setCurrentPath(initialPath);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events, router.pathname]);

  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
