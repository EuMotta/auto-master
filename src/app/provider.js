/* eslint-disable react/function-component-definition */
// app/provider.js
import { SessionProvider } from 'next-auth/react';

export default function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
