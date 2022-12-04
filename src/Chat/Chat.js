import React, { Component, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { firebaseAuthObj, firebaseDatabaseObj} from "../constants/firebase";
import {  onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue, set, push} from "firebase/database";

const Chat = ({id}) => {
    const userFromStore = useSelector((state) => state.user);

    const [userChatDetails, setUserChatDetails] = useState(null); 

  const [chatState, setChatState] = useState({
    user: null,
    chats: [],
    content: "",
    readError: null,
    writeError: null,
    loadingChats: true,
  });

  // const [loginState, setLoginState] = useState({
  //   authenticated: false,
  //   loading: true,
  // });

 

  const myRef = useRef();

  useEffect(() => {
    if(!chatState.user){
    onAuthStateChanged(firebaseAuthObj, (user) => {
        if (user) {
            setChatState({...chatState, user:{uid: user.uid, email: user.email}});
        } else return null
      })}
    // try {
    //   await signin("chbangal@iu.edu", "test123");
    // } catch (error) {
    //   setChatState({ error: error.message });
    // }

    if (chatState.loadingChats == true) {
      getChats();
    }

    // if (loginState.loading == true) {
    //   handleLogin();
    // }
  }, [chatState]);

  // const handleLogin = async () => {
  //   auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log(user);
  //       setLoginState({
  //         authenticated: true,
  //         loading: false,
  //       });
  //     } else {
  //       setLoginState({
  //         authenticated: false,
  //         loading: false,
  //       });
  //     }
  //   });
  // };

  const getChats = async () => {
    const chatArea = myRef.current;

    try {
       
      
      const chatRef = await ref(firebaseDatabaseObj, id);      
      
      onValue(chatRef, (snapshot) => {
        console.log(snapshot.val())
        let chats = [];
        let tempChat=snapshot.val();

        snapshot.forEach((snap) => {
          tempChat = { ...snap.val() };
          chats.push({
            ...tempChat,
            content: tempChat.sender + ": " + tempChat.content,
          });
        });

          // chats.push({
          //   ...tempChat,
          //   content: tempChat.sender + ": " + tempChat.content,
          // });
  

        chats.sort((a, b) => a.timestamp - b.timestamp);
        chatArea.scrollBy(0, chatArea.scrollHeight);
        setChatState({ ...chatState, chats, loadingChats: false });
      });
    } catch (error) {
      setChatState({
        ...chatState,
        readError: error.message,
        loadingChats: false,
      });
    }
  };

  onAuthStateChanged(firebaseAuthObj, (user) => {
    if (user) {
      const uid = user.uid;
    } else {

    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setChatState({ ...chatState, writeError: null });
    const chatArea = myRef.current;
    console.log(chatState.content)
    try {
       push(ref(firebaseDatabaseObj, id), {
        content: chatState.content,
        timestamp: Date.now(),
        uid: chatState.user.uid,
        sender: chatState.user.email,
      });

      setChatState({ ...chatState, content: "" });
      getChats()
    //   chatArea.scrollBy(0, chatArea.scrollHeight);
    } catch (error) {
        alert("Failed to send message to Bloom Chat")
        console.log(error)
      setChatState({ ...chatState, writeError: error.message });
    }
  };

  const formatTime = (timestamp) => {
    const d = new Date(timestamp);
    const time = `${d.getDate()}/${
      d.getMonth() + 1
    }/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    return time;
  };

  return (
    <>
      {/* {loginState.loading == true ? (
        <h1 className="text-center">Only Registered users can chat</h1>
      ) : ( */}
      <div style={{ width: "50vw" }} className="mx-auto card p-5">
        <h2 className="text-center mb-5">Chat</h2>
        <div ref={myRef} style={{minHeight: "500px", maxHeight: "500px", overflow: "scroll"}}>
          {chatState.loadingChats ? (
            <span className="sr-only">Loading...</span>
          ) : (
            ""
          )}
          {chatState.chats.map((chat) => {
          
            return (
            
              <div
                key={chat.timestamp}
                style={{textAlign: (chatState.user.uid === chat.uid ? "right" : "left")}}
                className={
                  "mb-5 " 
                }
              >
                <span
                  style={{
                    width: "fit-content",
                    borderRadius: " 6px 6px ",
                  }}
                  className={
                    "p-2 " +
                    (chatState.user.uid === chat.uid
                      ? "bg-success"
                      : "bg-primary")
                  }
                >
                  {chat.content}
                </span>
                <br />
                <span>{formatTime(chat.timestamp)}</span>
              </div>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mt-5">
            <input
              type="text"
              name="content"
              onChange={(event) => {
                setChatState({ ...chatState, content: event.target.value });
              }}
              value={chatState.content}
              className="form-control"
              style={{ width: "65%" }}
            ></input>
            {chatState.error ? <p>{chatState.error}</p> : null}
            <button type="submit" className="btn btn-info ml-2">
              Send
            </button>
          </div>
        </form>
      </div>
      {/* ) */}
    </>
  );
};

export default Chat;
