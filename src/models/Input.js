import React, { useEffect, useState } from "react";
import '../css/input-msg.css';
import {store} from '../store/saveMSG';
import chance from './chance';
const abc = ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z']
const rand = (min, max) =>Math.floor(Math.random() * (max - min + 1) + min)
const randomScreenName = function(){
    let name = ''
    switch (rand(3, 16) % 3) {
        case 0:
            for(let i=0; i<=rand(3, 16); i++) {
                name += abc[rand(0, abc.length-1)]
            }
            break;
        case 1:
            for(let q=0; q<=1; q++){
                for(let i=0; i<=rand(3, 8); i++) {
                    name += abc[rand(0, abc.length-1)]
                }
                name+=(!q?'_':'')
            }
            break;
        case 2:
            for(let q=0; q<=2; q++){
                for(let i=0; i<=rand(3, 4); i++) {
                    name += abc[rand(0, abc.length-1)]
                }
                name+=(q<=1?'_':'')
            }
            break;
    }
    return name
}


function Input(props){
    const [request, setRequest] = useState({});
 
    useEffect(() => {
        if(Object.keys(request).length > 0){
            props.socket.emit("message", request, (err) => {
                if (err) console.error(err);
                console.log("success");
                
              });
        }
    }, []);

    const inputType = e => {
        if(e){
            if(e.value.length > 0 && e.value.length < 200){
                const msg = {
                    "attr":chance(),
                    "mod":chance(),
                    "createdAt":new Date().toISOString(),
                    "from":randomScreenName(),
                    "id":store.getState()[1],
                    "lvl":Math.floor(Math.random() * 11),
                    "text":e.value
                }
                store.dispatch({
                    type: 'ADD_msg',
                    text: msg
                })
                setRequest({
                    "from": msg.from,
                    "text": msg.text
                })
                // console.log( 'msg', msg )
                props.msgReload(msg);
                e.value = ''
            } else if(e.value.length>200){
                console.log( 'the typed message is very long, the maximum message length is 200 characters' )
            }
        }
    }
    return (
        <div className="input">
            <div className="imput-box">
                <input type="text" name="typed-msg" onKeyDown={(e)=>{e.keyCode == 13?inputType(e.target):null}} placeholder="Напишите сообщение..."/>
            </div>
            <div className="smiles-box">
                <div className="list-smile">

                </div>
                <div className="smiles hide">
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="15 10 40 30">
                        <g transform="translate(0,58) scale(0.100000,-0.100000)" fill="#ffffff5e" stroke="none">
                            <path d="M300 479 c-88 -35 -127 -146 -77 -219 51 -76 122 -97 197 -58 54 28 83 75 83 133 0 104 -109 181 -203 144z m126 -44 c35 -23 56 -77 48 -121 -7 -39 -54 -91 -90 -100 -112  -28 -201 109 -127 196 14 18 36 36 47 41 29 12 92 4 122 -16z"/>
                            <path d="M297 393 c-10 -9 -8 -51 2 -57 17 -11 33 21 21 43 -12 23 -14 24 -23 14z"/>
                            <path d="M387 394 c-11 -11 -8 -52 4 -60 10 -6 28 11 29 27 0 13 -26 40 -33 33z"/>
                            <path d="M280 292 c0 -5 8 -16 18 -25 27 -24 94 -22 117 3 22 24 12 39 -15 22 -24 -15 -76 -16 -85 -2 -8 12 -35 13 -35 2z"/>
                        </g>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Input