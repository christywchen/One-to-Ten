import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { removeQuestionResponses, getQuestionResponses } from "../../../store/questionResponses";
import { getSurveyResponses, removeSurveyResponse } from "../../../store/surveyResponses";

function SurveyButton({ name, completed, id, deleteResponseMode, setDeleteResponseMode }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const surveyResponses = useSelector(state => state.surveyResponses.bySurveyId)
    const surveys = useSelector(state => state.surveys)
    const userId = sessionUser.id;

    useEffect(() => {
        dispatch(getSurveyResponses(userId));
    }, [deleteResponseMode, dispatch])


    const handleDelete = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(`deleting id ${id}`)
        //dispatch deletion
        dispatch(removeQuestionResponses(id, userId));
        dispatch(removeSurveyResponse(id, userId));
        setDeleteResponseMode(false)
    }

    return (
        <>
            <NavLink className='survey__navlink' to={`/surveys/${id}`}>
                {deleteResponseMode && completed &&
                    <button className="survey__delete-resposnes" onClick={handleDelete}>
                        <span>X</span>
                    </button>
                }
            <div className={`survey__button--container completed-${completed}`}>
            <div className='survey__button--link'>
            </div>
            <h5 className='survey__button--title'>
                {name}
            </h5>
            </div>
            </NavLink>
        </>
    )
}

export default SurveyButton;
