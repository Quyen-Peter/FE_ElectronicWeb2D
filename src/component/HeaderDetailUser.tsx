import '../css/HeaderDetailUser.css';
import { Navigate, useNavigate } from "react-router-dom";

interface HeaderDetailUserProps {
  isEditing: boolean;
  onUpdateClick: () => void;
  onSaveClick: () => void;
  onCancelClick: () => void;
  onDeleteClick: () => void;
}

const HeaderDetailUser = ({ isEditing, onUpdateClick, onSaveClick, onCancelClick, onDeleteClick }: HeaderDetailUserProps) => {
  const navigate = useNavigate();

  return (
    <div className="backgrount-header">
      <button className="btn-back" onClick={()=> navigate('/users')}>Quay lại</button>
      {!isEditing ? (
        <button className="bnt-update" onClick={onUpdateClick}>Cập nhật</button>
      ) : (
        <>
          <button className="bnt-update" onClick={onSaveClick}>Lưu</button>
          <button className="bnt-update cancel" onClick={onCancelClick}>Hủy</button>
        </>
      )}
      
      
        <button className="bnt-update bnt-delete" onClick={onDeleteClick}>Xóa</button>

      
    </div>
  );
};

export default HeaderDetailUser;
