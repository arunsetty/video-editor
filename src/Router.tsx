import { createBrowserRouter } from "react-router-dom";

import Editor from "./pages/Editor";
import NotFound from "./pages/NotFound";

const AppRouter: ReturnType<typeof createBrowserRouter> = createBrowserRouter([
    {
        path: "/",
        element: <Editor />,
        errorElement: <NotFound />
    },
    {
        path: "*",
        element: <NotFound />
    }
]);

export default AppRouter;