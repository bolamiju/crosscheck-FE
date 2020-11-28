import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';


const Modal = ({ open, onClose }) => {
    if (!open) return null;

    return (
        <div
            onClick={onClose}
            style={OVERLAY_STYLES}>
            <ModalWrapper>
                <Formik
                    initialValues={{ email: "" }}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log("submitting")
                    }}
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
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="">name</label>
                                        <input
                                            name="name"
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="">email</label>
                                        <input
                                            name="email"
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    </div>
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
background-color: var(--mainYellow);
padding: 50px;
z-index: 1000;
border-radius: 1rem;
border: var(--mainGreen);
&:hover {
    border: var(--mainYellow);
    box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2);
}
.close-btn{
    position: fixed;
    top: 0;
    right: 0;
    background: transparent;
    font-size: 2rem;
    color: var(--mainRed);
    border: none;
    outline: none;
}
.ingredient-list {
    list-style: none;
    text-transform: capitalize;
    color: var(--mainWhite);
}
`



export default Modal;
