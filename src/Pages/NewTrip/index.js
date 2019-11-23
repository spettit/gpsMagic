import React, { useState } from "react";

function NewTrip(props) {
  const [name, setName] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState();
  return (
    <div className="container">
      <div className="Top-spacer"></div>
      <h2>Add a new Trip</h2>
      <form>
        <div>
          <label>
            name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Start Date
            <input
              type="date"
              value={startdate}
              onChange={e => setStartdate(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Date
            <input
              type="date"
              value={enddate}
              onChange={e => setEnddate(e.currentTarget.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea
              type="text"
              value={description}
              onChange={e => setDescription(e.currentTarget.value)}
            />
          </label>
        </div>
        <p>Countries</p>
        <p>Marker Co-ords</p>
        <p>Region</p>
        <p>Slug</p>
        <p>Type</p>
        <div>
          <label>
            Cover Image
            <input
              type="file"
              onChange={e => setFile(e.currentTarget.files[0])}
            //   hidden="hidden"
            />
          </label>
        </div>
        <img src={file && URL.createObjectURL(file)} alt="pic" width="200px"/>
      </form>
    </div>

  );
}

export default NewTrip;
