import { useState } from 'react'

import './DisasterReport.css'

function  DisasterReportPage() {

   const [disasterType, setDisasterType] = useState('');
   const [location, setLocation] = useState('');
   const [severity, setSeverity] = useState('');
   const [disasterDate, setDisasterDate] = useState('');

   const handleSubmit = async  (disasterType: string, location: string, severity: string, disasterDate: string) => {
    
    console.log(
      JSON.stringify(
          {
            disasterType: disasterType,
            location: location,
            severity: severity,
            disasterDate: disasterDate
          }
        )

    );

    try{
      
     const data = await fetch('http://localhost:8080/reports', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
       
        body: JSON.stringify(
          {
               disasterType: disasterType,
              location: location,
              severity: severity,
              disasterDate: disasterDate
          })
        
        }
      )
      const value = await  data.body?.getReader().read();
      console.log( new TextDecoder().decode(value?.value || new Uint8Array(0)) );
      
    }
      catch(error) {
        console.error('Error submitting disaster report:', error);
      }
          


    }
   


   
  

  return (
    <>
    <div className="container">
        <h1>Disaster Report Form</h1>
        
            <div className="form-group">
                <label htmlFor='disasterType'>Disaster Type</label>
                <select id="disasterType" name="disasterType" value={disasterType} onChange={(e) => setDisasterType(e.target.value)} required>
                    <option value="">-- Select a Disaster Type --</option>
                    <option value="Flood">Flood</option>
                    <option value="Fire">Fire</option>
                    <option value="Earthquake">Earthquake</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor='location'>Location</label>
                <input type="text" id="location" name="location" placeholder="Enter location" value={location} onChange={(e) => setLocation(e.target.value)} required></input>
            </div>

            <div className="form-group">
                <label htmlFor='severity'>Severity</label>
                <select id="severity" name="severity" value={severity} onChange={(e) => setSeverity(e.target.value)} required>
                    <option value="">-- Select Severity Level --</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor='disasterDate'>disasterDate (YYYY-MM-DD)</label>
                <input type="text" value={disasterDate} onChange={(e)=> setDisasterDate(e.target.value)} id="disasterDate" name="disasterDate" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}" required></input>
            </div>

            <button type="submit" onClick={async (e) => { await handleSubmit(disasterType, location, severity, disasterDate)}}
            >Submit</button>
       
    </div>
    </>
  )
}

export default DisasterReportPage
