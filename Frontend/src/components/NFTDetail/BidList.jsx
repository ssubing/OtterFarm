
function BidList(props) {
    const bidLog = props.bidLog.map((bid) =>
        <tr className="bid-tr" key={bid}>
            <td>{bid.date}</td>
            <td>{bid.price}</td>
        </tr>
    )
    return(
        <div className="bid-log">
            <h3>{props.title}</h3>
            <div className="bid-title">
                <span>{props.time}</span>
                <span>{props.price}</span>
            </div>
            <hr/>
            <table>
                <tbody>{bidLog}</tbody>
            </table>
        </div>
    )
}

export default BidList;