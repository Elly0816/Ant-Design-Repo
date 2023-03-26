import { Fragment, ReactElement } from "react";
import "./Loading.css";

export default function Loading(): ReactElement{


    return <Fragment>
                <div className="loading">
                    <span>Loading</span>
                    {/* Below is the spinner */}
                    <div className='loader'></div>
                </div>
            </Fragment>
}