import './TotalBalance.css';

type TotalBalanceProps = {
    total: string,
    currency: string;
}

const TotalBalance = ({ total, currency }: TotalBalanceProps) => {
    return (
        <div className="total-balance">
            <h3 className="widget-title">Total Balance</h3>
            <span>{currency}{total}</span>
        </div>
    );
}

export default TotalBalance;