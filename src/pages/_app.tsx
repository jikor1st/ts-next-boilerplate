import { useState } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import PageLayout from '@/templates/common/PageLayout';
import type { PageLayoutProps } from '@/types';

import { ThemeProvider, Global } from '@emotion/react';
import { resetStyles, globalStyles } from '@/styles';

import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
  DehydratedState,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

interface PageProps {
  dehydratedState: DehydratedState;
}
interface AppPropsWithLayoutProps<P> extends AppProps<P> {
  Component: PageLayoutProps<P>;
}

function MyApp({ Component, pageProps }: AppPropsWithLayoutProps<PageProps>) {
  // **react queryClient
  const [queryClient] = useState(() => new QueryClient());

  // **pageLayouts
  const getLayout =
    Component.getLayout ?? (page => <PageLayout>{page}</PageLayout>);
  return (
    <>
      <Head>
        {/* **viewport */}
        <meta
          name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ThemeProvider theme={{}}>
            <Global styles={[resetStyles, globalStyles]} />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
