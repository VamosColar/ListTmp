/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import * as firebase from 'firebase';
import Svg,{
  G,
  Polyline,
} from 'react-native-svg';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  TextInput
} from 'react-native';

import NavBar from './components/NavBar';

var config = {
  apiKey: "AIzaSyCJzs5FYtM4k7IHtLeUMXEL9KdMs7UgF5Y",
  authDomain: "listapptmp.firebaseapp.com",
  databaseURL: "https://listapptmp.firebaseio.com",
  projectId: "listapptmp",
  storageBucket: "",
  messagingSenderId: "945148779121"
};
let firebaseApp;

if (!firebase.apps.length) {
   firebaseApp = firebase.initializeApp(config);
};

export default class App extends Component<{}> {
  constructor(props) {
    let dateList = new Date();
    let ListActual = dateList.getDate()+'/'+dateList.getMonth()+'/'+dateList.getFullYear()
    let firebaseDatabase = dateList.getDate()+'-'+dateList.getMonth()+'-'+dateList.getFullYear()
    super(props)
    this.onDone = this.onDone.bind(this);
    this.state = {
      modalVisible: false, 
      text: '',     
      data: [],
      dateEvent: dateList.getDate()+'/'+dateList.getMonth()+'/'+dateList.getFullYear(),
      dayEvent: dateWekly(dateList.getUTCDay())
    }

    this.itemsRef = this.getRef().child('items-' + firebaseDatabase);  
  }

  getRef() {
    return firebaseApp.database().ref();
  }

  onDate() {
    //return new Date.toString;
  }
  onAdd() {
    this.setState({modalVisible: true});
  }

  onAddTask() {
    let data = this.state.data

    this.itemsRef.push({
      name: this.state.text,
      done: false
    })

    this.setState({
      text: ''
    })

    this.flatListRef.scrollToEnd();
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  onDone = (item) => {
    this.itemsRef.child(item.key).update({done: true})
  }

  renderDone = (item) => {
    if (!item.done) {
      return (
        <TouchableOpacity
        style={styles.inCheck}
        onPress={() => {this.onDone(item)}}>
      </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity style={styles.check} >
          <Svg width="30" height="24">
            <G id="do" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <G id="8-List" transform="translate(-58.000000, -849.000000)" stroke-width="2" stroke="#FFFFFF">
                    <Polyline id="shape" points="59 857.438829 66.3744 865 81 850"></Polyline>
                </G>
            </G>
          </Svg>
      </TouchableOpacity>
      )
    }
  }

  render() {
    let dateEvent = this.state.dateEvent;
    let dataList = this.state.data;
    let dayEvent = this.state.dayEvent;

    return (
      <View style={styles.container}>
        <View style={{height:225, flexDirection:'column'}}>
          <NavBar />
          <View style={styles.subHeader}>
              <Text style={styles.textDate}>Suas tarefas para hoje</Text>
              <Text style={styles.dayEventCss}>{dateEvent} {dayEvent.toUpperCase()}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            ref={(ref) => { this.flatListRef = ref }}
            style={{marginLeft: 10}}
            data={dataList}
            renderItem={({item}) => 
              <View style={styles.line}>
      
                <View style={{width:50, height:65, justifyContent:'center', alignItems:'center'}}>
                  {this.renderDone(item)}
                </View>

                <View style={{alignItems:'center', justifyContent:'center', marginLeft: 10, paddingRight: 23}}>
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
          <Modal
            animationType="fade"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
          >
            <View style={styles.viewBoxModal}>
              <View style={styles.viewModal}>
                <View>
                  <View style={styles.viewModalBoxHeader}>
                    <Text style={styles.textModalHeader}>Nova Tarefa</Text>
                  </View>
                  <View style={styles.viewModalBody}>
                    <Text style={{marginBottom: 4, fontWeight: 'bold'}}>Digite o nome de sua tarefa</Text>
                    <TextInput
                      underlineColorAndroid="transparent"
                      style={styles.textInputModal}
                      onChangeText={(text) => this.setState({text})}
                      value={this.state.text}
                    />
                  </View>
                  <View style={styles.viewFooterModal}>
                    <TouchableOpacity
                      style={[styles.buttonModal, styles.buttonSuccess]}
                      onPress={this.onAddTask.bind(this)}
                    >
                      <Text style={{color: '#fff'}}>Adicionar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.buttonModal, styles.buttonCancel]}
                      onPress={() => {
                      this.setModalVisible(!this.state.modalVisible)
                    }}>
                      <Text>Cancelar</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
      </View>
    );
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems(itemsRef) {
    itemsRef.on('value', (snap) => {

      // get children as an array
      var items = [];
      snap.forEach((child) => {
        items.push({
          name: child.val().name,
          done: child.val().done,
          key: child.key
        });
      });

      this.setState({
        data: items
      });

    });
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
  subHeader: {
    backgroundColor: '#F8F8FB',
    height:160, 
    justifyContent: 'center', 
    alignItems:'center'
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
    fontSize: 30,
    fontFamily: 'Montserrat-ExtraLight',
    color: '#1D1D26'
  },
  dayEventCss: {
    marginTop: 5,
    fontSize: 11,
    color: 'rgba(29,29,28, 0.5)',
    fontFamily: 'Montserrat-Light'
  },
  listLine: {
    fontFamily: 'Montserrat-ExtraLight',
    fontSize: 14
  },
  line: {
    flexDirection:'row', 
    height: 65,
    borderBottomWidth: 0.5,
    borderColor: '#DFE2E6'
  },
  viewBoxModal:{
    justifyContent:'center', 
    alignItems:'center',
    flexDirection: 'column',
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  viewModal: {
    backgroundColor: '#FFF',
    height:250,
    width:'90%',
    borderRadius: 20,
    flexDirection:'column',
    justifyContent: 'space-between',
    
  },
  viewModalBoxHeader: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor:'#BA77FF',
    height:50,
    justifyContent:'center',
    paddingHorizontal:15,
  },
  textModalHeader: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: '100'
  },
  viewModalBody: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 130
  },
  viewFooterModal: {
    paddingHorizontal: 15,
    height:60,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInputModal: {
    borderWidth: 1,
    borderColor: '#B2B2B2',
    borderRadius: 5,
    height:45,
    fontSize: 15,
    color: '#B2B2B2',
    fontWeight: '100',
    paddingHorizontal: 10,
    paddingTop:15,
    justifyContent: 'center'
  },
  buttonModal: {
    padding: 10,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    borderRadius: 5
  },
  buttonSuccess: {
    backgroundColor: '#50D2C2',
  },
  buttonCancel: {
    borderColor: '#FF3366',
    borderWidth: 1
  },
  inCheck: {
    borderRadius: 30,
    width:40, 
    height:40, 
    borderWidth: 1,
    borderColor: '#50D2C2',
  }, 
  check: {
    borderRadius: 50,
    width:40, 
    height:40,
    paddingTop:5,
    paddingLeft:5,
    backgroundColor: '#50D2C2',
    alignItems: 'center', 
    justifyContent: 'center'
  }
});