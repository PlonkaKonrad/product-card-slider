////////////////////////////////////////////////////////////////// IMPORTS ////////////////////////////////////////////////// 

import React, { Component } from 'react';
import routes from './routes';
import { Route, Switch } from 'react-router-dom';



class App extends Component {
    state = {
        
    }

    render() {
        
    
        return ( 
            <>
           

            { /* ROUTING */ }
            
            <Switch > {
                routes.map(({ path, exact, component: C, ...rest }) => ( 
                    
                    <Route 
                        key = { path }
                        path = { path }
                        exact = { exact }
                        render = {
                            (props) => ( 
                                <C 
                                    
                                    /> 
                            )
                        }
                    />
                ))
            } 
            </Switch> { /* ROUTING */ }
     
            </>
        );
    }
}

export default App;
