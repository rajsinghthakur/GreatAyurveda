import { useLocation, useNavigate } from "react-router-dom"
export default function ViewMore() {

    const navigate = useNavigate();
    const { state } = useLocation();
    const instructions = state.instructions.split(",");
    const back = () => {
        navigate(-1)
    }

    return <>
        <div className="card container-fluid my-3">
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={state.imageUrl} className="p-1 img-fluid rounded-start" alt="..." />
                    <h5 className="card-title fs-4 text-center">{state.remedyName}</h5>
                </div>
                <div className="col-md-8">
                    <div className="card-body m-0 p-0">
                        <p className="card-text m-0 p-0">Homeremedy {state.remedyName}</p>
                        <p className="card-text m-0 p-0"><small className="text-muted">{state.description}</small></p>
                        <p className="card-text m-0 p-0">Ingredients of {state.remedyName}</p>
                        <p className="card-text m-0 p-0"><small className="text-muted">{state.ingredients}</small></p>
                        <p className="card-text m-0 p-0">Instructions of {state.remedyName}</p>
                        {instructions.map((data, index) => <div key={index}>
                            <p className="card-text m-0 p-0"><small className="text-muted">{instructions[index]}</small></p>
                        </div>)}
                        <p className="card-text m-0 p-0">caution of {state.remedyName}</p>
                        <p className="card-text m-0 p-0"><small className="text-muted">{state.caution}</small></p>
                        <button onClick={back} className="btnn text-white m-2">Back</button>
                    </div>
                </div>
            </div>
        </div>
    </>
}