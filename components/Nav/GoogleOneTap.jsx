import useUser from "@lib/useUser";
import * as api from "../../app/api/index.js";
import { useEffect } from "react";

async function handleCredentialResponse(response, mutateUser) {
  const result = await api.googleSignIn(response);
  mutateUser();
}

export default function GoogleOneTap() {
  const { user, mutateUser } = useUser();
  useEffect(() => {
    google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: (res) => {
        handleCredentialResponse(res, mutateUser);
      },
    });
    if (user && !user.isLoggedIn) {
      google.accounts.id.prompt();
    }
  }, [user]);
  return <div></div>;
}
