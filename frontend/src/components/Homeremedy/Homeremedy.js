import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
const Homeremedy = () => {
    const [homeremedies, setHomeremedies] = useState([]);
    useEffect(() => {
        axios.get(process.env.React_APP_SECRET_KEY_Homeremedies)
            .then(response => {
                setHomeremedies(response.data.HomeRemedyList)
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const navigate = useNavigate();

    const ViewMore = (remedy) => {
        navigate("/ViewMore", { state: remedy });
    }

    return (<>
        <div className="text-center mt-3 d-flex align-items-top justify-content-evenly gap-5 flex-wrap overflow-hidden" style={{ background: "var(--white)" }}>
            {homeremedies.map((remedy, index) => <div key={index} className="mb-4 mt-1 card shadow" id="view_hover" style={{ width: "20rem", flex: "0 0 auto" }}>
                <img src={remedy.imageUrl} style={{ height: "220px", cursor: "pointer" }} onClick={() => ViewMore(remedy)} className="ms-1 remede-img card-img-top p-1" alt="..." />
                <i className="youtube-icon bg-danger text-light w-25 view pt-1" onClick={() => ViewMore(remedy)} style={{cursor:"pointer"}}>ViewMore</i>
                <div className="card-body m-0 p-1 px-3">
                    <h4 className="card-title fs-6 fw-bold p-0 m-0">{remedy.remedyName.slice(0, 30)}</h4>
                    <p className="card-text p-0 m-0 mt-3" style={{ fontSize: "0.7rem" }}>{remedy.description.slice(0, 80)}</p>
                    <button className="fs-6 btnn text-white my-3" onClick={() => ViewMore(remedy)}>View More</button>
                </div>
            </div>)}
        </div>
    </>);
};

export default Homeremedy;