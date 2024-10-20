import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { themeToken } from "./_shared/antTheme/antThemeToken";
import { HomeView } from "./views/HomeView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <ConfigProvider theme={themeToken}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default App;
