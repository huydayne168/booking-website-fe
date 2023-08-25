import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import ReserveBookPage from "./pages/Reserve/ReserveBookPage";
import Transaction from "./pages/transaction/Transaction";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/hotels",
            element: <List />,
        },
        {
            path: "/hotels/:id",
            element: <Hotel />,
        },
        {
            path: "/sign-in",
            element: <SignIn />,
        },
        {
            path: "/sign-up",
            element: <SignUp />,
        },
        {
            path: "/reserve",
            element: <ReserveBookPage />,
        },
        {
            path: "/transaction",
            element: <Transaction />,
        },
    ]);
    return <RouterProvider router={router} />;
}

export default App;
