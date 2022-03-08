import React from 'react'
import cl from './MyModal.module.css'

export default function MyModal({title, children, visible, setVisible}) {
    const rootClasses = [cl.myModal]
    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(e) => e.stopPropagation()}>
                <h1 className={cl.title}>{title}</h1>
                {children}
            </div>
        </div>
    )
}
