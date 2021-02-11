import DiaryService from "../../ServiceApi";
import Entity from "./Entity"
import { useState, useEffect } from "react";
import { Formik } from 'formik';
import "./entity.scss"

const diaryService = new DiaryService()

function EntityViewer() {
    const [entities, setEntities] = useState([]);
    const [mode, setMode] = useState(false) // false -> view mode; true -> new entity mode

    useEffect(() => {
        diaryService.getEntities(1).then(result => setEntities(result.results))
    }, []);

    let lstEntities = entities.map((entity, key) => <Entity key={key}
                                                            date={entity.pub_date}
                                                            content={entity.content}/>)

    if (mode)
        return (
            <div className="EntityViewer">
                <h1>Anywhere in your app!</h1>
                <Formik
                    initialValues={{ content: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.content) {
                            errors.content = 'Required';
                        }

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            diaryService.postEntity(values)
                                .then(() =>  setSubmitting(false))
                                .catch(() => console.log('уу сука'))
                        }, 400);
                    }}
                >
                    {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                      }) => (
                        <form onSubmit={handleSubmit}>
                            <textarea
                                name="content"
                                onChange={handleChange}
                                value={values.content}
                            />
                            {errors.content}
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
            </div>
        );
    else
        return (
            <div className="EntityViewer">
                <div className="Entity add" onClick={() => setMode(prevState => !prevState)}/>
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