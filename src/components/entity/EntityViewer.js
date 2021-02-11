import DiaryService from "../../ServiceApi";
import Entity from "./Entity"
import { useState, useEffect } from "react";

const diaryService = new DiaryService()

function EntityViewer() {
    const [entities, setEntities] = useState([]);

    useEffect(() => {
        diaryService.getEntities(1).then(result => setEntities(result.results))
    }, []);

    let lstEntities = entities.map((entity, key) => <Entity key={key}
                                                            date={entity.pub_date}
                                                            content={entity.content}/>)

    return (
        <div className="EntityViewer">
            {lstEntities}
        </div>
    );
}

export default EntityViewer;

// Мэри, Мэри.
// После встречи с тобой,
// Мое тело горит,
// Как после крещенской купели.
/*********************************/
// Знаю что зовут вас не Мэри.
// Ваши просьбы,
// Обращаться на "Вы"
// Уже надоели.
/*********************************/
// Извольте простить.
// Так ты Мэри!?
// Будьте добры,
// Назовите имя скорее...