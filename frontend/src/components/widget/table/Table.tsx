import React from 'react';
import './Table.css';

type tableProps = {
    children: React.ReactNode;
}

const Table = ({children}: tableProps) => {
    return(
       <div className='table'>
            {children}
       </div>
    )
}

export default Table;