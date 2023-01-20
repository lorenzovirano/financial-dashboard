import './Table.css';

type tableItemProps = {
    title: string,
    recipient: string,
    value: number,
    outflow: boolean,
    currency: string
}


const TableItem = ({title, value, recipient, outflow, currency}: tableItemProps) => {
    return (
        <div className='table-item'>
            <div className="table-item__left">
                <span className="table-item__title">{title}</span>
                <span className="table-item__recipient">{recipient}</span>
            </div>
            <div className="table-item__right">
                <span className={`table-item__value ${outflow ? ('exit') : ('enter')}`}>{outflow ? ('-') : ('')}{currency}{value}</span>
            </div>
        </div>
    )
}

export default TableItem;