import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CachePolicies, Provider } from "use-http";

import Login from "./routes/auth-pages/login";
import MainLayout from "./routes/_layout";
import ListHotels from "./routes/hotel-pages/list-hotels";
import Signup from "./routes/auth-pages/signup";
import FindHotel from "./routes/hotel-pages/find-hotels";
import RoomListComponent from "./routes/hotel-pages/rooms";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [],
  },
  { path: "/login", element: <Login /> },
  { path: "/hotels", element: <ListHotels /> },
  { path: "/signup", element: <Signup /> },
  { path: "/find-hotel", element: <FindHotel /> },
  // Modify the route for /rooms to accept hotelId as a URL parameter
  { path: "/rooms", element: <RoomListComponent /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider options={{ cache: CachePolicies.NO_CACHE, cacheLife: 16 }}>
    <RouterProvider router={router} />
  </Provider>
);
