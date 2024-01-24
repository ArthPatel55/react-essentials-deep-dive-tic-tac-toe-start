import React, { useState } from 'react';
export default function Player({initialName,symbol,isActive}){
    const [palyerName,setPlayerName]= useState(initialName);
    const [isEditing,setEditing] = useState(false);
    function handleEditClick(){
        setEditing((editing=> !editing));
        // setEditing(!isEditing); 
    }
    function HandleChange(event){
        setPlayerName(event.target.value);
    }
    let editPalyerName=<span className="player-name">{palyerName}</span>;
    //  let btnCaption ="Edit";
    if(isEditing){
        editPalyerName=<input type="text" required value={palyerName} onChange={HandleChange} />
        // btnCaption ="Save";
    }
    return(
        <li className={isActive?'active':undefined}>
        <span className="player">
            {editPalyerName}
          {/* <spam className="player-name">{name}</spam> */}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleEditClick}>{isEditing?'Save':'Edit'}</button>
        </li>
    )
}