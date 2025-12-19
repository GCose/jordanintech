import "@/styles/globals.css";
import { useState } from "react";
import { ReactLenis } from "lenis/react";
import type { AppProps } from "next/app";
import LoadingScreen from "@/components/website/LoadingScreen";

const App = ({ Component, pageProps }: AppProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
      <Component {...pageProps} isReady={!isLoading} />
    </ReactLenis>
  );
};

export default App;
