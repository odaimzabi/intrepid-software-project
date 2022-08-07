import React, { useState } from "react";
import socket from "../ws";
import { useSelector, useDispatch } from "react-redux";
import AppBar from "./components/AppBar";
import SelectMachine from "./components/SelectMachine";
import Button from "@mui/material/Button";
import { selectFirstPageState } from "./selector";
import { handleSocketIoData, handlePongData } from "./reducer";
import { AppDispatch } from "../../redux";

type Props = {};

type UserAckMsg = {
  id: string;
};

function FirstPage({}: Props) {
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { message, pong } = useSelector(selectFirstPageState);
  React.useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("user-ack", (data: UserAckMsg) => {
      console.log("user-ack", data.id);
      dispatch(handleSocketIoData(data.id));
    });
    socket.on("pong", (data: string) => {
      console.log("Pong data", data);
      dispatch(handlePongData(data));
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("ping");
  };
  return (
    <div>
      <AppBar />

      <div style={{ backgroundColor: "#b2beb5", height: "100vh", margin: 0 }}>
        <div
          style={{
            backgroundColor: "#fff",
            height: "100%",
            maxWidth: "80%",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            flexDirection: "column",
          }}
        >
          <SelectMachine />
          <h1>{connected ? "socket id " + message : "connecting..."}</h1>
          <Button
            color="primary"
            variant="contained"
            sx={{ width: 216 }}
            onClick={() => handleSendMessage()}
          >
            Send
          </Button>
          <h1>{pong ? "pong: " + pong : "no pong "}</h1>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
