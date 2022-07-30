import React from "react";
import Details from '@theme/Details';

import "./Feedback.css"

// Name keeps track of version on Netlify if fields change
const formName = 'feedback v1'

export const Feedback = (props) => {
    return (
        <Details
            className={"feedback"}
            summary={<summary><strong>Let us know what you think!</strong>
            </summary>}
        >
            <form
                name={formName}
                method='post'
                data-netlify='true'
                onSubmit='submit'
                data-netlify-honeypot={'bot-field'}
            >
                <div hidden><input name='bot-field'/></div>
                <input type={'hidden'} name={'form-name'} value={formName}/>
                <input type={'hidden'} name={'chapter'} value={props.page}/>

                <label className="prompt" htmlFor="usefulness">
                    How useful did you find this chapter?<sup>*</sup>
                </label>
                <div className="label-block">
                    <label className="radio-label" style={{textAlign: "right"}} htmlFor="usefulness1">Not Useful</label>
                    <div className="radio-block">
                        <input type="radio" id="usefulness1" name="usefulness" value={1} required/>
                        <input type="radio" id="usefulness2" name="usefulness" value={2} required/>
                        <input type="radio" id="usefulness3" name="usefulness" value={3} required/>
                        <input type="radio" id="usefulness4" name="usefulness" value={4} required/>
                        <input type="radio" id="usefulness5" name="usefulness" value={5} required/>
                    </div>
                    <label className="radio-label" htmlFor="usefulness5">Very Useful</label>
                </div>

                <label className="prompt" htmlFor="usefulness">
                    What did you think about the difficulty of this chapter?<sup>*</sup>
                </label>
                <div className="label-block">
                    <label className="radio-label" style={{textAlign: "right"}} htmlFor="difficulty1">Too Simple</label>
                    <div className="radio-block">
                        <input type="radio" id="difficulty1" name="difficulty" value={1} required/>
                        <input type="radio" id="difficulty2" name="difficulty" value={2} required/>
                        <input type="radio" id="difficulty3" name="difficulty" value={3} required/>
                        <input type="radio" id="difficulty4" name="difficulty" value={4} required/>
                        <input type="radio" id="difficulty5" name="difficulty" value={5} required/>
                    </div>
                    <label className="radio-label" htmlFor="difficulty5">Too Complex</label>
                </div>

                <label className="prompt" htmlFor="suggestions">
                    Do you have any specific recommendations for improving this chapter?
                </label>
                <textarea
                    className="text-input"
                    id="suggestions"
                    name="suggestions"
                ></textarea>
                <button className="submit-button button button--outline button--primary" type='submit'>
                    Submit
                </button>
            </form>
        </Details>
    )
}
