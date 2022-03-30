import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {
  Text,
   View,
   TextInput,
   TouchableOpacity,
   FlatList,
   StyleSheet,
} from 'react-native';

const App = () => {
  const [text, setText]=useState('')
  const ref = firestore().collection('messages')
  const [list, setList]=useState([])

  useEffect(()=>{
    return ref.onSnapshot(querySnapshot => {
      const list = []
      querySnapshot.forEach(doc=>{
        list.push({
          id:doc.data().id,
          title:doc.data().title,
          complete:doc.data().complete,
        })
      })
      setList(list);
    })
  }, [])

  const onSubmitPress=async()=>{
    console.log(text);
    if(text.length==0){
      alert("Please enter text");
      return
    }
    await ref.add({
      title: text,
      complete: false,
    })
    setText('')
  }
  return (
    <View style={style.mainContainer}>
      <View style={{flexDirection:'row'}}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={style.textInput}
            />

            <TouchableOpacity 
            style={style.button}
            disabled={text.length===0}
            onPress={onSubmitPress}
            >
                  <Text style={{color: 'red'}}>Submit</Text>
            </TouchableOpacity>

        </View>
        <FlatList
        data={list}
        renderItem={({item})=>(
          <View style={style.card}>
              <Text style={{color:'white'}}>{item.title}</Text>
              <Text style={{color:'white'}}>{item.complete}</Text>
            </View>
        ) }/>
    </View>


  );
};

const style = StyleSheet.create({
  card: {
    width: "90%",
    height: 50,
    backgroundColor: '#1c313a',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    backgroundColor:'green', 
    width: '70%', 
    height:50,
    color: 'white',
    fontSize: 25,
    borderRadius: 5,
  },
  mainContainer:{
    flex:1,
    padding:10, 
    paddingTop:20,
  },
  button:{
    width: 90, 
    height: 50, 
    backgroundColor: 'yellow',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default App;
