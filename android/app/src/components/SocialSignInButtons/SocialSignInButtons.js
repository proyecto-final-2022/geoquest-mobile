import React from 'react';
import CustomButton from '../CustomButton'

const SocialSignInButtons = () => {
    const onSignInGoogle = () => {
        console.warn('google');
    }
    
    const onSignInFacebook = () => {
        console.warn('facebook');
    }
    return(
        <>
        <CustomButton 
            text ="Sign in with Facebook"
            onPress = {onSignInFacebook}
            icon = "facebook"
            bgColor='#E7EAF4'
            fgColor='#4765A9'
        />
        <CustomButton 
            text ="Sign in with Google"
            onPress = {onSignInGoogle}
            icon = "google"
            bgColor='#FAE9EA'
            fgColor='#DD4DD4'
        />
        </>
    )
}

export default SocialSignInButtons
