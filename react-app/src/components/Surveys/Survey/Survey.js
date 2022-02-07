import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom';
import { getQuestions } from '../../../store/questions';
import Slider from '../Slider/Slider'
import ArrowButton from '../../Forms/ArrowButton/ArrowButton';
import './Survey.css'

const Survey = () => {

    // const userId = session.user.id
    const params = useParams();
    const history = useHistory()
    // let surveyId = 4;
    console.log({ params })

    const [formData, setFormData] = useState()


    const surveys = [
        {
            id: 1,
            name: 'Privacy'
        },
        {
            id: 2,
            name: 'Education'
        },
        {
            id: 3,
            name: 'Money'
        },
        {
            id: 4,
            name: 'Pop Culture'
        },
        {
            id: 5,
            name: 'Animals'
        },
        {
            id: 6,
            name: 'Travel'
        },
        {
            id: 7,
            name: 'Sleep'
        },
        {
            id: 8,
            name: 'Food'
        },
        {
            id: 9,
            name: 'Fitness'
        },
        {
            id: 10,
            name: 'Parents'
        },
        {
            id: 11,
            name: 'Fear'
        },
        {
            id: 12,
            name: 'Music'
        }
    ]
    const surveyQuestions = [
        {
        id:1,
        one_label:'Disagree',
        ten_label: 'Agree',
        text: `If all my ex-partners remembered to sign out of their streaming services prior to breaking up, I wouldn't have access to a single streaming service.`,
        initial_value: 1
        },
        {
            id:36,
            one_label:'Disagree',
            ten_label: 'Agree',
            text: `When I hear the term 'Pop Culture' I immediately think of soda and soft drinks.`,
            initial_value: 6
        },
        {
            id:222,
            one_label:'Disagree',
            ten_label: 'Agree',
            text: `I say that I like St. Vincent because I feel like cool people like St. Vincent, but I can't bring myself to genuinely enjoy her music.`,
            initial_value: 7
        }
    ]

    const surveyName = surveys.filter(survey => survey.id === 4)[0].name

    // const dispatch = useDispatch();
    // const questions = useSelector(state => state.questions);

    // useEffect(() => {
    //     dispatch(getQuestions(2));
    // }, [dispatch])

    const handleSubmit = (e) => {
        console.log('handleSubmit')
        let entries = []
        let inputs = document.querySelectorAll('input')

        for (let i = 0; i < inputs.length; i++) {
            let newObj = {
                question_id: inputs[i]['id'],
                value: inputs[i]['value']
            }

            entries.push(newObj)
        }

        let reqBody = JSON.stringify({
            "question_responses": entries
        })

        console.log(reqBody)
    }

    const handleCancel = (e) => {
        console.log('handleCancel')
        history.push('/surveys')
    }

    return (
        <>
        <div className='survey-background' id='dark__background'/>
        <div className='survey' id="flex__container--split">
            <div className='left-col flex__container--child'>
                    <h1>{surveyName}</h1>
                    <div className='button-container'>

                    <ArrowButton
                        // type='submit'
                        // formId='survey-form'
                        // validationObject={{}}
                            onClickFunction={handleSubmit}
                    >
                        Submit

                    </ArrowButton>
                    <ArrowButton
                        onClickFunction={handleCancel}
                    >
                        Cancel
                        </ArrowButton>
                    </div>
        </div>
        <div id='flex__container--divider'></div>
            <div className='right-col flex__container--child'>

            <form id='survey-form' onSubmit={handleSubmit}>
                {surveyQuestions.map(question => (
                    <Slider
                        key={question.id}
                        oneLabel={question.one_label}
                        tenLabel={question.ten_label}
                        text={question.text}
                        questionId={question.id}
                        initialValue={question.initial_value}
                    />
                    ))
                }
            </form>
            </div>
            </div>
    </>
    )
}


export default Survey
