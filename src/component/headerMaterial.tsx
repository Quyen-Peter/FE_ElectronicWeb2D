import { useEffect, useState } from "react";
import "../css/HeaderMaterial.css";

interface grade {
  id: number;
  name: string;
}

interface materialProps {
  onSetIsGrading: (val: boolean) => void;
  onFetchGrade: (gradeId: number) => void;
}

const HeaderMaterial = ({ onSetIsGrading, onFetchGrade }: materialProps) => {
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [grades, setGrade] = useState<grade[]>([]);
  const [searchText, setSearchText] = useState("");
  const [selectedGradeId, setSelectedGradeId] = useState<number | null>(1);

  const hanldGrade = async () => {
    try {
      onSetIsGrading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://electrical-learning-dqf3exbwf6b9dkcp.southeastasia-01.azurewebsites.net/api/Grade?searchTerm=${searchText}&pageIndex=${pageIndex}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.ok) {
        onSetIsGrading(false);
        const data = await res.json();
        setGrade(data.value.items);
        console.log("grade:", grades);
      }
    } catch (err) {}
  };

  useEffect(() => {
    hanldGrade();
  }, []);

  return (
    <div className="backgrount-header-material">
      <div className="Material">
        {grades.map((g) => (
          <div key={g.id} className="div-bnt">
            <button
              className={`bnt-grade ${
                selectedGradeId === g.id ? "selected" : ""
              }`}
              onClick={() => {
                setSelectedGradeId(g.id);
                onFetchGrade(g.id);
              }}
            >
              Lớp {g.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderMaterial;
