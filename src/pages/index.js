import Masonry from "@/components/Masonry";
import Navbar from "@/components/Navbar";
import { loginState } from "@/reduxStates/loginSlice";
import { currentUser } from "@/reduxStates/userSlice";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const dispatch = useDispatch();
  const login = useSelector((state) => state.loginState.value);

  useEffect(() => {
    (async function authenticateTheUser() {
      const response = await fetch("/api/authenticate");
      const data = await response.json();
      if (!data.authenticated) {
        dispatch(loginState(false));
        return;
      }
      dispatch(currentUser(data.user));
      dispatch(loginState(true));
    })();
  }, [login, dispatch]);

  return (
    <>
      <Head>
        <title>My Unsplash | Built by @muda2bir</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>
      <div className="container">
        <Navbar />
        <Masonry />
      </div>
    </>
  );
}

function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
