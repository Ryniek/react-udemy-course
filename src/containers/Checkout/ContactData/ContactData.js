import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Imię'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Ulica'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Kod pocztowy'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementtype: 'input',
                elementconfig: {
                    type: 'text',
                    placeholder: 'Kraj'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementtype: 'input',
                elementconfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementtype: 'select',
                elementconfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Szybka'},
                        {value: 'cheapest', displayValue: 'Tańsza'}
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            },
        },
        formIsValid: false
    }

    orderHandler = (event) => {
        event.preventDefault();

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            customer: {
                name: this.state.orderForm.name.value,
                email: this.state.orderForm.email.value,
                address: {
                    street: this.state.orderForm.street.value,
                    zipCode: this.state.orderForm.zipCode.value,
                    country: this.state.orderForm.country.value
                }
            },
            deliveryMethod: this.state.orderForm.deliveryMethod.value
        }
        this.props.onOrderBurger(order);
    }

    checkValidity(value, rules) {
        let isValid = false;

        if(rules.required) {
            isValid = value.trim() !== '';
        } else {
            isValid = true;
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementtype={formElement.config.elementtype} 
                        elementconfig={formElement.config.elementconfig} 
                        value={formElement.config.value} 
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}/>
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>Zamów</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Wprowadź swoje dane kontaktowe</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(actions.purchaseBurger(orderData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData));