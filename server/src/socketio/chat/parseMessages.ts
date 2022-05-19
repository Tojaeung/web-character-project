const parseMessages = async (messages: string[]) => {
  const parsedMessages = [];
  for (const message of messages) {
    const parsedMessage = message.split(',');
    parsedMessages.push({
      type: parsedMessage[0],
      to: parsedMessage[1],
      from: parsedMessage[2],
      content: parsedMessage[3],
      imgKey: parsedMessage[4],
      date: parsedMessage[5],
    });
  }
  return parsedMessages;
};

export default parseMessages;
