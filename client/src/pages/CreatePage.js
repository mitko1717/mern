import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CreatePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/create");
  }, []);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="put in the link"
            // id="email"
            type="text"
            // name='email'
            // onChange={changeHandler}
          />
          <label htmlFor="email">email</label>
        </div>
      </div>
      <h1>Create</h1>
    </div>
  );
};

export default CreatePage;
