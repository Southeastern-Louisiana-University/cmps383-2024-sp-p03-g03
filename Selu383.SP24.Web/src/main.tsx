import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { CachePolicies, Provider } from "use-http";
import Login from "./routes/home/login";
import MainLayout from "./routes/_layout";
import ListHotels from "./routes/find-hotels/list-hotels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  { path: "/login", element: <Login /> },
  { path: "/hotels", element: <ListHotels /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider options={{ cache: CachePolicies.NO_CACHE, cacheLife: 16 }}>
    <RouterProvider router={router} />
  </Provider>
);
