import { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/global-style";
import Layout from "./../components/Layout";
import { lightTheme } from "./../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { RecoilRoot, RecoilEnv } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
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
