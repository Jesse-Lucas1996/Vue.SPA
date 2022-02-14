import createAuth0Client, { Auth0Client, GetTokenSilentlyOptions  } from '@auth0/auth0-spa-js';
import { reactive } from 'vue';

export const AuthState = reactive({
    user: true,
    loading: false,
    isAuthenticated: false,
    auth0: null
});

let client: Auth0Client
export const useAuth0 = (state: { isAuthenticated: boolean; auth0: Auth0Client; user: any; loading: boolean;}) => {
    const handleStateChange = async () => {
        AuthState.isAuthenticated = !!(await client.isAuthenticated());
        AuthState.user = !!(client.getUser());
        AuthState.loading = false;
    }

    const initAuth = async () => {
        state.loading = true;
        client = await createAuth0Client({
            domain: "dev-cpt-j07e.au.auth0.com",
            client_id: "zE6pVNbhnSxVfbglGi0Z9DtZD3A3A4Kp",
            scope: 'read:weather',
            audience: 'https://thisisarealapiendpoint.com/',
            cacheLocation: 'localstorage',
            redirect_uri: window.location.origin
        })
        await handleStateChange()
        return client
    }


    const login = async () => {
        await client.loginWithPopup();
        await handleStateChange();
    };

    
    const accessToken = async (o?: GetTokenSilentlyOptions) => {
        if(await client.isAuthenticated()){
        return client.getTokenSilently()
        }
        
    }


    const logout = async () => {
        client.logout({
            returnTo: window.location.origin,
        });
    }

    return {
        login,
        logout,
        initAuth,
        accessToken
    }

}