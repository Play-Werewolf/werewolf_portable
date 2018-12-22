import { Client } from 'colyseus.js'

window.client = null;

export const connect = () => {
    window.client = new Client("ws://10.0.0.22:3553/");
}