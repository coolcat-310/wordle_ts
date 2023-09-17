import React, { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { useGameProvider } from '../../hooks/useGameProvider';
import { ActionKind } from '../../types';

export const Notification: FC = () => {
    const { dispatch } = useGameProvider();
    const [showNotification, setShowNotification] = useState(true);

    const handleAnimationComplete = () => {
        // Dispatch the CLEAR_ERROR action when the animation is complete
        dispatch({ type: ActionKind.CLEAR_ERROR });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowNotification(false);
        }, 5000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div className="container">
            <AnimatePresence>
                {showNotification && (
                    <motion.div
                        className="notification"
                        initial={{ opacity: 0, x: 300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 300 }}
                        transition={{ duration: 1 }}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        Word is not valid, Please try Again.
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
