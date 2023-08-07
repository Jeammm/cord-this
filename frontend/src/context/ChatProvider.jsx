import { useState, createContext, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

export default function ChatProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{ user, setUser, selectedChat, setSelectedChat, chats, setChats }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function ChatState() {
  return useContext(ChatContext);
}
