import React from 'react';
import ReactDOM from 'react-dom';
import App from './models/App';
import io from "socket.io-client";
import { v4 as uuidv4 } from 'uuid';
import './css/reset.css';
import {store} from './store/saveMSG';
import {ajax} from './models/loader'


store.dispatch({
  type: 'ADD',
  text: "wss://test-chat-backend-hwads.ondigitalocean.app?skip=0&limit=15 "
});
store.dispatch({
  type: 'ADD',
  text: uuidv4()
});
[
  {
    attr: {name: "free",},
    mod: {name: 'free'},
    createdAt: new Date(Date.parse(new Date()) - (5 * 60 * 1000)).toISOString(),
    from: "tester",
    id: "0",
    lvl: 2,
    text: "теперь игра закончена)))",
  },
  {
    attr: {
      img: "/static/media/k2.264ce5f0.png",
      name: "Clan"
    },
    mod: {
      name: 'free'
    },
    createdAt: new Date(Date.parse(new Date()) - (4 * 60 * 1000)).toISOString(),
    from: "BivOld",
    id: "1",
    lvl: 5,
    text: "Я думал, что они будут пополнятся разв н-ное время А тут реально игра закончена",
  },
  {
    attr: {
      img: "/static/media/k1.852c0dff.png",
      name: "Clan"
    },
    mod: {
      name: 'Moder',
      img: '/static/media/m.2b3475a7.png'
    },
    createdAt: new Date(Date.parse(new Date()) - (3 * 60 * 1000)).toISOString(),
    from: "Nigativ",
    id: "2",
    lvl: 3,
    text: "сос можно только купить",
  },
  {
    attr: {
      img: "/static/media/k1.852c0dff.png",
      name: "Clan"
    },
    mod: {
      name: 'Admin',
      img: '/static/media/m.2b3475a7.png'
    },
    createdAt: new Date(Date.parse(new Date()) - (2 * 60 * 1000)).toISOString(),
    from: "Skylifesky",
    id: "3",
    lvl: 10,
    text: "Цена 1 сос = 0,1$ и цена не изменится",
  }
].forEach(item => {
  store.dispatch({
    type: 'ADD_msg',
    text: item
  })
})
ajax(()=>{
  let box = document.querySelector('.box')
  box.scrollTop = (box.scrollTop+550)
  // console.log( 'store', store.getState() )
}, 5);


const socket = io(store.getState()[0], {
  transports: ["websocket"],
  upgrade: false,
});

ReactDOM.render(
  <App socket={socket} />,
  document.getElementById('root')
);