import React, {useState, useEffect, useRef} from "react";
import { useParams, useNavigate, data } from "react-router-dom";

const API_URL = "https://69196eb99ccba073ee92e8ba.mockapi.io/students";

export default function UpdatePage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [student, setStudent] = useState({name: "", major: "", age: "", score: "" });
    const [updateCount, setUpdateCount] = useState(0);

    const nameRef = useRef();
    const majorRef = useRef();
    const ageRef = useRef();
    const scoreRef = useRef();

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then((res) => res.json())
            .then((data) => setStudent(data));
    }, [id]);

    const handleRealTimeUpdate = (e) => {
        const { name, value } = e.target;

        const updateStudent = { ...student, [name]: value};
        setStudent(updateStudent);

        // 이름 채워져있는지 확인.
        if(name === "name" && value.trim() === "") {
            return;
        }

        fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(updateStudent),
        })
        .then(() => {
            setUpdateCount((prev) => prev + 1);
            console.log("saved!");
        })
        .catch(err => console.error(err));
    };

    return(
        <div className="container mt-5">
            <h3>학생 정보 수정</h3>
            <div className="alert alert-info">
                현재 페이지 수정 횟수: <span style={{fontWeight: 'bold'}}>{updateCount}</span> 회
            </div>

            <div className="mb-3">
                <label>Name:</label>
                <input type="text" className="form-control" name="name" value={student.name} onChange={handleRealTimeUpdate} ref={nameRef}/>
            </div>

            <div className="mb-3">
                <label>Major:</label>
                <input type="text" className="form-control" name="major" value={student.major} onChange={handleRealTimeUpdate} ref={majorRef}/>
            </div>

            <div className="mb-3">
                <label>Age:</label>
                <input type="number" className="form-control" name="age" value={student.age} onChange={handleRealTimeUpdate} ref={ageRef}/>
            </div>

            <div className="mb-3">
                <label>Score:</label>
                <input type="number" className="form-control" name="score" value={student.score} onChange={handleRealTimeUpdate} ref={scoreRef}/>
            </div>

            <button className="btn btn-secondary mt-3" onClick={() => navigate("/list")}>목록으로</button>
        </div>
    );
}