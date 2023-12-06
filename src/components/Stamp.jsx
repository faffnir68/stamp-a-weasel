const Stamp = ({ scanCounter }) => {
    const stampItems = [];

    for (let i = 1; i <= 6; i++) {
        if (scanCounter === i) {
            stampItems.push(<li key={i} className="checked checked--first"></li>);
        } else if (scanCounter > i) {
            stampItems.push(<li key={i} className="checked"></li>);
        } else {
            stampItems.push(<li key={i}></li>);
        }
    }

    return <ul>{stampItems}</ul>;
};

export default Stamp;