import React, { useEffect, useState } from 'react';
import Click from '../components/Click';
import { StyleSheet,Text,View, } from 'react-native';
import { colors, defaultStyles, fontSize, theme } from '../global.styles';
import { getData, setStoreData } from '../asyncStorage';
import { requestCreateWorkPoint } from '../api';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home(): JSX.Element {

  const [loading,setLoading] = useState(false)

  const [hours, setHours]:any =  useState({
    departure:null,
    entry:null,
    state:null
  })

  function handleSetDateTime(){
    
    getData("hoursDateTime")
    .then((response:any)=>{
      
        const values = JSON.parse(response)

        if(values==null||values.entry==null) {
          setStoreData(
            "hoursDateTime",
            JSON.stringify(
              {
                departure:null,
                entry: new Date().toISOString(),
                state:"Saída"
              }
            )
          )
          setHours({
            ...hours, 
            entry: new Date().toISOString(),
            state:"Saída"
          })
        }

        else if (values.departure==null) {
          setStoreData(
            "hoursDateTime",
            JSON.stringify(
              {
                departure: new Date().toISOString() ,
                entry:hours.entry,
                state:"Enviar"
              }
          ))
          setHours({
            ...hours,
            departure: new Date().toISOString(),
            state:"Enviar"
          })
        }

        else {
          getData("digitalPointTokenAcess")
          .then(token=> 
            {
              setLoading(true)
              requestCreateWorkPoint(values,token)
              .then(()=>{
                setLoading(false)
                setStoreData(
                  "hoursDateTime",
                  JSON.stringify(
                    {
                      departure:null,
                      entry:null,
                      state:"Entrada"
                    }
                ))
                setHours({
                  departure:null,
                  entry:null,
                  state:"Entrada"
                })
              })
            }
          )
        } 
    }) 
    
  }

  function handleGetDateTime(){
    
    getData("hoursDateTime")
    .then((response:any)=>{

        const values = JSON.parse(response)

          setHours({
            departure:values.departure,
            entry:values.entry,
            state:values.state
          })

    }) 

  }
  
  useEffect(() => {
    handleGetDateTime()
  }, [])

  return (  
    <SafeAreaView style={styles.HomeRoot}>
      <View  style={styles.Root}>
          <View style={styles.ItemsContainer}>
            <Text style={styles.Item}>
              {hours.entry!==null?String(new Date(hours.entry).getHours()).padStart(2, '0')[0]:"0"}
            </Text>
            <Text style={styles.Item}>
              {hours.entry!==null?String(new Date(hours.entry).getHours()).padStart(2, '0')[1]:"0"}
            </Text>
            <Text style={{fontSize:30}} >:</Text>
            <Text style={styles.Item}>
              {hours.entry!==null?String(new Date(hours.entry).getMinutes()).padStart(2, '0')[0]:"0"}
            </Text>
            <Text style={styles.Item}>
              {hours.entry!==null?String(new Date(hours.entry).getMinutes()).padStart(2, '0')[1]:"0"}
            </Text>
          </View>
          <View style={styles.ItemsContainer}>
            <Text style={styles.Item}>
              {hours.departure!==null?String(new Date(hours.departure).getHours()).padStart(2, '0')[0]:"0"}
            </Text>
            <Text style={styles.Item}>
              {hours.departure!==null?String(new Date(hours.departure).getHours()).padStart(2, '0')[1]:"0"}
            </Text>
            <Text style={{fontSize:30}} >:</Text>
            <Text style={styles.Item}>
              {hours.departure!==null?String(new Date(hours.departure).getMinutes()).padStart(2, '0')[0]:"0"}
            </Text>
            <Text style={styles.Item}>
              {hours.departure!==null?String(new Date(hours.departure).getMinutes()).padStart(2, '0')[1]:"0"}
            </Text>
          </View>
      </View>
      <View style={styles.ButtonRoot}>
        <Click 
           onClick={handleSetDateTime}
            loading={loading} 
            font={{
              size:fontSize.small,
              color:theme.secondaryText
            }}
            style={styles.Button}
            gradientColors={[theme.primary,theme.primaryGradient]}> 
              {hours.state!==null?hours.state:"Entrada"}
        </Click>       
      </View>
    </SafeAreaView> 
  );

}

const styles = StyleSheet.create({
  HomeRoot:{
    flex:1,
    display:"flex",
    flexDirection:"column",
    backgroundColor:theme.background
  },
  Header:{
    height:55
  },
  Button:{
    width:100,
    height:45,
    borderRadius:50,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
  },
  ButtonRoot:{
    display:"flex",
    alignItems:"center",
    marginBottom:40
  },
  ItemsContainer:{
    display:"flex",
    flexDirection:"row",
    gap:10,
    alignItems:"center",
    justifyContent:"center",
    padding:30
  },
  Root:{      
    padding:20,
    display:"flex",
    flexDirection:"column",
    gap:20,
    alignItems:"center",
    justifyContent:"center",
    flex:1
  },
  Item:{
    fontSize:30,
    width:40,
    height:40,
    color:theme.primaryText,
    borderRadius:10,
    display:"flex",
    justifyContent:"center",
    textAlign:"center",
    backgroundColor:colors.zinc[200],
  },
})

export default Home;

