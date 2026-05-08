import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/home/layout/Layout";
import Login from "./components/home/login/Login";
import Signup from "./components/home/signup/Signup";
import Home from "./components/home/Home";
import CounterContextProvider from "./context/CounterContext";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./context/AuthContextProvider";
import { h1 } from "framer-motion/client";
import Profile from "./components/profile/Profile";
import ProtectdRotes from "./components/protectdroutes/ProtectdRotes";
import AuthRoute from "./components/AuthRoute/AuthRoute";
import PostData from './components/postData/postData';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Offline } from "react-detect-offline";

export default function App() {

  let client =  new QueryClient()

  let router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        { path: "", element: <ProtectdRotes> <Home /> </ProtectdRotes>  },
        { path: "home", element: <ProtectdRotes> <Home /> </ProtectdRotes>  },

        { path: "login", element:  <AuthRoute> <Login /> </AuthRoute>  },
        { path: "signup", element:  <AuthRoute> <Signup /> </AuthRoute>  },
        
        { path: "profile", element: <ProtectdRotes> <Profile />  </ProtectdRotes> },
        { path: "postData/:postId", element: <ProtectdRotes> <PostData/>  </ProtectdRotes> },
      ],
    },
  ]);

  return (
    <>



      <QueryClientProvider client={  client   }>


            <HeroUIProvider>

                <AuthContextProvider>

                

              <CounterContextProvider>
                <RouterProvider router={router} />


                    <Offline>
                                
                          <p className="bg-red-400  w-full text-center rounded-2xl p-3 fixed top-1/2 z-50 text-2xl text-white">offline</p>

                    </Offline>

              </CounterContextProvider>

              </AuthContextProvider>
              
            </HeroUIProvider>


            </QueryClientProvider>

    </>
  );
}
