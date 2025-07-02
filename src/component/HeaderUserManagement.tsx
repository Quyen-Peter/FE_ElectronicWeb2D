import '../css/HeaderUserManagement.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  searchName: string;
  setSearchName: (value: string) => void;
}

const HeaderUserManagement = ({searchName, setSearchName} : Props) =>{
const navigate = useNavigate();

   return(
      <div className="backgrount-header">
        <div className="header">
          <button className="new-user-btn" onClick={()=> navigate('/Create-User')}>Thêm người dùng mới</button>
          <div className="search">
            <input type='text' placeholder="Search name" value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
          </div>
        </div>
      </div>
   );
};

export default HeaderUserManagement;