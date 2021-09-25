////////////////////////////////////////////////////////////////// IMPORTS ////////////////////////////////////////////////// 

import React, { Component } from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';



class App extends Component {
    state = {
        products : [],
    }

    componentDidMount() {
        fetch("http://localhost:4000/api/get-products", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.error){
                alert(data.message)
            }else{
                    this.setState({
                        products: data.data
                    })
            }
        })
    }

    render() {

        return ( 
            <>
           
            {this.state.products.length === 0? 
            
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
            :
            
            
            <Switch > {
                routes.map(({ path, exact, component: C, ...rest }) => ( 
                    
                    <Route 
                        key = { path }
                        path = { path }
                        exact = { exact }
                        render = {
                            (props) => ( 
                                <C  
                                products = {this.state.products}
                                /> 
                            )
                        }
                    />
                ))
            } 
            </Switch> 
            
            }
            </>
        );
    }
}

export default App;
