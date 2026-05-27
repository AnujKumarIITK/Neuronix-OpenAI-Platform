import "./App.css";
import { MyContext } from "./MyContext.jsx";
import { useState } from "react";
import { v1 as uuidv1 } from "uuid";
import { Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./auth/Signup";
import Login from "./auth/Login";

import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";

function ChatPage() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);
  
  const providerValues = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId,
    newChat,
    setNewChat,
    prevChats,
    setPrevChats,
    allThreads,
    setAllThreads,
  };
  
  return (
    <div className="app">
      <MyContext.Provider value={providerValues}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  );
}

function ProtectedRoute({ children }) {
  
  const token = localStorage.getItem("token");
  
  return token
  ? children
  : <Navigate to="/login" />;
}

function App() {

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <>
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          style: {
            background: '#1c1c24', // Matches your custom dark mode theme
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            fontFamily: 'sans-serif',
            fontSize: '14px'
          },
          success: {
            iconTheme: {
              primary: '#14b8a6', // Teal color matching your primary buttons
              secondary: '#fff',
            },
          },
        }} 
      />

      <Routes>

        <Route
          path="/"
          element={
            isLoggedIn
            ? <ChatPage />
            : <Landing />
          }
          />

        <Route
          path="/signup"
          element={<Signup />}
          />

        <Route
          path="/login"
          element={<Login />}
          />

      </Routes>
    </>
  );
}

export default App;





