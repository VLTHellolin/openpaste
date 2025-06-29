/* eslint-disable react-refresh/only-export-components */

import type React from 'react';
import { Links, Meta, type MetaFunction, Outlet, Scripts, ScrollRestoration } from 'react-router';
import { Navigation } from './components/Navigation';
import { Provider } from './components/ui/provider';

export const meta: MetaFunction = () => {
  return [
    {
      title: 'OpenPaste',
    },
    {
      name: 'description',
      content: 'An open-source implementation for self-hosted pastebin',
    },
  ];
};

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en' suppressHydrationWarning>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta httpEquiv='X-UA-Compatible' content='chrome=1' />
        <meta name='emotion-insertion-point' content='emotion-insertion-point' />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider>
          <Navigation />
          {children}
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export default function App() {
  return <Outlet />;
}
