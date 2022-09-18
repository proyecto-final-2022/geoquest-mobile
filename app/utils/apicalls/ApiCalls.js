import { storeData } from '../storage/storage'
import Storage from '../storage/storage'
import Config from '../../../config.json'
export const loginManual = async (email, password) => {

  try {
    await fetch(
      Config.appUrl+'users/sessions/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'},
    body: JSON.stringify({ 
      email: email,  
      password: password})
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status) ;
      else response.json().then(async (data) => {
        await storeData(data)
      }).catch((error) => {
      console.log('error: ' + error);
      this.setState({ requestFailed: true });
      });})
    }
    catch (error) {
        console.error(error);
    }
}

export const postExample = async (email, username, password) => {
  try {
    await fetch(
      Config.appUrl+'users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ 
        email: email, 
        username: username, 
        password: password})
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status);
        else response.json().then(data => {
        storeData(data)
        }).catch((error) => {
        console.log('error: ' + error);
        this.setState({ requestFailed: true });
        });})
    }
  catch (error) {
    console.error(error);
  }
}

export const postLoginGoogle = async (email, username, token) => {

  try {
    await fetch(
      Config.appUrl+'users/sessions/google', {
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
                Storage.setObject('user', data)
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
