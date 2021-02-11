import { useState } from "react";
import "./entity.scss"

function Entity(props) {
    const [expand, setExpand] = useState(false);

    let className = 'module fade';
    if (expand === true) {
        className = 'module expand';
    }
    return (
        <div className="Entity" onClick={() => setExpand(prevState => !prevState)}>
            <p className="Date">{props.date}</p>
            <div className={className}>
                <p className="Content">{props.content}</p>
            </div>
        </div>
    );
}

export default Entity;
