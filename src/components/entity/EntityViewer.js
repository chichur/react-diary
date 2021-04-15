import DiaryService from "../../ServiceApi";
import Entity from "./Entity"
import { useState, useEffect } from "react";
import { Formik } from "formik";
import autosize from "autosize"
import "./entity.scss"
import "datejs"

const diaryService = new DiaryService()

function formatDate(str_date) {
    let date = new Date();
    date.setTime(Date.parse(str_date));
    return date.format("d M Y G:i")
}

function EntityViewer() {
    const [entities, setEntities] = useState([]);
    const [mode, setMode] = useState(false); // false -> view mode; true -> new entity mode
    const [page, setPage] = useState(1);
    const [next, setNext] = useState(null);

    useEffect(() => {
        diaryService.getEntities(page).then(result => {setEntities(prevState => prevState.concat(result.results));
                                                       setNext(result.next);});
    }, [page]);

    useEffect(() => {
        diaryService.getEntities(1).then(result => {setEntities(result.results);
            setNext(result.next);});
        autosize(document.querySelector('textarea'));
        return () => {
            autosize.destroy(document.querySelectorAll('textarea'));
        }
    }, [mode]);

    let lstEntities = entities.map((entity, key) => <Entity key={key}
                                                            date={formatDate(entity.pub_date)}
                                                            content={entity.content}/>)

    if (mode)
        return (
            <div className="EntityViewer">
                <Formik
                    initialValues={{ content: ''}}
                    validate={values => {
                        const errors = {};
                        if (!values.content) {
                            errors.content = 'Required';
                        }
                        else if(values.content.length < 200) {
                            errors.content = 'Text must be more than 200 characters';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => diaryService.postEntity(values)
                                .then(() =>  {setSubmitting(false);
                                              setMode(false);})
                                .catch(() => console.log('Connection error'))}
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
                            <h1>Add new entity</h1>
                            <p style={{color: 'red'}}>{errors.content}</p>
                            <textarea
                                placeholder="To cry here..."
                                name="content"
                                onChange={handleChange}
                                value={values.content}
                            />
                            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                <select
                                    name="happy_tracker"
                                >
                                    <option value="1" label="awful" />
                                    <option value="2" label="worse" />
                                    <option value="3" label="usual" />
                                    <option value="4" label="good" />
                                    <option value="5" label="excellent" />
                                </select>
                                <button type="submit" disabled={isSubmitting}>
                                    Submit
                                </button>
                            </div>
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
                {next ?
                    <div className="Entity more" onClick={() => setPage(prevState => prevState + 1)}>
                    <p>Load more</p>
                    </div> : null}
            </div>
        );
}

export default EntityViewer;
