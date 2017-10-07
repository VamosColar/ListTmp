/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableNativeFeedback
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
  constructor(props) {
    super(props)
    this.onDone = this.onDone.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.state = {
      data: [
        {
          key: 1,
          name: 'tarefa 1',
          done: false 
        },
        {
          key: 2,
          name: 'tarefa 2',
          done: false 
        },
        {
          key: 3,
          name: 'tarefa 3',
          done: false 
        },
        {
          key: 4,
          name: 'tarefa 4',
          done: false 
        },
        {
          key: 5,
          name: 'tarefa 5',
          done: false 
        },
        {
          key: 6,
          name: 'tarefa 6',
          done: false 
        },
        {
          key: 7,
          name: 'tarefa 7',
          done: false 
        },
        {
          key: 8,
          name: 'tarefa 1',
          done: false 
        },
        {
          key: 9,
          name: 'tarefa 2',
          done: false 
        },
        {
          key: 10,
          name: 'tarefa 3',
          done: false 
        },
        {
          key: 11,
          name: 'tarefa 4',
          done: false 
        },
        {
          key: 12,
          name: 'tarefa 5',
          done: false 
        },
        {
          key: 13,
          name: 'tarefa 6',
          done: false 
        },
        {
          key: 14,
          name: 'tarefa 7',
          done: false 
        },
        {
          key: 15,
          name: 'tarefa 1',
          done: false 
        },
        {
          key: 16,
          name: 'tarefa 2',
          done: false 
        },
        {
          key: 17,
          name: 'tarefa 3',
          done: false 
        },
        {
          key: 18,
          name: 'tarefa 4',
          done: false 
        },
        {
          key: 19,
          name: 'tarefa 5',
          done: false 
        },
        {
          key: 20,
          name: 'tarefa 6',
          done: false 
        },
        {
          key: 21,
          name: 'tarefa 7',
          done: false 
        }
      ]
    }
    //this.onDate = this.onDate.bind(this)
  }

  onDate() {
    //return new Date.toString;
  }
  onAdd() {
    let data = this.state.data;
    alert('teste');
    data.push({
      key: data.length + 1,
      name: 'Tarefa ' + (data.length + 1),
      done: false,
    })

    this.setState({
      data: data
    })
  }

  onDone(key) {
    let data = this.state.data;
    let newDate = [];
    data.forEach((v) => {
      if (v.key == key) {
        v.done = true;
      }
      newDate.push(v);
    })

    this.setState({
      data: newDate
    })

  }

  render() {
    let dateEvent = '12/12/2017';
    let dataList = this.state.data;
    return (
      <View>
        <View style={styles.container}>
          <Text>Menu</Text>
          <Text>List-TMP</Text>
          <Text>Busca</Text>
        </View>
        <View style={{flexDirection: 'column', justifyContent: 'center', height:125,  alignItems:'center', backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <Text style={{fontSize: 35}}>{dateEvent}</Text>
        </View>
        <View style={{position:'absolute', display:'flex', bottom:150,height:100, left:100, justifyContent:'center', alignItems:'center', backgroundColor:'transparent'}}>
          <TouchableNativeFeedback
              onPress={() => {this.onAdd()}}
              background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={{width: 100, height: 50, backgroundColor: '#000', justifyContent:'center', alignItems:'center'}}>
              <Text style={{color:"#FFF"}}>Adicionar</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
          <FlatList
            data={dataList}
            renderItem={({item}) => 
              <View style={{flexDirection:'row',padding: 10,height: 44, borderBottomWidth:1}}>
                <Button 
                  title={(item.done == true) ? 'I' : 'A'} 
                  onPress={() => this.onDone(item.key)}
                  style={{width:56}}
                />
                <Text style={{paddingLeft: 10}}>{item.name}</Text>
              </View>
            }
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#BA77FF',
    alignItems: 'flex-end'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
