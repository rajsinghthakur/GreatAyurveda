import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import ReactPLayer from 'react-player/youtube';
export default function GetStart() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const back = () => {
        navigate(-1);
    }

    return <>
        <div class="card container-fluid my-3">
            <div class="row g-0">
                <div class="col-md-5">
                    <ReactPLayer url={state.videoUrl} controls={true} width="100%" volume={0.8} />
                </div>
                <div class="col-md-7">
                    <div class="card-body m-0 p-0">
                        <h5 class="card-title m-0 p-0 fs-4">{state.yogaName}</h5>
                        <p class="card-text m-0 p-0 mt-3">Benefits of {state.yogaName}</p>
                        <p class="card-text m-0 p-0"><small class="text-muted">{state.benefits}</small></p>
                        <p class="card-text m-0 p-0 mt-3">Instructions of {state.yogaName}</p>
                        <p class="card-text m-0 p-0"><small class="text-muted">{state.instructions}</small></p>
                        <button onClick={back} className="btnn text-white mt-3">Back</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}