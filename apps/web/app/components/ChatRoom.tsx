import axios from "axios";
import { BACKEND_HTTP_URL } from "../../config";
import ChatRoomClient from "./ChatRoomClient";

const getMessages = async (roomId: string) => {
  const res = await axios.get(`${BACKEND_HTTP_URL}/messages/${roomId}`);

  return res.data.messages;
};

const ChatRoom = async ({ roomId }: { roomId: string }) => {
  const messages = await getMessages(roomId);

  return <ChatRoomClient initialMessages={messages} roomId={roomId} />;
};

export default ChatRoom;
