import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Image, Pressable, FlatList} from 'react-native';
import Storage from '../../utils/storage/storage';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch,
    Modal,
    Button
} from 'react-native-paper';
import CustomInput from '../commons/CustomInput'
import CustomButton from '../commons/CustomButton'
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native'
import {useForm} from 'react-hook-form'

import userImage_1 from '../../../assets/userImages/userImage_1.png'
import userImage_2 from '../../../assets/userImages/userImage_2.png'
import userImage_3 from '../../../assets/userImages/userImage_3.png'
import userImage_4 from '../../../assets/userImages/userImage_4.png'
import userImage_5 from '../../../assets/userImages/userImage_5.png'
import userImage_6 from '../../../assets/userImages/userImage_6.png'
import userImage_7 from '../../../assets/userImages/userImage_7.png'
import userImage_8 from '../../../assets/userImages/userImage_8.png'
import userImage_9 from '../../../assets/userImages/userImage_9.png'

const ProfileScreen = () => {
    const [image, setImage] = useState(1);
    useEffect(() => {
        Storage.getObject('user').
        then(user => setImage(user.image))
    }, []);
    
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    const getUserImage = (imageNumber) => { 
        return userImages[imageNumber-1];
    }
    const userImageOptions = userImages.map((item, index) => {
        return (
            <Pressable
                key={index}
                onPress={() => setImageSelectorModal(false)}>
                <Avatar.Image 
                    source={item}
                    size={25}
                />
            </Pressable>
        )
    })
    const [profileModal, setProfileModal] = useState(true);
    const [avatarModal, setAvatarModal] = useState(true);
    const [imageSelectorModal, setImageSelectorModal] = useState(false);
    const [nameSelectorModal, setNameSelectorModal] = useState(false);
    const [passwordSelectorModal, setPasswordSelectorModal] = useState(false);
      
    const {control, handleSubmit, watch} = useForm();
    
    const pass = watch('password');

    const navigation = useNavigation();

    const onSaveDataPressed = async (data) => {
        try{
            console.log('saved?')
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            {avatarModal && <View style={styles.avatar}>
                <Pressable onPress={() => {
                        setProfileModal(false);
                        setImageSelectorModal(true);
                    }}>
                    <Avatar.Image 
                        source={getUserImage(image)}
                        size={150}
                    />
                    {!imageSelectorModal && <Icon style={styles.edit_logo} name={'edit'}/>}
                </Pressable>
            </View>}
            {imageSelectorModal && <View style={styles.container}>
                <FlatList 
                    data={userImages}
                    keyExtractor={item => item.index}
                    numColumns={3}
                    renderItem={(item) =>
                        <Pressable
                            onPress={() => {
                                setProfileModal(true);
                                setImageSelectorModal(false);
                                setImage(item.index +1);
                            }}>
                            <Avatar.Image 
                                style={{margin: 5}}
                                source={userImages[item.index]}
                                size={90}
                            />
                        </Pressable>
                    }>
                </FlatList>
            </View>}
            {profileModal && <View style={styles.userInfoSection}>
                <Pressable onPress={() => {
                            setAvatarModal(false);
                            setProfileModal(false);
                            setNameSelectorModal(true);
                        }}>
                    <View style={styles.row}>
                        <Icon name="user" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>my name</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                    <View style={styles.row}>
                        <Icon name="user" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>username</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                    <View style={styles.row}>
                        <Icon name="mail" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>john_doe@email.com</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                            setAvatarModal(false);
                            setProfileModal(false);
                            setPasswordSelectorModal(true);
                        }}>
                    <View style={styles.row}>
                        <Icon name="lock" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>Cambiar contraseña </Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                </Pressable>
            </View>}
            {nameSelectorModal && <View style={styles.container}>
                <CustomInput 
                    name = "name"
                    placeholder="Name" 
                    control = {control}
                    rules = {{required: 'Name is required'}}    
                    icon = "user"
                />
                <CustomInput 
                    name = "username"
                    placeholder="Username" 
                    control = {control}
                    rules = {{required: 'Username is required'}}    
                    icon = "user"
                />
                <CustomInput 
                    name = "email"
                    placeholder="Email" 
                    icon = "mail"
                    control = {control}
                    rules = {{
                        required: 'Email is required'
                    }}    
                />
                
                <View style={styles.buttons}>
                    <CustomButton 
                        style={styles.button}
                        text='Cancelar'
                        onPress={() => {
                            setAvatarModal(true);
                            setProfileModal(true);
                            setNameSelectorModal(false);
                        }}
                    />
                    <CustomButton 
                        style={styles.button}
                        text='Guardar'
                        onPress={handleSubmit(onSaveDataPressed)}
                    />
                </View>
            </View>}
            {passwordSelectorModal && <View style={styles.container}>
                <CustomInput
                    name = "oldPassword" 
                    placeholder="Old Password" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Minimum 8 characters',
                            },
                            maxLength: {
                            value: 32,
                            message: 'Maximum 32 characters',
                            }
                        }}   
                        secureTextEntry
                />
                <CustomInput
                    name = "password" 
                    placeholder="New Password" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        required: 'Password is required',
                        minLength: {
                            value: 8,
                            message: 'Minimum 8 characters',
                            },
                            maxLength: {
                            value: 32,
                            message: 'Maximum 32 characters',
                            }
                        }}   
                        secureTextEntry
                />
                <CustomInput 
                    name = "password-repeat"
                    placeholder="Repeat Password" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        validate: value => value == pass || 'Password do not match',
                    }}
                    secureTextEntry
                />
                
                <View style={styles.buttons}>
                    <CustomButton 
                        style={styles.button}
                        text='Cancelar'
                        onPress={() => {
                            setAvatarModal(true);
                            setProfileModal(true);
                            setPasswordSelectorModal(false);
                        }}
                    />
                    <CustomButton 
                        style={styles.button}
                        text='Guardar'
                        onPress={handleSubmit(onSaveDataPressed)}
                    />
                </View>
            </View>}
        </View>
    );
}

var styles = StyleSheet.create({
    avatar: {
        flexDirection:'row',
        marginTop: 15,
        justifyContent:'center'},
    edit_logo: {
        alignSelf: 'flex-end'
    },
    container: {
        flexDirection:'column',
        marginTop: 15,
        alignItems: 'center'
    },
    buttons: {
        flexDirection:'row',
        justifyContent:'center',
        width: '40%'
    },
    button: {
        margin: 5
    },
    row: {
        flexDirection: 'row',
        marginBottom: 20,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    userInfoSection: {
        paddingHorizontal: 30,
        marginVertical: 25,
    },
});

export default ProfileScreen