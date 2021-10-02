import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StudentsPage = (props) => {
    const [studentsList, setStudentsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/students`)
          .then(response => response.json())
          .then(data => {
                setIsLoading(false);
                setStudentsList(data.data);
            });
    }, []);

    const renderStudentsList = (students) => {
        if(students && (typeof students != "string")) {
            return students.map((student, e) => {
                return (
                    <tr key={e}>
                        <td>{student.firstName}</td>
                        <td>{student.lastName}</td>
                        <td>{student.level}</td>
                        <td>{student.studentEmail}</td>
                        <td>{student.preferredLocation}</td>
                        <td><Link to={`/students/${student._id}`} style={{color: '#ffffff'}}>View Student Details</Link></td>
                    </tr>
                )
            });
        }
        else {
            return <div className="">
                <p className="text-center">An error occured</p>
            </div>;
        }
    }

    return (
        <div className="App">
            <div className="App-header">
                <Link to={`/`} style={{color: '#ffffff'}}>Back</Link>
            {isLoading &&
                <p>Loading...</p>
            }
            <table>
                <thead>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Level</td>
                        <td>Student Email</td>
                        <td>Preferred Location</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {renderStudentsList(studentsList)}
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default StudentsPage;