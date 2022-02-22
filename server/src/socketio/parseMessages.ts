const parseMessages = async (messages: string[]) => {
  const newMessages = [];
  for (const message of messages) {
    const parsedMsg = message.split(',');
    newMessages.push({
      type: parsedMsg[0],
      to: parsedMsg[1],
      from: parsedMsg[2],
      content: parsedMsg[3],
      date: parsedMsg[4],
    });
  }
  return newMessages;
};

export default parseMessages;