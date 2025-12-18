import "@/styles/globals.css";
import { ReactLenis } from "lenis/react";
import type { AppProps } from "next/app";
import { useState, useEffect } from "react";
import LoadingScreen from "@/components/website/LoadingScreen";

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 2200);
  }, []);

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {isLoading && <LoadingScreen onComplete={function (): void {
        throw new Error("Function not implemented.");
      } } />}
      <Component {...pageProps} />
    </ReactLenis>
  );
};

export default App;
