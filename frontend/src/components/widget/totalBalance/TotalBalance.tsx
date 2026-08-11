import './TotalBalance.css';

type TotalBalanceProps = {
    total: string,
    currency: string;
}

const TotalBalance = ({ total, currency }: TotalBalanceProps) => {
    const numericTotal = parseFloat(total || "0");
    const isNegative = numericTotal < 0;

    return (
        <div className="total-balance">
            <h3 className="widget-title">Total Balance</h3>
            <span style={{ color: isNegative ? '#ff4961' : 'inherit' }}>
                {currency}{total}
            </span>
        </div>
    );
}

export default TotalBalance;