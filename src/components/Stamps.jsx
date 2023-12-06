import liff from "@line/liff";
import Stamp from "./Stamp"

const Stamps = ({ scanCounter }) => {
    const stampComponents = Array.from({ length: 1 }, (_, index) => (
        <Stamp key={index} scanCounter={scanCounter} />
    ));

    return (
        <div className="stamp-card-container">
            <div className="stamp-card">
                <h3 className="stamp-card-header">Stamp A Weasel</h3>
                <div className="stamps">
                    <ul>
                        {stampComponents}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Stamps;
