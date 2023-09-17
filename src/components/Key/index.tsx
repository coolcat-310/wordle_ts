import React, { FC } from 'react';
import { useGameProvider } from '../../hooks/useGameProvider';
import { ActionKind, keyProps } from '../../types';



export const Key: FC<keyProps> = ({ keyVal, isBig=false, isDisabled=false }) => {
    const { dispatch } = useGameProvider();

    const onClickKey = () => {
        if(isDisabled) return;
        if(keyVal === "Enter" || keyVal === "ENTER") {
            dispatch({
                type: ActionKind.ON_ENTER,
            });
            return;
        }

        if(keyVal === "BACKSPACE" || keyVal === "Del") {
            dispatch({
                type: ActionKind.ON_BACKSPACE,
            });
            return;
        }

        dispatch({
            type: ActionKind.ON_CLICK,
            payload: {
                    keyVal,
            }
        });
    }

    return (
    <div className={`key ${isDisabled ? 'disabled' : ''}`} onClick={onClickKey}>
        {keyVal}
    </div>
    );
}

