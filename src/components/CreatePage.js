import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; 

const API_URL = "https://69196eb99ccba073ee92e8ba.mockapi.io/students";

export default function CreatePage() {
    const navigate = useNavigate();

    const [student, setStudent] = useState({name: "", major: "", age: "", score: "" });

    const nameRef = useRef();
    const majorRef = useRef();
    const ageRef = useRef();
    const scoreRef = useRef();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!nameRef.current.value || !majorRef.current.value) {
            alert("이름과 전공을 채워주세요!");
            nameRef.current.focus();
            return;
        }
        
        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(student),
        }).then(() => {
            alert("추가됨!");
            navigate("/list");
        });
    };

    return(
        <div className="container mt-5">
            <h3>학생 추가</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name</label>
                    <input type="text" className="form-control" name="name" value={student.name} onChange={handleChange} ref={nameRef} />
                </div>
                <div className="mb-3">
                    <label>Major</label>
                    <input type="text" className="form-control" name="major" value={student.major} onChange={handleChange} ref={majorRef} />
                </div>
                <div className="mb-3">
                    <label>Age</label>
                    <input type="number" className="form-control" name="age" value={student.age} onChange={handleChange} ref={ageRef} />
                </div>
                <div className="mb-3">
                    <label>Score</label>
                    <input type="number" className="form-control" name="score" value={student.score} onChange={handleChange} ref={scoreRef} />
                </div>
                <button type="submit" className="btn btn-primary">등록하기</button>
            </form>
        </div>
    );
}