import type { AppContext } from '@/router';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from '@tanstack/react-router';

import 'uno.css';

export const Route = createRootRouteWithContext<AppContext>()({
  head: () => ({
    meta: [
      { title: process.env.APP_NAME || 'OpenPaste' },
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
  }),
  component: () => {
    return (
      <html lang='en'>
        <head>
          <HeadContent />
        </head>
        <body>
          <div className='h-full'>
            <Outlet />
          </div>
          <Scripts />
        </body>
      </html>
    );
  },
});
