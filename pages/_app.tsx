import {GoogleOAuthProvider} from "@react-oauth/google"
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider , QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return <div>
    <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId={"12112148203-djkq4mvik5phr5grphr5226sbeoe77p7.apps.googleusercontent.com"} >
      <Component {...pageProps} />
        <Toaster />
        <ReactQueryDevtools/>
      </GoogleOAuthProvider>
      </QueryClientProvider>
   
    </div>;
}
