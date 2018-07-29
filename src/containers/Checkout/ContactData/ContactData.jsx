import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zip: ''
        },
        loading: false
    }

    onOrderClicked = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const { ingredients, totalPrice } = this.props;
        const order = {
            ingredients,
            totalPrice,
            customer: {
                name: 'Pranay',
                address: {
                    street: 'Test street',
                    zipCode: '12345',
                    country: 'India'
                },
                email: 'pranay@test.com'
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false });
                console.error('error: ', err);
            });
    };

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                <input className={classes.Input} type="text" name="email" placeholder="Email" />
                <input className={classes.Input} type="text" name="street" placeholder="Street" />
                <input className={classes.Input} type="text" name="zip" placeholder="Postal Code" />
                <Button btnType="Success" onClick={this.onOrderClicked}>ORDER</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return(
            <div className={classes.ContactData}>
                <h4>Enter you Contact Data</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;