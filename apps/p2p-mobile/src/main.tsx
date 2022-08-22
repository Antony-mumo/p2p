import { AppRegistry } from 'react-native';
import App from './app/App';
import { AuthProvider } from '../../../libs/services/auth/AuthContext'
import { AxiosProvider } from '../../../libs/services/auth/AxiosContext'
import React from 'react'

const Root = () => {
    return (
        <AuthProvider>
            <AxiosProvider>
                <App />
            </AxiosProvider>
        </AuthProvider>
    )
}

AppRegistry.registerComponent('P2pMobile', () => Root);
