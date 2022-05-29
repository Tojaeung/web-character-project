import { AiFillCrown } from 'react-icons/ai';
import { BsPencilFill, BsVectorPen, BsFillTrophyFill } from 'react-icons/bs';
import { FaPaintBrush, FaSkull } from 'react-icons/fa';

interface IProps {
  exp: number;
  role: string;
  isPenalty: boolean;
}

function Exp({ exp, role, isPenalty }: IProps) {
  if (isPenalty) return <FaSkull size={10} fill="black" />;
  else if (role === 'admin') return <AiFillCrown size={15} stroke="black" strokeWidth="10" fill="red" />;
  else if (0 <= exp && exp <= 100) return <BsPencilFill size={10} stroke="black" strokeWidth="1" fill="yellow" />;
  else if (100 < exp && exp <= 500) return <BsPencilFill size={10} stroke="black" strokeWidth="1" fill="green" />;
  else if (500 < exp && exp <= 1500) return <BsPencilFill size={10} stroke="black" strokeWidth="1" fill="red" />;
  else if (1500 < exp && exp <= 10000) return <FaPaintBrush size={10} stroke="black" strokeWidth="10" fill="yellow" />;
  else if (10000 < exp && exp <= 50000) return <FaPaintBrush size={10} stroke="black" strokeWidth="10" fill="green" />;
  else if (50000 < exp && exp <= 150000) return <FaPaintBrush size={10} stroke="black" strokeWidth="10" fill="red" />;
  else if (150000 < exp && exp <= 300000)
    return <BsVectorPen size={12} stroke="black" strokeWidth="0.2" fill="yellow" />;
  else if (300000 < exp && exp <= 600000)
    return <BsVectorPen size={12} stroke="black" strokeWidth="0.2" fill="green" />;
  else if (600000 < exp && exp <= 1000000) return <BsVectorPen size={12} stroke="black" strokeWidth="0.2" fill="red" />;
  else return <BsFillTrophyFill size={10} stroke="black" strokeWidth="1" fill="gold" />;
}

export default Exp;
