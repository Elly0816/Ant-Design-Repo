import { ReactElement } from "react";
import "./Loading.css";

export default function Loading(): ReactElement{


    return <div className="loading">
        <span>Loading</span>
        <div className='loader'></div>
    </div>
}