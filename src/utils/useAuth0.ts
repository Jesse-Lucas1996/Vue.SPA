import createAuth0Client, { Auth0Client } from '@auth0/auth0-spa-js';
import { reactive } from 'vue';

export const AuthState = reactive({
    user: null,
    loading: false,
    isAuthenticated: false,
    auth0: null,
});


export const useAuth0 = (state: { isAuthenticated: boolean; auth0: Auth0Client; user: any; loading: boolean; }) => {
    const handleStateChange = async () => {
        state.isAuthenticated = !!(await state.auth0.isAuthenticated());
        state.user = await state.auth0.getUser();
        state.loading = false;
    }

    const initAuth = () => {
        state.loading = true;
        createAuth0Client({
            domain: "dev-bujpp543.us.auth0.com",
            client_id: "EMgZQHt1W7qFYSl82sEMpm3WaDEI0WGj",
            cacheLocation: 'localstorage',
            redirect_uri: window.location.origin
        }).then(async auth => {
            state.auth0 = auth;
            await handleStateChange();
        });        
    }

    const login = async () => {
        await state.auth0.loginWithPopup();
        await handleStateChange();
    };

    const logout = async () => {
        state.auth0.logout({
            returnTo: window.location.origin,
        });
    }

    return {
        login,
        logout,
        initAuth,
    }

}