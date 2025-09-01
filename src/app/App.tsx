import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SearchPage from "../pages/SearchPage/SearchPage.tsx";
import TourPage from "../pages/TourPage/TourPage.tsx";
import Providers from "./Providers.tsx";

export default function App() {
  const router = createBrowserRouter([
    { path: "/", element: <SearchPage /> },
    { path: "/tour/:priceId", element: <TourPage /> },
  ]);

  return (
    <Providers>
      <main>
        <RouterProvider router={router} />
      </main>
    </Providers>
  );
}
