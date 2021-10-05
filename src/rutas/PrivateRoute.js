import React from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom';


export const PrivateRoute = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} component={
            props => (localStorage.getItem('userToken') !== null ? <Component {...props} /> : <Redirect to="/" />)
        } />
    )
}
