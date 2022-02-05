const parseChatList = async (chatList: string[]) => {
  const newChatList = [];
  for (const chat of chatList) {
    const parsedChat = chat.split(',');
    newChatList.push({
      nickname: parsedChat[0],
      avatar: parsedChat[1],
    });
  }
  return newChatList;
};

export default parseChatList;
