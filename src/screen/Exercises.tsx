import { useParams } from "react-router-dom";
import HeaderMaterial from "../component/headerMaterial";
import Sidebar from "../component/Sidebar";
import { useEffect, useState } from "react";
import { Mosaic } from "react-loading-indicators";
import "../css/MaterialManagement.css";
import "../css/CreateBoxStyle.css";
import { toast } from "react-toastify";

const Exercises = () => {
  const { chapterId, lessonId } = useParams();
  const [isGrading, setIsGrading] = useState(false);
  const [exercises, setExercises] = useState<any[]>([]);
  const [formula, setFormula] = useState<any[]>([]);

  const [newExerciseTitle, setNewExerciseTitle] = useState("");

  const [newFormulaTitle, setNewFormulaTitle] = useState("");
  const [expression, setExpression] = useState("");
  const [description, setDescription] = useState("");
  const [circuitModelId, setCircuitModelId] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState("");

  const fetchExercises = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Exercises/${lessonId}`,
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
        setExercises(lessonList);
      } else {
        setExercises([]);
      }
    } catch (error) {
      console.error("Lỗi fetch bài học:", error);
      setExercises([]);
    }
  };

  const fetFormula = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Formula/${lessonId}`,
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
        const formulaList = Array.isArray(raw) ? raw : [raw];
        setFormula(formulaList);
      }
    } catch (error) {
      console.error("Lỗi fetch công thức:", error);
    }
  };

  useEffect(() => {
    if (lessonId) {
      fetchExercises();
      fetFormula();
    }
  }, []);

  const handleCreateExercise = async () => {
    if (!newExerciseTitle.trim()) {
      alert("Tiêu đề không được để trống");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://api.ocgi.space/api/Exercises`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newExerciseTitle,
          lessonId: parseInt(lessonId ?? "0"),
        }),
      });

      if (res.ok) {
        setNewExerciseTitle("");
        fetchExercises();
        fetFormula();
        toast.success("Tạo bài thành công!");
      } else {
        toast.error("Tạo bài thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi tạo bài tập!");
    }
  };

  const handleCreateFormula = async () => {
    if (!newFormulaTitle.trim() || !expression.trim() || !description.trim()) {
      alert("Vui lòng điền đầy đủ thông tin công thức");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://api.ocgi.space/api/Formula`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newFormulaTitle,
          expression,
          description,
          circuitModelId: parseInt(lessonId ?? "0"),
        }),
      });

      if (res.ok) {
        setNewFormulaTitle("");
        setExpression("");
        setDescription("");
        fetchExercises();
        fetFormula();
        toast.success("Thêm công thức thành công!");
      } else {
        toast.error("Tạo công thức thất bại!");
      }
    } catch (error) {
      toast.error("Lỗi tạo công thức!");
    }
  };

  const deleteFormula = async (formulaId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Formula/${formulaId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        fetchExercises();
        fetFormula();
        toast.success("Xóa thành công!");
      } else {
        toast.error("Không thể xóa!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa công thức!");
    }
  };

  const deleteExercise = async (exerciseId: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://api.ocgi.space/api/Exercises/${exerciseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        fetchExercises();
        fetFormula();
        toast.success("Xóa bài tập thành công!");
      } else {
        toast.error("Không thể xóa bài tập!");
      }
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi xóa bài tập!");
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(`https://api.ocgi.space/api/Exercises/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: editedTitle }),
      });

      if (res.ok) {
        const updated = [...exercises];
        updated[editIndex!] = { ...updated[editIndex!], title: editedTitle };
        setExercises(updated);
        setEditIndex(null);
        fetchExercises();
        fetFormula();
        toast.success("cập nhật thành công!");
      } else {
        toast.error("cập nhật thất bại!");
      }
    } catch (err) {
      toast.error("cập nhật thất bại!");
    }
  };

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

        <div className="create-box-wrapper">
          {/* <div className="create-box">
            <div>
              <h3>Tạo công thức</h3>
              <input
                type="text"
                placeholder="Tên công thức"
                value={newFormulaTitle}
                onChange={(e) => setNewFormulaTitle(e.target.value)}
                className="input-field"
              />
              <input
                type="text"
                placeholder="Biểu thức (VD: a + b)"
                value={expression}
                onChange={(e) => setExpression(e.target.value)}
                className="input-field"
              />
            </div>

            <div className="disAndButtom">
              <input
                type="text"
                placeholder="Mô tả"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input-field"
              />
              <button onClick={handleCreateFormula} className="create-btn">
                Tạo công thức
              </button>
            </div>
          </div> */}
          <div className="createExser">
            <h3>Tạo bài tập</h3>

            <input
              type="text"
              placeholder="Nội dung bài tập"
              value={newExerciseTitle}
              onChange={(e) => setNewExerciseTitle(e.target.value)}
              className="input-field"
            />
            <button onClick={handleCreateExercise} className="create-btn">
              Tạo bài
            </button>
          </div>
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
          <div className="content-material" style={{ marginTop: "-10px" }}>
            {formula.map((f) => (
              <div
                key={f.id}
                className="formula-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <div>
                  <a>* {f.name}</a>
                  <a> {f.expression}</a>
                  <a> {f.description}</a>
                </div>
                <div>
                  {/* <button className="button-small">cập nhật</button> */}
                  <button
                    className="button-small"
                    onClick={() => deleteFormula(f.id)}
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}

            {exercises.map((l, index) => (
              <div
                key={l.id}
                className="exercise-item"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                <div>
                  {editIndex === index ? (
                    <textarea
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      style={{
                        padding: "8px",
                        width: "870px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        fontSize: "16px",
                        resize: "vertical", 
                        minHeight: "60px",
                        lineHeight: "1.4",
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                        fontFamily: "inherit",
                      }}
                    />
                  ) : (
                    <a>
                      Bài tập {index + 1}: {l.title}
                    </a>
                  )}
                </div>

                <div style={{ display: "flex", gap: "5px", paddingRight: "20px" }}>
                  {editIndex === index ? (
                    <>
                      <button
                        className="button-small"
                        onClick={() => handleUpdate(l.id)}
                      >
                        Lưu
                      </button>
                      <button
                        className="button-small"
                        onClick={() => setEditIndex(null)}
                      >
                        Hủy
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="button-small"
                        onClick={() => {
                          setEditIndex(index);
                          setEditedTitle(l.title);
                        }}
                      >
                        Cập nhật
                      </button>
                      <button
                        className="button-small"
                        onClick={() => deleteExercise(l.id)}
                      >
                        Xóa
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Exercises;
