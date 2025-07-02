import { useNavigate } from "react-router-dom";
import '../css/HeaderCreateUser.css';


const HeaderCreateUser = () => {
  const navigate = useNavigate();

  return (
    <div className="backgrount-header">
      <button className="btn-back" onClick={()=> navigate('/users')}>Quay lại</button>
    </div>
  );
};

export default HeaderCreateUser;
