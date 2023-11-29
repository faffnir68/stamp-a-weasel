const Stamp = ({scanCounter}) => {
    for(let i = 0; i > scanCounter; i++) {
        if(scanCounter === i) {
            return <li className="checked checked--first"></li>
        }
        if(scanCounter > i) {
            return <li className="checked"></li>
        }
        return <li></li>
    }
}

export default Stamp