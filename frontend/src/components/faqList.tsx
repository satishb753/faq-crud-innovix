import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getFaqs, deleteFaq } from "../flux/actions/faqActions";
import { IFaqReduxProps, IFaqList } from "../types/interfaces";

const FaqList = ({
    getFaqs,
    faq,
    isAuthenticated,
    deleteFaq
}: IFaqList) => {
    useEffect(()=> {
        getFaqs();
    }, [getFaqs]);

    const handleDelete = (id: string) => {
        deleteFaq(id);
    };

    const { faqs } = faq;
    return (
        <Container>
            <ListGroup>
                <TransitionGroup className="faq-list">
                    {faqs.map(({_id, name}) => (
                        <CSSTransition key={_id} timeout={500} className="fade">
                            <ListGroupItem>
                                {isAuthenticated ? (
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => handleDelete(_id)}
                                    >
                                        &Times;
                                    </Button>
                                ) : null}
                                {name}
                            </ListGroupItem>
                        </CSSTransition>
                    ))}
                </TransitionGroup>
            </ListGroup>
        </Container>
    );
};

const mapStateToProps = (state: IFaqReduxProps) => ({
    faq: state.faq,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getFaqs, deleteFaq })(FaqList);