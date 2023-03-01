import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import Layout from "./../components/Layout";
import { lightTheme } from "./../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { RecoilRoot } from "recoil";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={lightTheme}>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <RecoilRoot>
              <Component {...pageProps} />
            </RecoilRoot>
          </Layout>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
