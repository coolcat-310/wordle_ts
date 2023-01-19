import React, {FC} from 'react';
import {Letter} from "../Letter";



export const Board: FC = () => {

    return (
        <div className="board">
            <div className="row">
                <Letter key="00" letterPosition={0} attemptValue={0}/>
                <Letter key="10" letterPosition={1} attemptValue={0}/>
                <Letter key="20" letterPosition={2} attemptValue={0}/>
                <Letter key="30" letterPosition={3} attemptValue={0}/>
                <Letter key="40" letterPosition={4} attemptValue={0}/>
            </div>
            <div className="row">
                <Letter key="01" letterPosition={0} attemptValue={1}/>
                <Letter key="11" letterPosition={1} attemptValue={1}/>
                <Letter key="21" letterPosition={2} attemptValue={1}/>
                <Letter key="31" letterPosition={3} attemptValue={1}/>
                <Letter key="41" letterPosition={4} attemptValue={1}/>
            </div>
            <div className="row">
                <Letter key="02" letterPosition={0} attemptValue={2}/>
                <Letter key="12" letterPosition={1} attemptValue={2}/>
                <Letter key="22" letterPosition={2} attemptValue={2}/>
                <Letter key="32" letterPosition={3} attemptValue={2}/>
                <Letter key="42" letterPosition={4} attemptValue={2}/>
            </div>
            <div className="row">
                <Letter key="03" letterPosition={0} attemptValue={3}/>
                <Letter key="13" letterPosition={1} attemptValue={3}/>
                <Letter key="23" letterPosition={2} attemptValue={3}/>
                <Letter key="33" letterPosition={3} attemptValue={3}/>
                <Letter key="43" letterPosition={4} attemptValue={3}/>
            </div>
            <div className="row">
                <Letter key="04" letterPosition={0} attemptValue={4}/>
                <Letter key="14" letterPosition={1} attemptValue={4}/>
                <Letter key="24" letterPosition={2} attemptValue={4}/>
                <Letter key="34" letterPosition={3} attemptValue={4}/>
                <Letter key="44" letterPosition={4} attemptValue={4}/>
            </div>
        </div>
    )
}
