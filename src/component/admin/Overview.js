import React from 'react';
import AdminLayout from './AdminLayout';
import styled from 'styled-components';

const  Overview = ({history}) =>{
    return (
        <AdminLayout history={history}>
            <OverviewWrapper>
                <div className="container py-5">
                    <div className="welcome p-3 ">
                        <h5>welcome admin_name</h5>
                        <p>what would you like to do today ?</p>
                    </div>
                    <div className="cards py-5">
                        <div className="card1">
                            <h4>10</h4>
                            <p>new transcript <br/> orders</p>
                        </div>
                        <div className="card2">
                            <h4>100</h4>
                            <p>new education <br/> checks</p>
                        </div>
                        <div className="card3">
                            <h4>25</h4>
                            <p>new identity <br/> verifications</p>
                        </div>
                        <div className="card4">
                            <h4>15</h4>
                            <p>new credit checks</p>
                        </div>
                    </div>
                    <div className="d-block d-lg-flex justify-content-between">
                        <div className="recent-pending d-flex justify-content-between">
                            <h6>recent pending</h6>
                            <p>total <span>10</span></p>
                        </div>
                        <div className="recent-completed d-flex justify-content-between">
                            <h6>recent completed</h6>
                            <p>total <span>125</span></p>
                        </div>
                    </div>
               </div>
            </OverviewWrapper>
            
        </AdminLayout>
    )
};

const OverviewWrapper = styled.div`
background: var(--mainWhite);
width: 100%;
overflow-y: scroll;
height: 100%;
font-family: "Roboto";
.container {
    padding: 3rem 3rem;
    display: block;
}
.welcome {
    width: 100%;
    background: white;
    h5 {
        color: var(--lightBlue);
        text-transform: capitalize;
    }
    p {
    color: var(--lightDark);
    }
}
.cards {
    display: flex;
    /* padding: 0 2rem 0 0; */
    @media (max-width: 400px) {
        display: block;
        padding: 2rem 0;
    }
    @media (max-width: 500px) {
        display: block;
        padding: 2rem 0;
    }
}
.card1 {
    background: var(--lightBlue);
    padding: 2rem 0.5rem 0.5rem 1rem;
    width: 18rem;
    height: 9rem;
    color: white;
    margin-right: 2rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(to right,var(--lightBlue), var(--mainBlue));
    transition: all 1s linear;
    @media (max-width: 500px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2rem;
    }
    p {
        text-transform: capitalize;
        font-weight: lighter;
    }
}
/* .card1:hover {
    transform: scale(1.2);
} */
.card2 {
    background: var(--lightBlue);
    padding: 2rem 0.5rem 0.5rem 1rem;
    width: 18rem;
    height: 9rem;
    color: white;
    margin-right: 2rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(to right,var(--lightBlue), var(--mainBlue));
    @media (max-width: 500px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2rem;
    }
    p {
        text-transform: capitalize;
        font-weight: lighter;
    }
}
.card3 {
    background: var(--lightBlue);
    padding: 2rem 0.5rem 0.5rem 1rem;
    width: 18rem;
    height: 9rem;
    color: white;
    margin-right: 2rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(to left,var(--lightBlue), var(--mainBlue));
    @media (max-width: 500px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2rem;
    }
    p {
        text-transform: capitalize;
        font-weight: lighter;
    }
}
.card4 {
    background: var(--lightBlue);
    padding: 2rem 0.5rem 0.5rem 1rem;
    width: 18rem;
    height: 9rem;
    color: white;
    margin-left: 2rem;
    border-radius: 0.2rem;
    background-image: linear-gradient(var(--lightBlue), var(--mainBlue));
    @media (max-width: 500px) {
        width: 100%;
        margin-left: 0;
        margin-top: 2rem;
    }
    p {
        text-transform: capitalize;
        font-weight: lighter;
    }
}
.recent-pending {
    width: 50%;
    text-transform: capitalize;
    margin-right: 2rem;

    @media (max-width: 400px) {
        width: 100%
    }
    @media (max-width: 500px) {
        width: 100%
    }
}
.recent-completed {
    width: 50%;
    text-transform: capitalize;
    margin-right: 2rem;

    @media (max-width: 400px) {
        width: 100%
    }
    @media (max-width: 500px) {
        width: 100%
    }
}
.card {
    background: blue;
}
`

export default Overview;


