"use client";
import { useAuth ,useUser } from "@clerk/nextjs";
import { useState } from "react";



export const Counter = () => {

  console.log("Counter component");
  const [count, setCount] = useState(0);
  const {isLoaded ,userId ,sessionId , getToken} = useAuth();

  if(!isLoaded || !userId){
    return null;
  }

  return (
    <button onClick={() => setCount(count + 1)}>Clicked {count} times</button>
  );
};
