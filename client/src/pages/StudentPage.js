import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const StudentPage = (props) => {
    const { params } = props.match;
    const [studentInfo, setStudentInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/students/${params.studentId}`)
          .then(response => response.json())
          .then(data => {
                setStudentInfo(data.data);
                setIsLoading(false);
            });
    }, [params.studentId]);


    return (
        <div className="App">
            <div className="App-header">
                <Link to={`/students`} style={{color: '#ffffff'}}>Back</Link>
               {!isLoading && studentInfo !== null ? (
                   <div>
                   <p>Student Name: {`${studentInfo.firstName} ${studentInfo.lastName}`}</p>
                   <p>Student Level: {studentInfo.level}</p>
                   <p>Preferred Location: {studentInfo.preferredLocation}</p>
                   <p>Student Email: {studentInfo.studentEmail}</p>
                   <Link to={`/placements/${studentInfo._id}/new`} style={{color: '#ffffff'}}>Assign placement</Link>
                   </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
        </div>
    )
}

export default StudentPage;