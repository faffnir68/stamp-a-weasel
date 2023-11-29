import liff from "@line/liff";
import Stamp from "./Stamp"

const Stamps = (({scanCounter}) => {
    return (
        <div className="stamp-card-container">
            <div className="stamp-card">
                <h3 className="stamp-card-header">Stamp A Weasel</h3>
                <div className="stamps">
                    <ul>
                        <Stamp scanCounter={scanCounter} />
                        <Stamp scanCounter={scanCounter} />
                        <Stamp scanCounter={scanCounter} />
                        <Stamp scanCounter={scanCounter} />
                        <Stamp scanCounter={scanCounter} />
                        {/* <li className="checked"></li>
                        <li className="checked checked--first"></li>
                        {scanCounter === 3 ? <li className="checked--first"></li> : <li></li> }
                        <li></li>
                        <li></li> */}
                    </ul>
                </div>
            </div>
        </div>
    )
})

export default Stamps