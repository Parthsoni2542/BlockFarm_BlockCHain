import React, {
  useState,
  useCallback,
  useEffect,
  useRef,
  useContext,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
  Button,
  Image,
  StatusBar,
  Keyboard,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import socketIOClient from "socket.io-client";
import io from 'socket.io-client';
// import RNFS from 'react-native-fs';
// const ENDPOINT = "http://localhost:5003";
// import Wrapper from '../components/Wrapper';
// import Icon from "react-native-vector-icons/FontAwesome";
import Dots from 'react-native-vector-icons/dist/Entypo';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const Joi = require('joi');
// Joi.objectId = require('joi-objectid')(Joi);
import AntDesign from 'react-native-vector-icons/dist/AntDesign';
import DocumentPicker from 'react-native-document-picker';

import {
  SafeAreaView,
  // StyleSheet,
  // ScrollView,
  ImageBackground,
} from 'react-native';
// import * as ImagePicker from "react-native-image-picker";

// import NativeUploady, {
//   UploadyContext,
//   useItemFinishListener,
//   useItemStartListener,
//   useItemErrorListener,
// } from '@rpldy/native-uploady';

import moment from 'moment';

import Icon from 'react-native-vector-icons/dist/Feather';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const options = {
  title: 'Select Avatar',
  customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

import {
  InterstitialAd,
  TestIds,
  AdEventType,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-9529146124037412/4237396083';

var interstitial;

const ChatScreen = ({route, navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [adLoadedState, setadLoadedState] = useState();
  const {name, userId} = route.params;
  // const userId =''
  const [messge, setmessge] = useState(' ');
  const [chatMessage, setChatMessage] = useState([]);
  const [senderMsg, setSenderMsg] = useState([
    // {
    // 	sender: {
    // 		userId: "60e87c1499a16e0017fd7147",
    // 		name: "talha1392.ahmed@gmail.com",
    // 		email: "talha1392.ahmed@gmail.com",
    // 		avatar: "http://localhost:5003/api/v1/avatar/view/user-avatar-temp.png",
    // 		phone: "+3122123415",
    // 		qrCode: "60e87c1499a16e0017fd7147",
    // 		availableStatusMobile: "online",
    // 		availableStatusWeb: "offline",
    // 	},
    // 	receivers: [],
    // 	message: {
    // 		content: "perfect",
    // 		qrCode: "xxxxxxxxxxxxxx",
    // 		attachments: [
    // 			"http://localhost:5003/api/v1/attachment/view/604db1fe95c52b43246a0eb3",
    // 		],
    // 		messageId: "61a14d02e1ac741c2cdf0a15",
    // 		conversationId: "61a1401fe1ac741c2cdf07b7",
    // 	},
    // },
  ]);
  const LoadInterstitialAd = () => {
    interstitial = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['fashion', 'clothing'],
    });
    interstitial.load();
    interstitial.addAdEventsListener(({type, payload}) => {
      console.log(`${Platform.OS} interstitial ad event: ${type}`);
      setadLoadedState(type);

      if (type === AdEventType.ERROR) {
        setadLoadedState(type);

        // setLoaded(false)
        console.log(`${Platform.OS} interstitial error: ${payload?.message}`);
      }
      if (type === AdEventType.LOADED) {
        console.log('works');
        setLoaded(true);
      }
    });
  };
  const ref = useRef();
  const socket = io('https://hopeaccelerated-chat.herokuapp.com', {
    //use Your pc ip
    transports: ['websocket'],
    jsonp: false,
    forceNew: true,
  });
  socket.on('connect', () => {
    console.log(socket.connected);
  });
  useEffect(() => {
    LoadInterstitialAd();

    const unsubscribe = navigation.addListener('focus', () => {
      LoadInterstitialAd();
    });

    getConversationMessagesList();
  }, []);

  // useEffect(() => {
  // 	getConversationMessagesList();
  // }, []);

  //For Image Picker
  const ShowGallery = () => {
    // ImagePicker.openPicker({
    // 	width: 300,
    // 	height: 400
    // }).then((image) => {
    // 	setImageRes(image.path);
    // 	Snackbar.show({
    // 		backgroundColor: "green",
    // 		text: "Vehicle Regestration Successfully Uploaded",
    // 		duration: Snackbar.LENGTH_SHORT
    // 	});
    // });
  };
  const submitChat = () => {
    socket.emit('send_message', {
      senderId: '6065a1d5cf74870017bdd622',
      receiverIds: [userId],
      message: {
        content: messge,
        qrCode: 'xxxxxxxxxxxxxx',
        attachmentIds: ['604db1fe95c52b43246a0eb3'],
      },
    });
    setmessge('');
  };
  // console.log(chatMessage,'---->chat message')
  function getConversationMessagesList() {
    console.log(`getConversationMessagesList event`);
    socket.emit('get_conversation_messages_list', {
      receiverId: '6065a1d5cf74870017bdd622',
      userId: userId,
      limit: 10,
      skip: 1,
      sortOrder: 'asc',
    });
  }

  // function readMessage() {
  //   console.log(`read message event fired`);
  //   socket.emit("send_read_message", {
  //     messageId: messageId,
  //     readByUserId: rcvr
  //   });
  // }

  // function seenMessage() {
  //   console.log(`seen message event fired`);
  //   socket.emit("send_seen_message", {
  //     messageId: messageId,
  //     seenByUserId: rcvr
  //   });
  // }

  // function userTyping() {
  //   console.log(`user typing event fired`);
  //   socket.emit("send_user_is_typing", {
  //     conversationId: conversationId,
  //     userId: sender
  //   });
  // }

  socket.on('receive_message', data => {
    console.log(`Received Message ${JSON.stringify(data)}`);
    setSenderMsg([...senderMsg, data]);

    // setRcvdMsg(data.message.content);
  });

  socket.on('receive_conversation_messages_list', data => {
    // console.log(`Received Conversation Messages List `,data);
    setChatMessage(data);
    // setRcvdMsg(JSON.stringify(data))
  });

  socket.on('send_push_notification', data => {
    console.log(`Call Push Notification API ${JSON.stringify(data)}`);
    // setRcvdMsg("Receiver is offline")
  });

  socket.on('request_payload_error', data => {
    console.log(`Request Payload Error ${JSON.stringify(data)}`);
  });

  socket.on('receive_user_is_typing', data => {
    console.log(`This User is typing ${JSON.stringify(data)}`);
  });

  socket.on('receive_read_message', data => {
    console.log(`Message is read by this User ${JSON.stringify(data)}`);
  });

  socket.on('receive_seen_message', data => {
    console.log(`Message is seen by this User ${JSON.stringify(data)}`);
  });

  socket.on('joi_validation_exception', data => {
    console.log(`Joi Validation Exception ${JSON.stringify(data)}`);
  });
  console.log(chatMessage, '------->');
  console.log(senderMsg, 'okkjhgfv');
  // const [response, setResponse] = useState("");
  const [messages, setMessages] = useState('');
  const [result, setResult] = React.useState();
  useEffect(() => {
    console.log(JSON.stringify(result, null, 2));
  }, [result]);

  const handleError = err => {
    if (DocumentPicker.isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const [isVisibleModal, setisVisibleModal] = useState();
  const [imageSrc, setimageSrc] = useState();
  const [imageUrl, setimageUrl] = useState();
  const documentSelect = async () => {
    // const {input, meta, ...inputProps} = this.props;

    setisVisibleModal(false);

    setTimeout(async () => {
      try {
        const res = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.allFiles],
        });
        // const fileName = res.uri.replace('file://', '');
        // let data = '';
        // RNFetchBlob.fs.readStream(res, 'base64', 4095).then(ifstream => {
        //   ifstream.open();
        //   ifstream.onData(data => {
        //     console.log('Check data ifstream ==> ', data);
        //     let base64 = `data:${res.type};base64,` + data;

        //     const param = {
        //       base64: base64,
        //       width: 300,
        //       height: 300,
        //       name: res.name,
        //       type: res.type,
        //       size: 7391,
        //       fileName: res.name,
        //     };

        //     console.log('params documentSelect ===> ', param);
        //     setimageSrc(param.base64);
        //     setimageUrl(param.base64);
        //     input.onChange(param);
        //   });
        //   ifstream.onError(err => {
        //     console.log('oops', err);
        //   });
        // });
        console.log(
          res.uri,
          res.type, // mime type
          res.name,
          res.size,
        );
        setimageSrc(res.name);
        setimageUrl(res.uri);
      } catch (err) {
        if (DocumentPicker.isCancel(err)) {
          // User cancelled the picker, exit any dialogs or menus and move on
        } else {
          throw err;
        }
      }
    }, 1000);
  };
  return (
    <>
      <View
        style={{
          flex: 6,
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Header navig={() => navigation.goBack()} />

        <View style={styles.bottomview}>
          <ScrollView style={{marginTop: 20}} keyboardShouldPersistTaps={true}>
            {chatMessage.map(item => {
              // console.log(item.receiverDetails);
              return (
                <View
                  key={item.name}
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                  }}>
                  <Image
                    source={{
                      // uri: item.attachments[0] || "",
                      uri: item?.attachments[0],
                      // uri: "https://image.shutterstock.com/image-photo/id-photo-portrait-businessman-suit-260nw-1505360618.jpg",
                    }}
                    resizeMode={'contain'}
                    style={
                      {
                        // height: 40,
                        // width: 20,
                        // borderRadius: 300,
                        // alignSelf: "center"
                        // backgroundColor:'red'
                      }
                    }
                  />
                  <View style={{width: '100%'}}>
                    <LinearGradient
                      colors={['#473692', '#57CB2E']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        margin: 10,
                        width: '55%',
                        borderRadius: 30,
                        // height:responsiveHeight(4),
                        padding: 15,
                      }}>
                      <Text
                        style={{
                          margin: 10,
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 14,
                        }}>
                        {item?.content}
                      </Text>
                    </LinearGradient>
                    <Text
                      style={{
                        color: 'gray',
                        paddingLeft: 50,
                      }}>
                      {moment().format('hh:mm:ss')}
                    </Text>
                  </View>
                </View>
              );
            })}
            {senderMsg.map(item2 => {
              // console.log(item.receiverDetails);
              return (
                <View
                  key={item2.id}
                  style={{
                    flexDirection: 'row',
                    // left: "6%",
                    paddingLeft: '40%',
                    // width: '100%',
                    justifyContent: 'flex-end',
                    // borderWidth: 1,
                    // borderColor: "white"
                    // marginLeft: "40%",
                  }}>
                  <Image
                    source={{
                      uri: item2.message?.attachments[0],
                      // uri: "https://image.shutterstock.com/image-photo/id-photo-portrait-businessman-suit-260nw-1505360618.jpg",
                    }}
                    resizeMode={'contain'}
                    style={
                      {
                        // backgroundColor:'red'
                      }
                    }
                  />
                  <View
                    style={{
                      width: '100%',
                      alignItem: 'flex-end',
                      paddingRight: 10,
                    }}>
                    <LinearGradient
                      colors={['#473692', '#57CB2E']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      style={{
                        margin: 10,
                        width: '95%',
                        borderRadius: 30,
                        // height:responsiveHeight(4),
                        padding: 15,
                      }}>
                      <Text
                        style={{
                          margin: 10,
                          color: 'white',
                          fontWeight: '700',
                          fontSize: 14,
                        }}>
                        {item2?.message.content}
                      </Text>
                    </LinearGradient>
                    <Text
                      style={{
                        color: 'gray',
                        paddingLeft: '68%',
                      }}>
                      ✔
                    </Text>
                  </View>
                </View>
              );
            })}

            {/* })} */}
          </ScrollView>

          <View style={styles.outerview}>
            <View style={styles.innerview}>
              <TextInput
                style={styles.input}
                onChangeText={text => setmessge(text)}
                value={messge}
                placeholder="Type Message"
                placeholderTextColor="gray"
                keyboardType="default"
              />
              <View style={styles.btmiconview}>
                <TouchableOpacity
                  style={styles.bottomicon}
                  // onPress={() => {
                  // 	documentSelect();
                  // }}
                  onPress={() => {
                    if (loaded == true) {
                      if (adLoadedState == 'loaded') {
                        interstitial.show();
                        // navigation.navigate('login')
                        documentSelect();

                        setLoaded(false);
                      }
                    } else {
                      // navigation.navigate('login')
                      documentSelect();
                      setLoaded(false);
                    }
                  }}>
                  <Image
                    source={require('./assets/images/attachment.png')}
                    resizeMode={'contain'}
                    style={styles.bottomicon}
                  />
                </TouchableOpacity>
                <Image
                  source={require('./assets/images/mic.png')}
                  resizeMode={'contain'}
                  style={styles.bottomicon}
                />
                <TouchableOpacity
                  onPress={submitChat}
                  style={styles.bottomicon}>
                  <Image
                    source={require('./assets/images/send.png')}
                    resizeMode={'contain'}
                    style={styles.bottomicon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* </Wrapper> */}
    </>
  );
};

const Header = ({navig}) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginTop: 19,
          backgroundColor: 'white',
          marginBottom: 30,
        }}>
        <TouchableOpacity onPress={navig}>
          <AntDesign
            name="arrowleft"
            style={{marginLeft: 5, padding: 10}}
            size={24}
            color="#000"
          />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 23,
            fontFamily: 'Sansation',
            marginLeft: 80,
            marginTop: 17,

            color: '#000',
            // fontWeight: "bold",
          }}>
          Messages
        </Text>

        <TouchableOpacity>
          <Dots
            style={{
              marginLeft: '48%',
              fontSize: 24,
              color: '#000',
              marginTop: 12,

              // fontWeight: "100",
            }}
            name="dots-three-vertical"
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ChatScreen;

// const styles = StyleSheet.create({});

const styles = StyleSheet.create({
  topiconview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  topview: {
    flex: 1.9,

    backgroundColor: 'rgba(230, 226, 214, 0.3);',
  },
  topiconsty: {
    padding: 5,
  },
  userimgview: {
    borderWidth: 4,
    borderColor: '#F9A339',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignSelf: 'center',
    // bottom: responsiveHeight(5),
  },
  title: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 5,
  },
  subtext: {
    color: 'gray',
    alignSelf: 'center',
    fontSize: 14,
    margin: 10,
  },
  bottomview: {
    flex: 4.1,
    backgroundColor: 'white',
    width: '100%',
  },
  outerview: {
    // backgroundColor: '#EA4836',
    margin: 10,
    borderRadius: 15,
  },
  innerview: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 1,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16.0,
    borderRadius: 30,
    elevation: 50,
    marginBottom: 10,
  },
  input: {
    height: 60,
    width: responsiveWidth(50),
    paddingHorizontal: 15,
    color: 'black',
    // backgroundColor:'red'
  },
  btmiconview: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingRight: 10,
  },
  bottomicon: {
    height: 20,
    width: 20,
    alignSelf: 'center',
    marginHorizontal: 10,
  },
});
