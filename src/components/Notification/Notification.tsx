import { CSSProperties} from "react";
import './Notification.css';
import {notification} from 'antd';


const add: CSSProperties = {
    width: '300px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    height: '70px',
    fontFamily: "sans-serif",
    fontWeight: "light",
    color: 'white',
    fontSize: 'smaller',
}

const remove: CSSProperties = {
    width: '300px',
    boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.5)',
    height: '70px',
    fontFamily: "sans-serif",
    fontWeight: "light",
    color: 'white',
    fontSize: 'smaller',
}

const spanStyle: CSSProperties = {
    color: "black",
    fontSize: "smaller"
}

export function addedNotification(currency: string)  {
    notification.success({
        message: (<span style={spanStyle}>
            {currency} was added to favorites
        </span>),
        placement: 'top',
        style: add,
        duration: 1.5
    })
}

export function removedNotification(currency: string)  {
    notification.warning({
        message: (
            <span style={spanStyle}>
                {currency} was removed from favorites
            </span>
        ),
        placement: 'top',
        style: remove,
        duration: 1.5
    })
}