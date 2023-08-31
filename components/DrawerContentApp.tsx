import {DrawerItem } from '@react-navigation/drawer'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { StyleSheet, View } from 'react-native'
import { colors, theme } from '../global.styles'
import { H1} from './Text'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { LinearGradient } from 'react-native-linear-gradient'
import Feather from 'react-native-vector-icons/Feather'

function DrawerContentApp(props:any) {
    

    const {logout}:any = useContext(AuthContext)

    const styles = StyleSheet.create({
        DrawerContentHeader:{
            height:150,
            display:"flex",
            flexDirection:"row",
            gap:12,
            justifyContent:"center",
            alignItems:"center",
        },
        DrawerContentHeaderTitle:{
            color:colors.zinc[0],
            fontSize:25
        },
        DrawerContentFooter:{
            flex:1,
            display:"flex",
            justifyContent:"flex-end"
        },
        DrawerContentFooterItem:{
            borderTopWidth:1 ,
            borderTopColor:colors.zinc[300],
        },
        DrawerItem:{
        },
        DrawerItemLabel:{
            fontSize:15,
            color:colors.zinc[700]
        }
    })

  return (
    <View style={{flex:1}} >
        <LinearGradient 
                colors={[theme.primary,theme.primaryGradient]}
                start={{ x: 0, y: 0 }} 
                end={{ x: 1, y: 2 }}
                style={styles.DrawerContentHeader}
        >
            <H1 style={styles.DrawerContentHeaderTitle}>Digital Point</H1>                
            <FontAwesome5 color={colors.zinc[0]} name="map-pin" size={20} ></FontAwesome5>
        </LinearGradient>
        <DrawerItem
            icon={()=><AntDesign color={theme.primary} name="home" size={20} ></AntDesign>}
            style={styles.DrawerItem}
            labelStyle={styles.DrawerItemLabel}
            label={"Home"}
            onPress={()=>props.navigation.navigate("Home")}
        />
        <DrawerItem 
            icon={()=><AntDesign color={theme.primary} name="circledowno" size={20} ></AntDesign>}
            style={styles.DrawerItem}
            labelStyle={styles.DrawerItemLabel}
            label={"Pontos"}
            onPress={()=>props.navigation.navigate("Points")}
        /> 
        <DrawerItem
            icon={()=><AntDesign color={theme.primary} name="setting" size={20} ></AntDesign>}
            labelStyle={styles.DrawerItemLabel}
            style={styles.DrawerItem}
            label={"Configurações"}
            onPress={()=>props.navigation.navigate("SettingsStack")}
        /> 
        <View style={styles.DrawerContentFooter}>
            <View style={styles.DrawerContentFooterItem}>
                <DrawerItem
                    icon={()=><SimpleLineIcons color={theme.primary} name="logout" size={20} ></SimpleLineIcons>}
                    labelStyle={styles.DrawerItemLabel}
                    label={"Exit"}
                    onPress={()=>logout()}
                /> 
            </View>
        </View>
    </View>
  )
}

export default DrawerContentApp