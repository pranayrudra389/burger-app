import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        customComponentMethod = () => {
            axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                console.log('withErrorHandler error: ', error);
                this.setState({ error });
            });
        }

        errorConfirmedHandler = () => this.setState({error: null});

        render() {
            this.customComponentMethod();
            return(
                <Aux>
                    <Modal 
                        show={this.state.error}
                        closeModal={this.errorConfirmedHandler}
                    >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
};

export default withErrorHandler;