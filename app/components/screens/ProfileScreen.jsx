import React, { useState, useEffect } from 'react';
import { StyleSheet, View, useWindowDimensions, Image, Pressable, FlatList, BackHandler, ActivityIndicator, Alert, ScrollView} from 'react-native';
import Storage from '../../utils/storage/storage';
import { Avatar, Text } from 'react-native-paper';
import CustomInput from '../commons/CustomInput'
import CustomButton from '../commons/CustomButton'
import Icon from 'react-native-vector-icons/AntDesign';
import {Ionicons} from '@expo/vector-icons'
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

import friend_icon from '../../../assets/achivements/friend_icon.png'
import start_icon from '../../../assets/achivements/start_icon.png'
import finish_icon from '../../../assets/achivements/finish_icon.png'
import team_finish_icon from '../../../assets/achivements/team_finish_icon.png'
import rate_icon from '../../../assets/achivements/rate_icon.png'
import coupon_icon from '../../../assets/achivements/coupon_icon.png'
import many_quests_icon from '../../../assets/achivements/many_quests_icon.png'
import ranking_icon from '../../../assets/achivements/ranking_icon.png'
import speedrun_icon from '../../../assets/achivements/speedrun_icon.png'

import { useFocusEffect } from '@react-navigation/native';

import {avatarChange, submitUserChanges, passwordUpdate, getUser} from '../../utils/apicalls/ApiCalls';

const ProfileScreen = ({navigation}) => {
    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                navigation.navigate('Quest Navigator')
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress',onBackPress);
            return () => { BackHandler.removeEventListener('hardwareBackPress',onBackPress) };
        }, []),
    );

    const {height} = useWindowDimensions();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        
        navigation.setOptions({
            headerTitle: 'Perfil',
            headerTintColor: '#a52a2a',
            headerRight: () => (
                <Ionicons color='#a52a2a' name ='arrow-back' size={30} onPress={() => navigation.navigate('Quest Navigator')}/>
            ),
            headerSearchBarOptions: {
                placeholder: "Search",
            }
        })

        Storage.getObject('user')
        .then(user => {
            getUser(user.id)
            .then(() => {
                Storage.getObject('user')
                .then(refreshedUser => {
                    refreshValues(refreshedUser);
                    setLoading(false);
                })
            })
            .catch(() => {
                Alert.alert("Hubo problemas al conectarse con el servidor");
                navigation.navigate('Quest Navigator')
            })
        })
    }, []);

    const [userId, setUserId] = useState(1);
    const [image, setImage] = useState(1);
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [manual, setManual] = useState(false);
    const [achivements, setAchivements] = useState([]);

    function refreshValues(user){
        setManual(user.manual);
        setUserId(user.id);
        setImage(user.image);
        setName(user.name);
        setEmail(user.email);
        setUsername(user.username);
        formatAchivements(user.achivements? user.achivements : []);
    }
    
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

    const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0)
    const listCategories = () => {
        return (
        <View style={styles.categoryListContainer}>
            {['Perfil', 'Logros'].map((category, index) => (
                <Pressable key={index} onPress={ () => {setSelectedCategoryIndex(index)}}>
                    <Text style={[styles.categoryListText, (index == selectedCategoryIndex && styles.activeCategoryListText)]}>
                        {category}
                    </Text>        
                </Pressable>
            ))}
        </View>)
    }

    const formatAchivements = (userAchivements) => {
        setAchivements([
            {
                name: "Haz un amigo",
                description: "Envia una invitación de amistad exitosa o acepta una",
                logo: friend_icon,
                earned: userAchivements.includes("MadeFriend_ac")
            },
            {
                name: "Inicia una búsqueda",
                description: "Arranca cualquier búsqueda",
                logo: start_icon,
                earned: userAchivements.includes("StartedQuest_ac")
            },
            {
                name: "Completa una búsqueda",
                description: "Termina una búsqueda y obtén tu recompenza",
                logo: finish_icon,
                earned: userAchivements.includes("FinishedQuest_ac")
            },
            {
                name: "Completa una búsqueda en equipo",
                description: "Termina una búsqueda con un grupo de amigos",
                logo: team_finish_icon,
                earned: userAchivements.includes("FinishedTeamQuest_ac")
            },
            {
                name: "Califica una búsqueda",
                description: "Da una calificación a una búsqueda",
                logo: rate_icon,
                earned: userAchivements.includes("RatedQuest_ac")
            },
            {
                name: "Usa un cupón",
                description: "Utiliza uno de los cupones obtenidos como recompenza",
                logo: coupon_icon,
                earned: userAchivements.includes("UsedCoupon_ac")
            },
            {
                name: "Completa 5 búsquedas",
                description: "Gana 5 búsquedas de principio a fin",
                logo: many_quests_icon,
                earned: userAchivements.includes("FinishedFiveQuests_ac")
            },
            {
                name: "Top 3",
                description: "Califica en el top 3 del podio de una búsqueda",
                logo: ranking_icon,
                earned: userAchivements.includes("TopThreeRanking_ac")
            },
            {
                name: "Acelerado",
                description: "Termina una búsqueda en menos de 15 minutos",
                logo: speedrun_icon,
                earned: userAchivements.includes("FiftyMinutes_ac")
            }
        ])
    }

    const Achivement = (params) => {
        return <View style={styles.achivementContainer}>
            <View style={{flex: 1}}> 
                <Avatar.Image
                    source={params.achivement.item.logo}
                    style={{opacity: params.achivement.item.earned? 1 : 0.3}}
                    size={50}
                    marginTop={5}
                />
            </View>
            <View style={{flex: 5, marginLeft: 10}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>{params.achivement.item.name}</Text>
                <Text>{params.achivement.item.description}</Text>
            </View>
        </View>
    }

    if(loading){
        return(
            <View style={{flex: 1, backgroundColor: '#FFF9CA'}}>
                <ActivityIndicator size="large" style={{flex: 1, justifyContent: "center", paddingTop: 50, transform: [{scaleX:2},{scaleY:2}]}}/>
                <View style={[styles.container, {flex: 2}]}>
                    <Image
                        source = {geoQuestLogo_edge}
                        style={[styles.logo, {height: height * 0.3}]}
                        resizeMode="contain"
                        />
                </View>
            </View>
        )
    }

    return (
        <View style={{flex: 1, backgroundColor: '#FFF9CA'}}>
            {/* <Text style={{marginLeft: 5}}>
                manual: {manual.toString()}{"\n"}
                id: {userId}{"\n"}
                image: {image}{"\n"}
                name: {name}{"\n"}
                email: {email}{"\n"}
                username: {username}{"\n"}
            </Text> */}
            {listCategories()}

            {/* Perfil */}
            {selectedCategoryIndex == 0 && <>
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
                    <Text style={{alignSelf:'flex-start', paddingLeft: 10}}>Nombre</Text>
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
                    <Text>Usuario</Text>
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
            </>}

            {selectedCategoryIndex == 1 && <>
                <Text style={{paddingTop: 10, paddingRight: 10, alignSelf: 'flex-end', color: '#a52a2a', fontSize: 20, fontWeight: 'bold'}}>
                    Obtenidos ({achivements.filter((achivement) => achivement.earned).length}/9)
                </Text>
                <FlatList
                    horizontal= {false}
                    contentContainerStyle={{padding: 10}}
                    showsHorizontalScrollIndicator = {true}
                    data={achivements}
                    keyExtractor={(item, index) => index}
                    renderItem={(item) => <Achivement achivement={item}/>}>      
                </FlatList>
            </>}
        </View>
    );
}

var styles = StyleSheet.create({
    categoryListContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly'
    },
    categoryListText: {
      fontSize: 16,
      fontWeight: 'bold',
      paddingBottom: 5,
      color: '#cd853f',
    },
    activeCategoryListText: {
      color: '#a52a2a',
      borderBottomWidth: 1,
      paddingBottom: 5,
    },
    avatar: {
        flexDirection:'row',
        marginTop: 15,
        justifyContent:'center'
    },
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
    achivementContainer:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      height: 120,
      width: '100%',
      backgroundColor: 'aliceblue',
      elevation: 5,
      marginTop:10,
      padding: 15, 
    },
});

export default ProfileScreen