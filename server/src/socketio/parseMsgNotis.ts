const parseMsgNotis = async (msgNotis: string[]) => {
  const newMsgNotis = [];
  for (const msgNoti of msgNotis) {
    const parsedNoti = msgNoti.split(',');
    newMsgNotis.push({
      from: parsedNoti[0],
      to: parsedNoti[1],
    });
  }
  return newMsgNotis;
};

export default parseMsgNotis;
