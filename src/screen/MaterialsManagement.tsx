import { count } from "console";
import Sidebar from "../component/Sidebar";
import { useEffect, useState } from "react";
import "../css/MaterialManagement.css";
import HeaderMaterial from "../component/headerMaterial";
import { Mosaic } from "react-loading-indicators";
import "../css/Loading.css";
import { useNavigate } from "react-router-dom";


interface chapter {
  id: number;
  name: string;
  gradeId: number;
}

const MaterialsManagement = () => {
  const [isGrading, setIsGrading] = useState(false);
  const [chapter, setChapter] = useState<chapter[]>([]);
  const [idGrade, setIdGrade] = useState("1");
  const navigator = useNavigate();

  const fetchGrade = async (gradeId: number) => {
    try {
      setIsGrading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Grade/${gradeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setChapter(data.value.chapters);
        setIsGrading(false);
      } else {
      }
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    fetchGrade(Number(idGrade));
  }, [idGrade]);


  
  return (
    <div style={{ display: "flex" }}>
      <div style={{ position: "fixed" }}>
        <Sidebar />
      </div>
      <div>
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 252,
            right: 0,
            height: 60,
            zIndex: 100,
          }}
        >
          <HeaderMaterial
            onSetIsGrading={setIsGrading}
            onFetchGrade={fetchGrade}
          />
        </div>
        {isGrading ? (
          <div className="loading" style={{ marginLeft: "850px" }}>
            <Mosaic
              color="#ff9800"
              size="medium"
              text="Đang tải..."
              textColor="#333"
            />
          </div>
        ) : (
          <div className="content-material">
            {chapter.map((c) => (
              <div key={c.id}>
                <button className="chapter-item"  onClick={() => navigator(`Lession/${c.id}`)}>Chương: {c.name}</button>
                {/* <p className="chapter-item">Chương: {c.name}</p> */}
              </div>
            ))}
          </div>
        )}
        ;
      </div>
    </div>
  );
};

export default MaterialsManagement;
