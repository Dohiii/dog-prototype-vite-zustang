import { useStore } from "./stores/main.store";
import "./App.css";
import { useAuthStore } from "./stores/authorisation.store";
import { useEffect } from "react";
import RegisterForm from "./pages/Register";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import VerifyEmailConfirm from "./pages/VerifyEmailConfirm";
import DogsMain from "./pages/Dogs";

import DogSinglePage from "./pages/DogSinglepage";
import { NavBar } from "./components/Navigation";
import ProfileSinglePage from "./pages/ProfileSinglePage";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. import `ChakraProvider` component
import { ChakraProvider } from "@chakra-ui/react";
import ConversationPage from "./pages/Conversation";
import CreateNewDog from "./pages/CreateNewDog";
import UpdateDogPhoto from "./pages/UpdateImage";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

axios.defaults.baseURL = "http://localhost:5000/api/v1";

const queryClient = new QueryClient();

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

function Counter() {
  const { count, inc, blow, removeAll } = useStore();

  return (
    <div className="counter">
      <span>{count}</span>
      <button onClick={inc}>one down up</button>
      <button onClick={blow}>one down down</button>
      <button onClick={removeAll}>remove</button>

      <div>
        {/* <button onClick={logIn}>Login</button>
        <button onClick={logout}>Logout</button> */}
      </div>
    </div>
  );
}

function App() {
  const { loggedIn } = useAuthStore();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={loggedIn ? <DogsMain /> : <HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/update-dog-photo/:id" element={<UpdateDogPhoto />} />
            <Route path="/user/verify-email" element={<VerifyEmailConfirm />} />
            <Route path="/user/verify-email-info" element={<VerifyEmail />} />
            <Route
              path="/login"
              element={loggedIn ? <HomePage /> : <LoginPage />}
            />
            <Route path="/dogs" element={<DogsMain />} />
            <Route path="/create-dog" element={<CreateNewDog />} />
            <Route path="/messages/:profileId" element={<ConversationPage />} />
            <Route path="/profile/:id" element={<ProfileSinglePage />} />
            <Route path="/dogs/:id" element={<DogSinglePage />} />
            <Route path="/counter" element={<Counter />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}

export default App;
