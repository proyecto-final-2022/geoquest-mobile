import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, useWindowDimensions, Image, Pressable, FlatList, Alert} from 'react-native';
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
import geoQuestLogo_edge from '../../../assets/GeoQuestLogo.png'

import {avatarChange} from '../../utils/apicalls/ApiCalls'

const ProfileScreen = () => {
    const {height} = useWindowDimensions();

    const [userId, setUserId] = useState(1);
    useEffect(() => {
        Storage.getObject('user').
        then(user => setUserId(user.id))
    }, []);
    const [image, setImage] = useState(1);
    useEffect(() => {
        Storage.getObject('user').
        then(user => setImage(user.image))
    }, []);
    const [name, setName] = useState("");
    useEffect(() => {
        Storage.getObject('user').
        then(user => setName(user.name))
    }, []);
    const [username, setUsername] = useState("");
    useEffect(() => {
        Storage.getObject('user').
        then(user => setUsername(user.username))
    }, []);
    const [email, setEmail] = useState("");
    useEffect(() => {
        Storage.getObject('user').
        then(user => setEmail(user.email))
    }, []);
    const [manual, setManual] = useState(false);
    useEffect(() => {
        Storage.getObject('user').
        then(user => setManual(user.manual))
    }, []);
    
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    const getUserImage = (imageNumber) => { 
        return userImages[imageNumber-1];
    }

    const [profileModal, setProfileModal] = useState(true);
    const [avatarModal, setAvatarModal] = useState(true);
    const [imageSelectorModal, setImageSelectorModal] = useState(false);
    const [nameSelectorModal, setNameSelectorModal] = useState(false);
    const [passwordSelectorModal, setPasswordSelectorModal] = useState(false);
      
    const {control, handleSubmit, watch} = useForm();
    
    const pass = watch('password');

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
                                avatarChange(userId,item.index +1);
                                Storage.setObjectField('user', 'image', item.index +1);
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
                <View style={styles.buttons}>
                    <CustomButton 
                        style={styles.button}
                        text='Cancelar'
                        bgColor='#848884'
                        onPress={() => {
                            setAvatarModal(true);
                            setProfileModal(true);
                            setImageSelectorModal(false);
                        }}
                    />
                </View>
            </View>}
            {profileModal && <View style={styles.userInfoSection}>
                <Pressable onPress={() => {
                            setAvatarModal(false);
                            setProfileModal(false);
                            setNameSelectorModal(true);
                        }}>
                    <View style={styles.row}>
                        <Icon name="user" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>{name}</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                    <View style={styles.row}>
                        <Icon name="user" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>{username}</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                </Pressable>
                <Pressable onPress={() => {
                            if(manual){
                                setAvatarModal(false);
                                setProfileModal(false);
                                setNameSelectorModal(true);
                            }else{
                                Alert.alert('No disponible');
                            }
                        }}>
                    <View style={styles.row}>
                        <Icon name="mail" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>{email}</Text>
                        <Icon style={styles.edit_logo} name={manual? 'edit' : 'lock'}/>
                    </View>
                </Pressable>
                <Pressable style={{marginTop: 20}} onPress={() => {
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
                <View style={styles.container}>
                    <Image
                        source = {geoQuestLogo_edge}
                        style={[styles.logo, {height: height * 0.3}]}
                        resizeMode="contain"
                        />
                </View>
            </View>}
            {nameSelectorModal && <View style={styles.containerInput}>
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
                        text='Guardar'
                        onPress={handleSubmit(onSaveDataPressed)}
                    />
                    <CustomButton 
                        style={styles.button}
                        text='Cancelar'
                        bgColor='#848884'
                        onPress={() => {
                            setAvatarModal(true);
                            setProfileModal(true);
                            setNameSelectorModal(false);
                        }}
                    />
                </View>
            </View>}
            {passwordSelectorModal && <View style={styles.containerInput}>
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
                        text='Guardar'
                        onPress={handleSubmit(onSaveDataPressed)}
                    />
                    <CustomButton 
                        style={styles.button}
                        text='Cancelar'
                        bgColor='#848884'
                        onPress={() => {
                            setAvatarModal(true);
                            setProfileModal(true);
                            setPasswordSelectorModal(false);
                        }}
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
    containerInput: {
        flexDirection:'column',
        marginTop: 70,
        alignItems: 'center'
    },
    helpText: {
        alignItems: 'flex-start'
    },
    buttons: {
        marginTop: 30,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'column',
        width: '80%'
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
    logo: {
        marginTop: 25,
        width: '50%',
        justifyContent:'center',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default ProfileScreen