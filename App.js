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
  TouchableHighlight,
  TouchableOpacity,
  Alert
} from 'react-native';

import NavBar from './components/NavBar';

export default class App extends Component<{}> {
  constructor(props) {
    let dateList = new Date();
    super(props)
    this.onDone = this.onDone.bind(this);
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
          name: 'tarefa final',
          done: false 
        }
      ],
      dateEvent: dateList.getDate()+'/'+dateList.getMonth()+'/'+dateList.getFullYear(),
      dayEvent: dateWekly(dateList.getUTCDay())
    }
    //this.onDate = this.onDate.bind(this)
  }

  onDate() {
    //return new Date.toString;
  }
  onAdd() {
    let data = this.state.data;
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
    let dateEvent = this.state.dateEvent;
    let dataList = this.state.data;
    let dayEvent = this.state.dayEvent;

    return (
      <View style={styles.container}>
        <View style={{height:200, flexDirection:'column'}}>
          <NavBar />
          <View style={{ height:150, justifyContent: 'center', alignItems:'center', backgroundColor: '#50D2C2' }}>
              <Text style={styles.textDate}>{dateEvent}</Text>
              <Text style={styles.dayEventCss}>{dayEvent.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            style={{marginLeft: 10}}
            data={dataList}
            renderItem={({item}) => 
              <View style={{ flexDirection:'row', height: 70, borderBottomWidth: 0.2 }}>
        
                <View style={{width:50, height:70, justifyContent:'center', alignItems:'center'}}>
                  <TouchableOpacity
                    style={{borderRadius: 30, width:50, height:50, backgroundColor: '#50D2C2', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => this.onDone(item.key)}>
                    <Text style={{color: '#FFF'}}>{(item.done == true) ? 'I' : 'A'}</Text>
                  </TouchableOpacity>
                </View>

                <View style={{alignItems:'center', justifyContent:'center', marginLeft: 25}}>
                  <Text style={styles.listLine}>{item.name}</Text>
                </View>
                
              </View>
            }/>
          </View>
          <TouchableOpacity
            style={styles.buttonAdd}
            onPress={this.onAdd.bind(this)}>
            <Text style={styles.actionText}>+</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const dateWekly = (day) => {
  switch(day) {
    case 0:
      return 'Domingo';
    case 1:
      return 'Segunda';
    case 2:
      return 'Terça';
    case 3:
      return 'Quarta';
    case 4:
      return 'Quinta';
    case 5:
      return 'Sexta';
    case 6:
      return 'Sábado';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  actionText: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
    fontWeight: '100'
  },
  buttonAdd: {
    width: 60,
    height: 60,
    backgroundColor:'#BA77FF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 0,
    borderRadius: 30
  },
  textDate: {
    fontSize: 35,
    fontWeight: '100',
    color: '#FFF'
  },
  dayEventCss: {
    marginTop: 0,
    fontSize: 11,
    color: '#FFF',
    fontWeight: 'bold'
  },
  listLine: {
    fontSize: 14,
    fontWeight: '100',
  }
});