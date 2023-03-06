import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import InputBox from "../components/InputBox";
import TodosContainer from "../components/TodosContainer";
import TodosFooter from "../components/TodosFooter";

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center mt-40 py-2 m-0 p-0">
      <Head>
        <title>Todo App with Auth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <header className="font-thin text-8xl italic text-purple-800 m-6 select-none">
          todos
        </header>
        <div className="w-100 bg-gray-50 text-gray-700">
          <InputBox />
          <TodosContainer />
          <TodosFooter />
        </div>
      </main>
    </div>
  );
};

export default Home;
