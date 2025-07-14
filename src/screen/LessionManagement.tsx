import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";
import Sidebar from "../component/Sidebar";
import HeaderMaterial from "../component/headerMaterial";
import { useParams } from "react-router-dom";
import "../css/MaterialManagement.css";

const LessionManagement = () => {
  const { id } = useParams();
  const [isGrading, setIsGrading] = useState(false);
  const [lession, setLession] = useState<any[]>([]);
  const [idGrade, setIdGrade] = useState("1");

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://electrical-learning-dqf3exbwf6b9dkcp.southeastasia-01.azurewebsites.net/api/Lesson/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        const raw = data.value;
        const lessonList = Array.isArray(raw) ? raw : [raw];
        setLession(lessonList);
      } else {
        setLession([]);
      }
    } catch (error) {
      console.error("Lỗi fetch bài học:", error);
      setLession([]);
    } finally {
    }
  };

  useEffect(() => {
    if (id) {
      fetchLessons();
    }
  }, []);

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
            onFetchGrade={() => {}}
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
            {lession.map((l) => (
              <div key={l.id}>
                <button className="chapter-item">Bài: {l.title}</button>
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

export default LessionManagement;
