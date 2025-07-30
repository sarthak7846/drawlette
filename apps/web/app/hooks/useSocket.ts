import { useEffect, useState } from "react";
import { BACKEND_WS_URL, token } from "../../config";

export const useSocket = () => {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    console.log("Creating a ws conn");

    const ws = new WebSocket(`${BACKEND_WS_URL}?token=${token}`);
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };

    ws.onclose = (event) => {
      console.warn("🔌 WebSocket closed:", event);
      setLoading(true); // optionally reset loading state
    };
  }, []);

  return {
    socket,
    loading,
  };
};
