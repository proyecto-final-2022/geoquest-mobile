import { storeData } from '../storage/storage'
import Storage from '../storage/storage'
import Config from '../../../config.json'

export const getUser = async (id) => {
  await fetch(
    Config.appUrl+'users/'+id, {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status +': '+response.statusText);
      else response.json().then(async (data) => {
        Storage.setObject('user', data)
      }).catch((error) => {
        console.error('error: ' + error);
        this.setState({ requestFailed: true });
        throw new Error(error);
      });
    }
  )
}

export const loginManual = async (email, password) => {
  await fetch(
    Config.appUrl+'users/sessions/', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
      email: email,  
      password: password})
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status +': '+response.statusText);
      else response.json().then(async (data) => {
        Storage.setObject('user', data)
      }).catch((error) => {
        console.error('error: ' + error);
        this.setState({ requestFailed: true });
        throw new Error(error);
      });
    }
  )
}

export const signUpManual = async (email, name, username, password, firebaseToken) => {
  try {
    await fetch(
      Config.appUrl+'users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ 
          email: email,
          name: name,
          username: username, 
          password: password,
          firebaseToken: firebaseToken
        })
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status +': '+response.statusText);
        else response.json().then(data => {
          Storage.setObject('user', data)
        }).catch((error) => {
          console.error('error: ' + error);
          this.setState({ requestFailed: true });
          throw new Error(error);
        });
      })
  }
  catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export const postLoginGoogle = async (email, name, username, token, firebaseToken) => {
  try {
    await fetch(
      Config.appUrl+'users/sessions/google', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ 
          email: email, 
          name: name,
          username: username,
          firebaseToken: firebaseToken
        })
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status +': '+response.statusText);
        else response.json().then(data => {
          Storage.setObject('user', data)
        })
        .catch((error) => {
          console.error('error: ' + error);
          // this.setState({ requestFailed: true });
          throw new Error(error);
        });
      }
    )
  }
  catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export const postLoginFacebook = async (email, name, username, token, firebaseToken) => {
  try {
    await fetch(
      Config.appUrl+'users/sessions/facebook', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify({ 
          email: email, 
          name: name,
          username: username,
          firebaseToken: firebaseToken
        })
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status +': '+response.statusText);
        else response.json().then(data => {
          Storage.setObject('user', data)
        })
        .catch((error) => {
          console.error('error: ' + error);
          throw new Error(error);
          // this.setState({ requestFailed: true });
        });
      }
    )
  }
  catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export const avatarChange = async (userId, image) => {
  try {
    await fetch(
      Config.appUrl+'users/'+userId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ image: image })
      })
      .then(response => {
        if(!response.ok) throw new Error(response.status +': '+response.statusText);
        else response.json().catch((error) => {
          console.error('error: ' + error);
          this.setState({ requestFailed: true });
        });
      })
  }
  catch (error) {
    console.error(error);
  }
}

export const submitUserChanges = async (userId, changesJson) => {
  try {
    await fetch(
      Config.appUrl+'users/'+userId, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(changesJson)
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status +': '+response.statusText);
      else response.json().catch((error) => {
        console.error('error: ' + error);
        this.setState({ requestFailed: true });
      });
    })
  }
  catch (error) {
    console.error(error);
  }
}

export const passwordUpdate = async (userId, oldPassword, newPassword) => {
  try {
    await fetch(
      Config.appUrl+'users/'+userId+'/updateUserPassword', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          oldPassword: oldPassword,
          newPassword: newPassword
        })
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status +': '+response.statusText);
      else response.json().catch((error) => {
        console.error('error: ' + error);
        this.setState({ requestFailed: true });
      });
    })
  }
  catch (error) {
    console.error(error);
  }
}

export const updateQuestRating = async (userId, questId, rating) => {
  try {
    await fetch(
      Config.appUrl+'quests/'+questId+'/rating/'+userId, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          rating: rating
        })
    })
    .then(response => {
      if(!response.ok) throw new Error(response.status +': '+response.statusText);
      else response.json().catch((error) => {
        console.error('error: ' + error);
        this.setState({ requestFailed: true });
      });
    })
    .catch(error => {
      console.error(error);
    })
  }
  catch (error) {
    console.error(error);
  }
}