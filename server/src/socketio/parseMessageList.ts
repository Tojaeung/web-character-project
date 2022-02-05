const parseMessageList = async (msgList: string[]) => {
  const newMsgList = [];
  for (const msg of msgList) {
    const parsedMsg = msg.split(',');
    newMsgList.push({
      type: parsedMsg[0],
      to: parsedMsg[1],
      from: parsedMsg[2],
      content: parsedMsg[3],
      date: parsedMsg[4],
    });
  }
  return newMsgList;
};

export default parseMessageList;
