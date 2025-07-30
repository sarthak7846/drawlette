import axios from "axios";
import { BACKEND_HTTP_URL } from "../../../config";
import ChatRoom from "../../components/ChatRoom";

const getRoom = async (slug: string) => {
  const res = await axios.get(`${BACKEND_HTTP_URL}/room/${slug}`);
  return res.data.room.id;
};

const RoomPage = async ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const slug = (await params).slug;
  console.log("slug", slug);

  const roomId = await getRoom(slug);

  return (
    <div>
      <ChatRoom roomId={roomId} />
    </div>
  );
};

export default RoomPage;
