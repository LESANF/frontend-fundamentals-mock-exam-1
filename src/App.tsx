import { GlobalPortal, GlobalStyles } from 'tosslib';
import { Routes } from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

const queryClient = new QueryClient();

export function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <GlobalPortal.Provider>
          <HelmetProvider>
            <Routes />
          </HelmetProvider>
        </GlobalPortal.Provider>
      </QueryClientProvider>
    </>
  );
}
