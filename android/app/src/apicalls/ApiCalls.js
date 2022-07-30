import { StoreData } from '../storage/storage'

export const LoginManual = async (email, password) => {

    try {
        await fetch(
            'http://192.168.0.193:8080/users/sessions/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    email: email,  
                    password: password})
            })
            .then(response => {
                if(!response.ok) throw new Error(response.status) ;
                else response.json().then(data => {
                        StoreData(data)
                    }).catch((error) => {
                        console.log('error: ' + error);
                        this.setState({ requestFailed: true });
                      });
            })
    }
    catch (error) {
        console.error(error);
    }
}

export const PostExample = async (email, username, password) => {
    try {
        await fetch(
            'http://192.168.0.193:8080/users/', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json'},
                body: JSON.stringify({ 
                    email: email, 
                    username: username, 
                    password: password})
            })
            .then(response => {
                if(!response.ok) throw new Error(response.status);
                else response.json().then(data => {
                        StoreData(data)
                    }).catch((error) => {
                        console.log('error: ' + error);
                        this.setState({ requestFailed: true });
                      });
            })
    }
    catch (error) {
        console.error(error);
    }
}

export const PostLoginGoogle = async (email, username, token) => {

    try {
        await fetch(
            'http://192.168.0.193:8080/users/sessions/google', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': token},
                body: JSON.stringify({ 
                    email: email, 
                    username: username})
            })
            .then(response => {
                if(!response.ok) throw new Error(response.status);
                else response.json().then(data => {
                        StoreData(data)
                    }).catch((error) => {
                        console.log('error: ' + error);
                        this.setState({ requestFailed: true });
                      });
            })
    }
    catch (error) {
        console.error(error);
    }
}
