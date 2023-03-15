import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";

const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        // in this field i will get object where keeping about link
        const data = await request('/api/link/generate', 'POST', {from: link}, {
            Authorization: `Bearer ${auth.token}`
        })
        // console.log("data", data);
        navigate(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  };

  useEffect(() => {
    navigate("/create");
  }, [navigate]);

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
        <div className="input-field">
          <input
            placeholder="insert link"
            id="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            onKeyDown={pressHandler}
          />
          <label htmlFor="link">link</label>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
