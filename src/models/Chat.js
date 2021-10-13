import React, { useEffect, useState } from "react";
import styles from "../css/Chat.css";
import {store} from '../store/saveMSG';
import chance from './chance';
import {ajax} from './loader'


function scrollToElement(item){
    if(item)
        item.scrollIntoView({ behavior: 'smooth' })
}

const myMSG = (text) => (
    <div className="box-msg my-msg">
        {text.length< 200?text:text.slice(0,200)}
    </div>
)
const allMSG = (msg) => (
    <div className="box-msg">
        <div className="head-msg">
            {msg.attr.name=='Clan'?(<img src={msg.attr.img} className="clan" alt="clan" />):''}
            {msg.from}
            {msg.mod.name=='Moder'?(<img src={msg.mod.img} className="moder" alt="moderator" />):''}
            {msg.mod.name=='Admin'?(<img src={msg.mod.img} className="admin" alt="admininstrator" />):''}
            <div className="lavel">
                {msg.lvl}
            </div>
        </div>
        <div className="body-msg">
            {msg.text.length< 200?msg.text:msg.text.slice(0,200)}
        </div>
    </div>
)
function Chat(props){
    const [response, setResponse] = useState(props.myReload);
    
    if(Object.keys(props.myReload).length > 0){
        let allMSG = document.querySelectorAll('.box-m')
        scrollToElement(allMSG[allMSG.length-1])
    }
    
    const onScroll = e => {
        var sc = e.target
        if(e.target.scrollTop <= 150 && e.target.scrollTop >= 120){
            ajax(() => {
                // console.log('loading', store.getState().msg );
                setResponse(e.target.scrollTop)
                sc.scrollTop = (sc.scrollTop+950)
            })
        }
    };
    

    useEffect(() => {
        props.socket.on("message", data => {
            data.lvl = Math.floor(Math.random() * 11)
            data.attr = chance()
            data.mod = chance()
            store.dispatch({
                type: 'ADD_msg',
                text: data
            });
            setResponse(data);

            //Scroll to new msg
            // let allMSG = document.querySelectorAll('.box-m')
            // scrollToElement(allMSG[allMSG.length-1])
        });
    }, []);
    
    
    
    store.subscribe(() => setResponse(store.getState().msg));
   
    if(!response){
        return ( <span>Loading...</span>)
    } else {
        return (
            <style>{styles}</style>,
            <div className="box" onScroll={onScroll}>
                {store.getState().msg.map((i, k) => (
                    <div className={i.id === store.getState()[1]?"box-m my-box": "box-m"} key={k}>
                        {i.id === store.getState()[1]?myMSG(i.text):allMSG(i) }
                        <div className="time-msg">
                            {new Date(i.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
export default Chat;