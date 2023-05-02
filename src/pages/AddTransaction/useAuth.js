import React, { useState } from "react";


export const useAuth = () =>{
    const [authed, setAuthed] =  useState(false);

return{
    authed,
    login(){
       return new Promise((resolve)=>{
        setAuthed(true);
        resolve();
       })
    }
    ,
    logout(){
        return new Promise((resolve)=>{
            setAuthed(false);
            resolve();
        })
    }
}
}
