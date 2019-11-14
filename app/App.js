import React,{Component} from 'react';
import { StyleSheet, 
  Text, 
  View,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Alert,
  FlatList,
  StatusBar,
  Platform,
  YellowBox} from 'react-native';
import io from 'socket.io-client';



/**
 * class of items 
 * if change color index base
 * server chat mssg red and sclient black
 */

class ListItem extends Component{

  render(){
    return(

      <View>
          <Text style = {{color : this.props.index % 2 == 0 ? 'black' : 'red' , 
                fontSize : 20 ,
                marginTop : 7}}> 
                {this.props.item}        
          </Text>
      </View>
    )

  }

}

//main class

export default class  App extends Component{
   
  /**
   * constructor
   * @param {} props 
   * 
   */
  constructor(props){
    super(props);

    this.state = { chatMeasage : "",
                    serverReturnMassege : "",
                    chatMaggageArray : [],
                    count : 0
                 }
                 
                 
        YellowBox.ignoreWarnings(['Warning: ...']);
        console.disableYellowBox = true;      
     }

     

  /**
   * connect the server
   * getting masseges
   */
  componentDidMount(){

        //your development machine address
        //ex -> http://192.100.100.100:3000
       this.socket = io('http://218.39.000.00:3000');
       this.socket.on('massage',mssg =>{
          this.setState({serverReturnMassege : mssg});
          this.setState({chatMaggageArray : [...this.state.chatMaggageArray,mssg]});
       });
  }

    //submit your chat to server
    sendChatMessage(){
      if(this.state.chatMeasage != ""){
        this.socket.emit('massage', this.state.chatMeasage);
        this.setState ({ chatMaggageArray : [...this.state.chatMaggageArray,"[Client -> server]  : "+this.state.chatMeasage]});
        this.setState({ chatMeasage : ""});
      }
      else {
        Alert.alert('Please enter messsage..!');
      } 
    }

  render(){

        //creating massage map
         
        const chatMassage = this.state.chatMaggageArray.map(massge =>
         <Text 
          key={this.state.count++ }>{massge}
          </Text>).reverse();
    return (
      
      <View style = {stleses.cantainerMain}>

          <View>
            <StatusBar backgroundColor = '#A0A0A0' barStyle = 'dark-content'/>
           
         </View>
         <View style = {{ backgroundColor : '#1391DD',
                         marginTop : Platform.OS === 'ios' ? 34 : 25 ,
                         height : 50,
                        flexDirection : 'row',
                        justifyContent : 'center',
                        alignContent : 'center'} }>
                                               
                <Text style = {stleses.appName}> ECHO CHAT</Text>
          </View>

            <View style = {stleses.chatList}>

              <FlatList data = {chatMassage}
                inverted       
                renderItem = {({item,index})=>{
                  return(
                     <ListItem item ={item} index = {index} >

                     </ListItem>
                  );
                }}
              >

              </FlatList>
             
            </View>
            <KeyboardAvoidingView  behavior = 'padding'>

            <View style = {stleses.massageinputs}>
  
              <TextInput style = {stleses.textInput} placeholder = 'Enter message...'
                returnKeyType = 'send'
                autoCorrect  ={false}
                value = {this.state.chatMeasage}
                onChangeText = {text =>{
                  this.setState({
                    chatMeasage : text
                  });
                }}

                onSubmitEditing ={()=> this.sendChatMessage()}
              >
  
              </TextInput>
  
              <Button  title = 'SEND'
                onPress ={() =>{this.sendChatMessage()}}
              ></Button>

            </View>

        </KeyboardAvoidingView>

      </View>
    );
  }
}


// interface style

const stleses = StyleSheet.create({

  cantainerMain : {
    flex :1,
    backgroundColor : '#ffffff'
  }  ,
  
  chatList :{
    flex : 1,
    flexDirection : 'column',
    marginTop :20
  },
  massageinputs :{
    flexDirection : 'row',
    justifyContent : 'flex-end',
    alignContent : 'flex-end'
  },

  textInput :{
    flex:0.999,
    height : 45,
    borderColor :'#C1c1c1',
    borderWidth :1.5,
    padding :10
  },
  appName : {
    color : 'white',
    fontSize : 20
  }
});

