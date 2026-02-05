import { useCursor } from '../../hooks/useCursor';
import './CustomCursor.css';

const CustomCursor = () => {
  useCursor();
  return <div className="cursor"></div>;
};

export default CustomCursor;
