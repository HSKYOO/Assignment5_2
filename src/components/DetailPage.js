import React, {useState, useEffect} from "react";
import { useParams, Link, data } from "react-router-dom";

const API_URL = "https://69196eb99ccba073ee92e8ba.mockapi.io/students";

export default function DetailPage() {
    const { id } = useParams();
    const [student, setStudent] = usestate(null);

    useEffect(() => {
        fetch(`${API_URL}/${id}`)
            .then((res) => res.json())
            .then((data) => setStudent(data));
    }, [id]);

    if(!student) {
        return <div>로딩중...</div>
    }

    return(
        <div className="container mt-5">
            <h3>학생 상세 정보</h3>
            <ul className="list-group">
                <li className="list-group-item">ID: {student.id}</li>
                <li className="list-group-item">Name: {student.name}</li>
                <li className="list-group-item">Major: {student.major}</li>
                <li className="list-group-item">Age: {student.age}</li>
                <li className="list-group-item">Score: {student.score}</li>
            </ul>
            <Link to="/list" className="btn btn-primary mt-3">목록으로</Link>
        </div>
    );
}