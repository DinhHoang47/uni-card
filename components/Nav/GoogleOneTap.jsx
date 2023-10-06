import useUser from "@lib/useUser";
import * as api from "../../app/api/index.js";
import { useEffect } from "react";

async function handleCredentialResponse(response, mutateUser) {
  const res = {
    clientId:
      "361435205591-e2phli3cabbe993rbccmbc7n5u1h17sv.apps.googleusercontent.com",
    client_id:
      "361435205591-e2phli3cabbe993rbccmbc7n5u1h17sv.apps.googleusercontent.com",
    credential:
      "eyJhbGciOiJSUzI1NiIsImtpZCI6ImI5YWM2MDFkMTMxZmQ0ZmZkNTU2ZmYwMzJhYWIxODg4ODBjZGUzYjkiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNjE0MzUyMDU1OTEtZTJwaGxpM2NhYmJlOTkzcmJjY21iYzduNXUxaDE3c3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNjE0MzUyMDU1OTEtZTJwaGxpM2NhYmJlOTkzcmJjY21iYzduNXUxaDE3c3YuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY5MDMyMjA2MjA1MTk3MzcxMzciLCJlbWFpbCI6ImRpbmhob2FuZzA0MDdAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTY5NjU5NDEwNSwibmFtZSI6IkhvYW5nIFRyYW4gRGluaCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJZC1ZY1NSTndWbUNTeHpubHVaNy1XdENYN3h4N0xLN0NXdHV1XzQ0VmpYUT1zOTYtYyIsImdpdmVuX25hbWUiOiJIb2FuZyIsImZhbWlseV9uYW1lIjoiVHJhbiBEaW5oIiwibG9jYWxlIjoiZW4iLCJpYXQiOjE2OTY1OTQ0MDUsImV4cCI6MTY5NjU5ODAwNSwianRpIjoiMzUzYWJiZWQxMWIwYzUzZTVjNzhjMWQ4MzExYjQ5NmFkOTc1NmQ4ZiJ9.cTCtaxiWf2VOUs89UwBLkIf3skWccyPQSVxEcU_NzmWDLqE0LDgqtalxQTpH2O8ufr1YUHF3S54HEmUeKAyFY6No9OLLxdGbe37TZK2TkC3AnH03ZiAl26fjvd4K8oPue6Lm1u0ziYDKRW9EwU78iQ-hpfj4Zq7uZz1S6RbRWoV1YcTdDZesEh3LoolZlHH2iyS-uLj9jF-2ksOU2txn7BCh-PB02dWBJkzlEg6YTXUOysxZ70GxL7ym5jBZJg5yXI9gvu9NDKzbSCemX4YUJXDcRtSwq0M_UfiZaGIMJl5KacffNbt8q0tvndw3GfCZ6MQQnx0M6y1NvcN3CiiS_g",
    select_by: "user",
  };
  try {
    const result = await api.googleSignIn(response);
    mutateUser();
  } catch (error) {
    console.log(error);
  }
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
