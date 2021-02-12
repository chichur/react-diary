import DiaryService from "../../ServiceApi";
import Entity from "./Entity"
import { useRef, useState, useEffect } from "react";
import { Formik } from 'formik';
import autosize from "autosize"
import "./entity.scss"

const diaryService = new DiaryService()

function EntityViewer() {
    const [entities, setEntities] = useState([]);
    const [mode, setMode] = useState(false); // false -> view mode; true -> new entity mode
    const [page, setPage] = useState(1);
    const loadMoreButton = useRef(null);

    //todo: pagination

    useEffect(() => {
        diaryService.getEntities(page).then(result => setEntities(prevState => prevState.concat(result.results)));
        autosize(document.querySelector('textarea'));
        return () => {
            autosize.destroy(document.querySelectorAll('textarea'));
        }
    }, [mode, page]);

    let lstEntities = entities.map((entity, key) => <Entity key={key}
                                                            date={entity.pub_date}
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

                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => diaryService.postEntity(values)
                                .then(() =>  {setSubmitting(false)
                                              setMode(false)})
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
                                    <option value="" label="Select a color" />
                                    <option value="red" label="red" />
                                    <option value="blue" label="blue" />
                                    <option value="green" label="green" />
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
                <div className="Entity more" ref={loadMoreButton} onClick={onButtonClick}>
                    <p>Load more</p>
                </div>
            </div>
        );
}

export default EntityViewer;
