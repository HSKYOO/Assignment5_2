import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://69196eb99ccba073ee92e8ba.mockapi.io/students";

export default function ShowList() {
    const [students, setStudents] = useState([]);
    
    // 불러오기
    const getStudents = () => {
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => setStudents(data))
            .catch((error) => console.error("Error:", error));
    };

    useEffect(() => {
        getStudents();
    }, []);

    // 삭제하기
    const handleDelete = (id) => {
        if (window.confirm("삭제하시겠습니까?")) {
            fetch(`${API_URL}/${id}`, {
                method: "DELETE",
            }).then(() => {
                getStudents();
            });
        }
    };

    return(
        <div className="container mt-4">
            <h2 className="text-center mb-4">학생 관리 시스템</h2>

            <div className="d-flex justify-content-between mb-3">
                <button className="btn btn-success" onClick={getStudents}>데이터 불러오기</button>

                <Link to="/create" className="btn btn-primary">학생 추가</Link>
            </div>
            
            <table className="table table-bordered table-hover text-center">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Major</th>
                        <th>Age</th>
                        <th>Score</th>
                        <th>관리</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>
                                <Link to={`/detail/${student.id}`} className="text-decoration-none text-dark fw-bold">
                                    {student.name}
                                </Link>
                            </td>
                            <td>{student.major}</td>
                            <td>{student.age}</td>
                            <td>{student.score}</td>
                            <td>
                                <Link to={`/update/${student.id}`} className="btn btn-warning btn-sm me-2">수정</Link>
                                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>삭제</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


