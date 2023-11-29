import liff from "@line/liff";

function Stamps() {
    return (
        <div className="stamp-card-container">
            <div className="stamp-card">
                <h3 className="stamp-card-header">Stamp A Weasel</h3>
                <div className="stamps">
                    <ul>
                        <li className="checked"></li>
                        <li className="checked checked--first"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Stamps