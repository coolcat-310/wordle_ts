import React, {FC} from 'react';
import { keys1, keys2, keys3 } from '../../helpers';
import { Key } from '../Key';
import { useGameProvider } from '../../hooks/useGameProvider';

export const KeyBoard: FC = () => {
    const { state } = useGameProvider();

    const { disabledSet } = state;

    return <div className='keyboard'>
        <div className='line1'>
            {
                keys1.map((value, index) =>{
                    return <Key key={index} keyVal={value} isDisabled={disabledSet?.includes(value)}/>
                })
            }
        </div>
        <div className='line2'>
        {
                keys2.map((value, index) =>{
                    return <Key  key={index} keyVal={value} isDisabled={disabledSet?.includes(value)}/>
                })
            }
        </div>
        <div className='line3'>
            <Key keyVal="Enter"/>
        {
                keys3.map((value, index) =>{
                    return <Key  key={index} keyVal={value} isDisabled={disabledSet?.includes(value)}/>
                })
        }
         <Key keyVal="Del"/>
        </div>
    </div>;
}