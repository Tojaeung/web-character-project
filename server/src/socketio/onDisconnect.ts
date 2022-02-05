import { SessionSocket } from '@src/types/index';

const onDisconnect = async (socket: SessionSocket) => {
  const user = socket.request.session.user;
};

export default onDisconnect;
