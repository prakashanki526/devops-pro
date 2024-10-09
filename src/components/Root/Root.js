import React from 'react';
import styles from './Root.module.css';

const Root = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                Select a folder to view files
            </div>
        </div>
    );
};

export default Root;