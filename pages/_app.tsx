import "@/styles/globals.css";
import { ReactLenis } from "lenis/react";
import type { AppProps } from "next/app";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
      <Component {...pageProps} />
    </ReactLenis>
  );
};

export default App;
