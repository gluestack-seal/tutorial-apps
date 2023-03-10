import React from "react";
import type { NextPage } from "next";
import Head from "next/head";
import InputBox from "../components/InputBox";
import TodosContainer from "../components/TodosContainer";
import TodosFooter from "../components/TodosFooter";
import Button from "../components/Button";
import Link from "next/link";
import { getUser } from "../context/user";

const Home = ({ NEXT_APP_NAME }: { NEXT_APP_NAME: string }) => {
  const { user, removeUser }: any = getUser();

  return (
    <div className="flex min-h-screen flex-col items-center mt-40 py-2 m-0 p-0">
      <Head>
        <title>{NEXT_APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-center">
        <header className="font-thin text-8xl italic text-purple-800 m-6 select-none">
          todos
        </header>
        {user ? (
          <div className="w-100 bg-gray-50 text-gray-700">
            <InputBox />
            <TodosContainer />
            <TodosFooter />
          </div>
        ) : (
          <div className="w-80 text-gray-700 flex flex-col">
            <span className="flex justify-evenly mt-6">
              <Link href={"/signin"}>
                <Button className="hover:bg-gray-200">Sign In</Button>
              </Link>
              <Link href={"/signup"}>
                <Button className="bg-gray-200 hover:bg-transparent">
                  Sign Up
                </Button>
              </Link>
            </span>
          </div>
        )}

        {user && (
          <Button className="mt-5 w-fit p-1" onClick={() => removeUser()}>
            Sign Out
          </Button>
        )}
      </main>
    </div>
  );
};

export default Home;

export async function getServerSideProps() {
  return {
    props: {
      NEXT_APP_NAME: process.env.NEXT_APP_NAME || "",
    },
  };
}
