const parseMessageNotis = async (messageNotis: string[]) => {
  const parsedMessageNotis = [];
  for (const messageNoti of messageNotis) {
    const parsedNoti = messageNoti.split(',');
    parsedMessageNotis.push({
      from: parsedNoti[0],
      to: parsedNoti[1],
    });
  }
  return parsedMessageNotis;
};

export default parseMessageNotis;
