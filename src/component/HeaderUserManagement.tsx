import '../css/HeaderUserManagement.css';

interface Props {
  searchName: string;
  setSearchName: (value: string) => void;
  searchEmail: string;
  setSearchEmail: (value: string) => void;
}

const HeaderUserManagement = ({searchName, setSearchName, searchEmail, setSearchEmail} : Props) =>{
   return(
      <div className="backgrount-header">
        <div className="header">
          <button className="new-user-btn">+ New User</button>
          <div className="search">
            <input type='text' placeholder="Search name" value={searchName} onChange={(e) => setSearchName(e.target.value)}></input>
            <input type="text" placeholder="Search email" value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)}/>
          </div>
        </div>
      </div>
   );
};

export default HeaderUserManagement;