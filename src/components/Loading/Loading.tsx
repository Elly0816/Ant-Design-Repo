import { Fragment, ReactElement } from "react";
import "./Loading.css";

export default function Loading({item} : {item:string}): ReactElement{

    const capItem = item.charAt(0).toUpperCase() + item.slice(1);

    return <Fragment>
                <div className="loading">
                    <span>Loading {capItem}</span>
                    {/* Below is the spinner */}
                    <div className='loader'></div>
                </div>
            </Fragment>
}