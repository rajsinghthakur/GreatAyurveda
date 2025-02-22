import axios from "axios";
import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom"
import { FaPlay } from "react-icons/fa";

const Yoga = () => {
    const [yogalist, setYoga] = useState([]);
    useEffect(() => {
        axios.get(process.env.React_APP_SECRET_KEY_Yoga)
            .then(response => {
                setYoga(response.data.YogaList);
            }).catch(err => {
                console.log(err);
            })
    }, []);

    const navigate = useNavigate();
    const getStart = (yoga) => {
        navigate("/getstart", { state: yoga });
    }
    return (<>
        <div id="link5" className="mt-3 text-center d-flex align-items-top justify-content-evenly gap-5 flex-wrap overflow-hidden" style={{ background: "var(--white)" }}>
            {yogalist.map((yogaa, index) => <div key={index} className="mb-4 mt-1 card shadow" id="view_hover" style={{ width: "20rem" }}>
                <img src={yogaa.imageUrl} style={{ height: "220px", cursor: "pointer" }} onClick={() => getStart(yogaa)} className="ms-1 remede-img card-img-top p-1" alt="..." />
                <FaPlay className="youtube-icon p-2 view" onClick={() => getStart(yogaa)} />
                <div className="card-body m-0 p-1">
                    <h4 className="card-title fs-6 fw-bold p-0 m-0">{yogaa.yogaName.slice(0, 28)}</h4>
                    <p className="card-text p-0 m-0 mt-3" style={{ fontSize: "0.9rem" }}>{yogaa.benefits.slice(0, 100)}</p>
                    <button className="fs-6 btnn text-white my-3" onClick={() => getStart(yogaa)}>Get Start</button>
                </div>
            </div>)}
        </div>
    </>);
};

export default Yoga;
