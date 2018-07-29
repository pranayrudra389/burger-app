import React, { Component } from 'react';
import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    };

    componentDidMount = () => {
        axios.get('/orders.json')
            .then(response => {
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key
                    });
                }
                this.setState({
                    loading: false,
                    orders: fetchedOrders
                });
            })
            .catch(err => {
                this.setState({
                    loading: false
                });
                console.error('Error occurred while fetching the orders: ', err)
            });
    };

    render () {
        if (this.state.loading) {
            return <Spinner />
        }
        return (
            <div>
               {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={order.totalPrice}
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler(Orders, axios);