import React, { useEffect, useState } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";

const Todo = () => {
  const [id, SetIdchange] = useState("");
  const [name, SetNamechange] = useState("");
  const [empdata, setEmpdataChange] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/todo")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpdataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log("ini empdata", empdata);

  const handlesubmit = (e) => {
    e.preventDefault();
    const emData = { id, name };

    fetch("http://localhost:8000/todo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(emData),
    })
      .then((res) => {
        alert("saved-success");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <div className="container mt-2">
        <h2>Todo App</h2>
        <form className="container" onSubmit={handlesubmit}>
          <div className="card mt-5">
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <label className="text-left my-2">Masukan Todo:</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => SetNamechange(e.target.value)}
                    className="form-control"
                  ></input>
                </div>
              </div>
            </div>
            <div className="col-lg-12" style={{ textAlign: "center" }}>
              <div className="form-group my-2">
                <button type="submit" className="btn btn-success me-2">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>

        <div className="my-5">
          <h2>Ini Todo:</h2>

            {empdata &&
              empdata.map((item) => (
                <div className="text-left">
                  <ListGroup>
                    <ListGroup.Item>{item?.name}</ListGroup.Item>
                  </ListGroup>
                </div>
              ))}
          
        </div>
      </div>
    </>
  );
};

export default Todo;
