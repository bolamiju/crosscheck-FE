import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltRight } from "@fortawesome/free-solid-svg-icons";


const Modal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            style={OVERLAY_STYLES}>
            <ModalWrapper>
                <Formik
                    initialValues={{ name: "", email: "", message: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("submitting",values)
                    }}


                    validationSchema = {Yup.object().shape({
                        name: Yup.string()
                        .required("Required !"),
                        email: Yup.string()
                            .email()
                            .required("Required !"),
                        message: Yup.string()
                        .required("Required !")
                    })}
                >
                    {
                        props => {
                            const {
                                values,
                                touched,
                                errors,
                                isSubmitting,
                                handleChange,
                                handleBlur,
                                handleSubmit
                            } = props;
                            return (
                                <form className="form" onSubmit={handleSubmit}>
                                    <p>Leave us a message</p>
                                    <div className="field">
                                        <label htmlFor="name">name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.name && touched.name && "error"}
                                        />
                                        
                                    </div>
                                    {errors.name && touched.name && (
                                            <div className="input-feedback">{errors.name}</div>
                                        )}
                                    <div className="field">
                                        <label htmlFor="email">email</label>
                                        <input
                                            name="email"
                                            type="email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={errors.email && touched.email && "error"}
                                        />
                                    </div>
                                    {errors.email && touched.email && (
                                            <div className="input-feedback">{errors.email}</div>
                                        )}
                                    <div className="field">
                                        <label htmlFor="subject">subect</label>
                                        <input
                                            name="subect"
                                            type="text"
                                            value={values.subject}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div className="field">
                                        <label htmlFor="message">message</label>
                                        <textarea
                                            name="message"
                                            type="text"
                                            value={values.message}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className="message"
                                            className={errors.message && touched.message && "error"}
                                            />
                                        </div>
                                        {errors.message && touched.message && (
                                                <div className="input-feedback">{errors.message}</div>
                                            )}
                                    <button className="button" type="submit" >send message <FontAwesomeIcon icon={faLongArrowAltRight}/></button>
                                </form>
                            )
                        }
                }
                </Formik>
            </ModalWrapper>
        </div>
    )
};

const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1000
};

const ModalWrapper = styled.div`
position: fixed;
top: 50%;
left: 50%;
transform: translate(-50%,-50%);
background: white;
z-index: 1000;
&:hover {
    border: var(--mainYellow);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
}
.form {
    width: 350px;
    min-height: 460px;

    p {
    margin-top: 0 !important;
    margin-bottom: 10px !important;
    padding: 0.3rem 0 0.5rem 0;
    font-family: MontserratRegular;
    font-size: 20px;
    text-align: center !important;
    font-weight: normal;
    background: #0091DF;
    letter-spacing: 0.6px;
    color: #FFFFFF;
    opacity: 1;
    }
    .field {
        display: block;
       
        input, label {
            display: block;
            margin-left: 1rem;
        }
        label {
          font-family: MontserratRegular;
          letter-spacing: 0.32px;
          color: #707070;
          text-transform: capitalize;
          opacity: 1;
          padding-top: 0.5rem;
        }
        input {
            width: 85%;
            height: 30px;
            color: #707070;
            border-radius: 10px;
            opacity: 0.8;
            outline: none;
            border: 0.5px solid #707070;
            padding-left: 0.5rem;
           
        }
        textarea {
            width: 80%;
            height: 70px;
            margin-bottom: 0.5rem;
            border-radius: 10px;
            margin-left: 1rem;
            outline: none;
            padding: 1rem;
        }
       
    }
    .button {
    font-family: MontserratBold;
    text-transform: capitalize;
    margin-left: 5.5rem;
    background: #0091DF;
    letter-spacing: 0.32px;
    color: #FFFFFF;
    opacity: 1;
    border: none;
    padding: 0.6rem;
    border-radius: 30px;
    align-items: center;
    cursor: pointer;
    }
    .input-feedback {
        color: red;
        margin-left: 1rem;
        font-size: 1rem;
    }
}
`



export default Modal;
