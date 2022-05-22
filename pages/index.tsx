import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, TextField, Toast } from "../components";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<
    "success" | "error" | "information"
  >("success");

  const handleClick = () => {
    if (name === "") {
      setToast(true);
      setToastType("error");
      setToastMessage("Please enter name!");
      return;
    }

    const _name = name;
    setToast(true);
    setToastType("success");
    setToastMessage(`Hi ${_name}!`);
    setName("");
  };

  const displayNotification = () => {
    console.log("check perimission", Notification.permission);

    if (Notification.permission !== "granted") {
      Notification.requestPermission((status) => {
        if (status === "granted") {
          displayNotification();
        }

        console.log("Notification permission status:", status);
      });

      return;
    }

    navigator.serviceWorker.getRegistration().then((reg) => {
      const options = {
        body: "Here is a notification body!",
        icon: "icon-192x192.png",
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
        actions: [
          {
            action: "okay",
            title: "Okelah boss",
            // icon: "images/checkmark.png",
          },
          {
            action: "close",
            title: "Close notification",
            // icon: "images/xmark.png",
          },
        ],
      };

      if (!reg) {
        return;
      }

      console.log(options);
      reg.showNotification("Test notifications!", options);
    });
  };

  useEffect(() => {
    displayNotification();
  }, []);

  return (
    <div className="m-0 flex items-center justify-center flex-col h-screen">
      <Head>
        <title>PWA demo</title>
        <meta name="description" content="PWA app made with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto text-center px-4 mb-10">
        <h1 className="text-4xl font-bold mb-4">PWA demo</h1>
        <p className="text-gray-500 mb-5">This is demo page made by next.js</p>
        <form className="grid grid-cols-1 gap-4 w-full max-w-sm mx-auto">
          <TextField
            label="Enter name"
            placeholder="Your name"
            value={name}
            onInput={(value) => setName(value)}
          ></TextField>
          <Button
            text="Submit"
            type="primary"
            onClick={() => handleClick()}
          ></Button>
          <Toast
            open={toast}
            message={toastMessage}
            type={toastType}
            closeButton
            onClose={() => {
              setToast(false);
            }}
          ></Toast>
        </form>
      </main>

      <footer className="container mx-auto text-center">
        &copy; Created by{" "}
        <a
          href="https://mrmarsaoli.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold"
        >
          Mrmarsaoli
        </a>
      </footer>
    </div>
  );
};

export default Home;
