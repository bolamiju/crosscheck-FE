import React from 'react';
import styled from 'styled-components';

const NotFound = (props) => {
    return (
        <PageWrapper>
            <h1 className="display"> <span className="text-danger">404!</span> Page Not Found</h1>
            <h3>the requested URL <span className="text-danger">{props.location.pathname}</span> was not found</h3>
        </PageWrapper>
    )
};

const PageWrapper = styled.div`
background: var(--mainWhite);
height: 100vh;    
font-size: 1.5rem;
align-items: center;
text-align: center;
font-family: MontserratRegular;
font-weight: normal;
letter-spacing: 0.32px;
opacity: 1;
overflow: hidden;
.display {
    color: #707070;
    .text-danger {
        color: red;
    }
}
h3 {
    text-transform: capitalize;
    color: var(--mainBlue);
    .text-danger {
        color: red;
    }
}
`

export default NotFound;
