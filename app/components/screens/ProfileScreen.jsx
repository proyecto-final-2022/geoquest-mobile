import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions, Image, Pressable, FlatList, BackHandler} from 'react-native';
import Storage from '../../utils/storage/storage';
import { Avatar, Text } from 'react-native-paper';
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

import { useFocusEffect } from '@react-navigation/native';

import {avatarChange, submitUserChanges, passwordUpdate} from '../../utils/apicalls/ApiCalls';
import {areYouSureAlert} from '../../utils/storage/storage';

const ProfileScreen = ({navigation}) => {
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                areYouSureAlert({navigation});
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
        }, []),
    );

    const {height} = useWindowDimensions();

    const [userId, setUserId] = useState(1);
    const [image, setImage] = useState(1);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [manual, setManual] = useState(false);
    useEffect(() => {
        Storage.getObject('user').
        then(user => {
            refreshValues(user);
        })
    }, []);

    function refreshValues(user){
        setManual(user.manual);
        setUserId(user.id);
        setImage(user.image);
        setName(user.name);
        setEmail(user.email);
        setUsername(user.username);
    }

    useFocusEffect(
        React.useCallback(() => {
            Storage.getObject('user').
            then(user => {
                refreshValues(user);
            })
          return () => {};
        }, [])
    );
    
    const userImages = [userImage_1, userImage_2, userImage_3, userImage_4, userImage_5, userImage_6, userImage_7, userImage_8, userImage_9];
    const getUserImage = (imageNumber) => { 
        return userImages[imageNumber-1];
    }

    const [profileModal, setProfileModal] = useState(true);
    const [avatarModal, setAvatarModal] = useState(true);
    const [imageSelectorModal, setImageSelectorModal] = useState(false);
    const [detailsSelectorModal, setDetailsSelectorModal] = useState(false);
    const [passwordSelectorModal, setPasswordSelectorModal] = useState(false);
      
    const {control, handleSubmit, watch} = useForm();
    
    const pass = watch('password');

    const onSaveDataPressed = (data) => {
        try{
            submitUserChanges(userId,
                {
                    name: data.name,
                    username: data.username,
                    email: {manual}? data.email : {email},
                }
            ).then(response => {
                setAvatarModal(true);
                setProfileModal(true);
                setDetailsSelectorModal(false);

                Storage.setObjectField('user', 'name', data.name);
                setName(data.name);
                Storage.setObjectField('user', 'username', data.username);
                setUsername(data.username);
                if({manual}){
                    Storage.setObjectField('user', 'email', data.email);
                    setEmail(data.email);
                }
            })
            .catch(error => {
                console.error(error);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    const onNewPasswordDataPressed = (data) => {
        try{
            passwordUpdate(userId, data.oldPassword, data.password)
            .then(response => {
                setAvatarModal(true);
                setProfileModal(true);
                setPasswordSelectorModal(false);
            })
            .catch(error => {
                console.error(error);
            })
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            {/* <Text style={{marginLeft: 5}}>
                manual: {manual.toString()}{"\n"}
                id: {userId}{"\n"}
                image: {image}{"\n"}
                name: {name}{"\n"}
                email: {email}{"\n"}
                username: {username}{"\n"}
            </Text> */}
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
                    keyExtractor={(item, index) => String(index)}
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
                            setDetailsSelectorModal(true);
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
                {manual && <Pressable onPress={() => {
                            setAvatarModal(false);
                            setProfileModal(false);
                            setDetailsSelectorModal(true);
                        }}>
                    <View style={styles.row}>
                        <Icon name="mail" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>{email}</Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                </Pressable>}
                {manual && <Pressable style={{marginTop: 20}} onPress={() => {
                            setAvatarModal(false);
                            setProfileModal(false);
                            setPasswordSelectorModal(true);
                        }}>
                    <View style={styles.row}>
                        <Icon name="lock" size={20}/>
                        <Text style={{marginLeft: 20, fontSize: 15}}>Cambiar contraseña </Text>
                        <Icon style={styles.edit_logo} name={'edit'}/>
                    </View>
                </Pressable>}
                <View style={styles.container}>
                    <Image
                        source = {geoQuestLogo_edge}
                        style={[styles.logo, {height: height * 0.3}]}
                        resizeMode="contain"
                        />
                </View>
            </View>}
            {detailsSelectorModal && <View style={styles.containerInput}>
                <CustomInput 
                    name = "name"
                    placeholder="Nombre"
                    defaultValue={name}
                    control = {control}
                    rules = {{
                      required: 'El Nombre es requerido'
                    }}   
                    icon = "user"
                />
                <CustomInput 
                    name = "username"
                    placeholder="Usuario"
                    defaultValue={username}
                    control = {control}
                    rules = {{
                      required: 'El usuario es requerido'
                    }}   
                    icon = "user"
                />
                {manual && <CustomInput 
                    name = "email"
                    placeholder="Email"
                    icon = "mail"
                    defaultValue={email}
                    control = {control}
                    rules = {{
                        pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: 'Email invalido'
                        },
                        required: 'El email es requerido'
                    }}    
                />}
                
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
                            setDetailsSelectorModal(false);
                        }}
                    />
                </View>
            </View>}
            {passwordSelectorModal && <View style={styles.containerInput}>
                <CustomInput
                    name = "oldPassword" 
                    placeholder="Contraseña vieja" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        required: 'La Contraseña es requerida',
                        minLength: {
                                value: 8,
                                message: 'Mínimo 8 caracteres',
                            },
                            maxLength: {
                                value: 32,
                                message: 'Máximo 32 caracteres',
                            }
                    }} 
                    secureTextEntry
                />
                <CustomInput
                    name = "password" 
                    placeholder="Nueva contraseña" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        required: 'La Contraseña es requerida',
                        minLength: {
                                value: 8,
                                message: 'Mínimo 8 caracteres',
                            },
                            maxLength: {
                                value: 32,
                                message: 'Máximo 32 caracteres',
                            }
                    }} 
                    secureTextEntry
                />
                <CustomInput 
                    name = "password-repeat"
                    placeholder="Repita la contraseña" 
                    icon = "lock"
                    control = {control}
                    rules = {{
                        validate: value => value == pass || 'Las contraseñas no coinciden',
                    }}
                    secureTextEntry
                />
                
                <View style={styles.buttons}>
                    <CustomButton 
                        style={styles.button}
                        text='Guardar'
                        onPress={handleSubmit(onNewPasswordDataPressed)}
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