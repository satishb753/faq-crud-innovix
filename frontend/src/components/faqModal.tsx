import React, { useState } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addFaq} from '../flux/actions/faqActions';
import { IFaqReduxProps, IFaqModal, ITarget } from '../types/interfaces';

const FaqModal = ({ isAuthenticated, addFaq }: IFaqModal) => {
    const [modal, setModal] = useState(false);
    const [name, setName] = useState('');

    const handleToggle = () => setModal(!modal);

    const handleChangeName = (e: ITarget) => setName(e.target.value);

    const handleOnSubmit = (e: any) => {
        e.preventDefault();

        const newFaq = {
            name
        };

        // Add Faq via addFaq action
        addFaq(newFaq);
        // Close modal
        handleToggle();
    };

    return (
        <div>
            {isAuthenticated ? (
                <Button
                    color="dark"
                    style={{marginBottom: '2rem'}}
                    onClick={handleToggle}
                >
                    Add Faq
                </Button>
            ) : (
                <h4 className='mb-3 ml-4'>Please login to manage Faqs</h4>
            )}

            <Modal isOpen={modal} toggle={handleToggle}>
                <ModalHeader toggle={handleToggle}>Add to FAQ List</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleOnSubmit}>
                        <FormGroup>
                            <Label for="faq">Faq</Label>
                            <Input
                                type='text'
                                name='name'
                                id='faq'
                                placeholder='Add Faq'
                                onChange={handleChangeName}
                            />
                        </FormGroup>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const mapStateToProps = (state: IFaqReduxProps) => ({
    faq: state.faq,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { addFaq })(FaqModal);