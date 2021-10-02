import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from "react-router-dom";

const AddPlacementPage = (props) => {
    const { params } = props.match;
    const [studentInfo, setStudentInfo] = useState(null);
    const [schoolSessionsArray, setSchoolSessionsArray] = useState([]);
    const [selectedSession, setSelectedSession] = useState("");
    const [selectedOpportunity, setSelectedOpportunity] = useState("");
    const [selectedInstructor, setSelectedInstructor] = useState("");
    const [day, setDay] = useState("");
    const [shift, setShift] = useState("");
    const [setting, setSetting] = useState("");
    const [population, setPopulation] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [opportunitiesArray, setOpportunitiesArray] = useState([]);
    const [opportunities, setOpportunities] = useState([]);
    const [submissionMessage, setSubmissionMessage] = useState("");
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch(`/api/v1/students/${params.studentId}`)
          .then(response => response.json())
          .then(data => {
                setStudentInfo(data.data);
            });

        fetch(`/api/v1/school-sessions`)
          .then(response => response.json())
          .then(data => {
            setSchoolSessionsArray(data.data);
          })
        
        setIsLoading(false);
    }, [params.studentId]);

    const onSessionSelect = useCallback((e) => {
        setSelectedSession(e.target.value);
        fetch(`/api/v1/placement-opportunities?school-session=${selectedSession}`)
          .then(response => response.json())
          .then(data => {
              setOpportunitiesArray(data.data)
          })
    }, [selectedSession])

    const onSettingSelect = useCallback((e) => {
        setSetting(e.target.value);
        const opportunitiesWithSetting = opportunitiesArray.filter((opportunity) => opportunity.setting === e.target.value);
        setOpportunities(opportunitiesWithSetting)
    }, [opportunitiesArray])

    const onPopulationSelect = useCallback((e) => {
        setPopulation(e.target.value);
        const opportunitiesWithPopulation = opportunities.filter((opportunity) => opportunity.population === e.target.value);
        setOpportunities(opportunitiesWithPopulation)
    }, [opportunities])

    const onOpportunitySelect = useCallback((e) => {
        setSelectedOpportunity(e.target.value);
    }, [])

    const handleFormSubmission = (e) => {
        e.preventDefault();
        const chosenOpportunity = opportunities.filter((opportunity) => opportunity._id === selectedOpportunity)

        const placementInfo = {
            siteId: chosenOpportunity[0].siteId,
            schoolSessionId: chosenOpportunity[0].schoolSessionId,
            studentId: studentInfo._id,
            setting: setting,
            population: population,
            instructorId: selectedInstructor,
            shift: shift,
            days: day
        }

        const data = {
            placementInfo,
            placementOpportunityId: selectedOpportunity
        }

        fetch(`/api/v1/placements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
              console.log(data.data)
              if(data.status === 'success') {
                setSubmissionMessage("Placement successfully assigned to student")
                setTimeout(() => {
                    setRedirect(`/students/${studentInfo._id}`);
                }, 2000);
              }

              else
              setSubmissionMessage(`Placement not assigned to student. The following error occured: ${data.message}`)
          })
          .catch(err => {
              setSubmissionMessage(`The following error occured: ${err.message}`)
          })
    }

    if (redirect) {
        return <Redirect to={redirect} />
    }

    return (
        <div className="App">
            <div className="App-header">
                {!isLoading && studentInfo != null && schoolSessionsArray != null && (
                    <form>
                        <label>First Name</label>
                        <input type="text" name="firstName" value={studentInfo.firstName} readOnly={true} /> &nbsp;
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={studentInfo.lastName} readOnly={true} /> &nbsp;
                        
                        <br />
                        <br />

                        <label>Level</label>
                        <input type="text" name="level" value={studentInfo.level} readOnly={true} /> &nbsp;
                        <label>Preferred Location</label>
                        <input type="text" name="preferredLocation" value={studentInfo.preferredLocation} readOnly={true} /> &nbsp;
                        <label>Session Info</label>
                        <select
                          onChange={onSessionSelect}
                          value={selectedSession}
                        >
                            <option>Select a school session</option>
                            {schoolSessionsArray.map((schoolSession, key) => 
                              <option 
                                key={key} 
                                value={schoolSession._id}
                              >
                                {schoolSession.sessionName}
                              </option>
                            )}
                        </select>

                        <br />
                        <br />

                        <label>Setting</label>
                        <select
                         onChange={onSettingSelect}
                         value={setting}
                        >
                            <option>Select a setting</option>
                            <option value="hospital">Hospital</option>
                            <option value="community">Community</option>
                        </select> &nbsp;&nbsp;

                        <label>Population</label>
                        <select
                          onChange={onPopulationSelect}
                          value={population}
                        >
                            <option>Select a population</option>
                            <option value="pregnant women">Pregnant women</option>
                            <option value="children">Children</option>
                        </select>

                        <br />
                        <br />

                        <label>Placement location</label>
                        <select
                          onChange={onOpportunitySelect}
                          value={selectedOpportunity}
                        >
                            <option>Select a placement location</option>
                            {opportunities.map((opportunity, key) => 
                              <option 
                                key={key} 
                                value={opportunity._id}
                              >
                                {opportunity.site[0].name} ({opportunity.site[0].location})
                              </option>
                            )}
                        </select> &nbsp;&nbsp;
                        
                        <label>Instructor</label>
                        <select
                          onChange={ (e) => setSelectedInstructor(e.target.value)}
                          value={selectedInstructor}
                        >
                            <option>Select an Instructor</option>
                            <option value="61527ab8eb782397bdd4aa56">Mary Lee</option>
                        </select>

                        <br />
                        <br />

                        <label>Day</label>
                        <input type="text" onChange={(e) => setDay(e.target.value)} /> &nbsp;&nbsp;

                        <label>Shift</label>
                        <input type="text" onChange={(e) => setShift(e.target.value)} />

                        <br />
                        <br />

                        <button onClick={handleFormSubmission}>Submit</button>
                    </form>
                )}

                <div>{submissionMessage}</div>
            </div>
        </div>
    )
}

export default AddPlacementPage;