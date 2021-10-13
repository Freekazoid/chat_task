import {store} from '../store/saveMSG';
import axios from 'axios';
import chance from './chance';

var skip = 0,
    loading = false

export const ajax = function(callback=false, limit=10){
    if(!loading){
        loading = true
        
        axios.get(`https://test-chat-backend-hwads.ondigitalocean.app/api/messages?skip=${skip}&limit=${limit}`)
        .then(res => {
            const persons = res.data;
            persons.reverse()
            persons.forEach(item => {
                item.lvl = Math.floor(Math.random() * 11)
                item.attr = chance()
                item.mod = chance()  
            })
            store.dispatch({
                type: 'ADD_UP_msg',
                text: persons
            })
            // console.log( 'skip=>', skip, 'limit=>', limit )
            skip += limit
            loading = false
            callback?callback():null
        })
    }    
}