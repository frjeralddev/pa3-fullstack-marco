import { Outlet, ScrollRestoration } from "react-router";

export default function RootLayout() {
  return (
    <>
      <main className="min-h-screen bg-secondary text-brand-white font-agency-body">
        <Outlet /> 
      </main>
      <ScrollRestoration />
    </>
  );
}