import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";
import Sidebar from "../component/Sidebar";
import HeaderMaterial from "../component/headerMaterial";
import { useNavigate, useParams } from "react-router-dom";
import "../css/MaterialManagement.css";

const LessionManagement = () => {
  const { chapterId } = useParams();
  const [isGrading, setIsGrading] = useState(false);
  const [lession, setLession] = useState<any[]>([]);
  const navigator = useNavigate();

  const fetchLessons = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Lesson/${chapterId}`,
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
    if (chapterId) {
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
                <button className="chapter-item"  onClick={() => navigator(`exercises/${l.id}`)}>Bài: {l.title}</button>
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
