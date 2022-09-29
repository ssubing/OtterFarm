export function forItem({part,partNum, data, len}) {
    const result = [];
    for(let i = 0; i < len; i++ ){
        result.push(<img src= {`${process.env.PUBLIC_URL}/assets/images/items/${part}/${partNum}_${data[i].number}_${data[i].rgb}_${data[i].rare}.png`}/>)
    }
    console.log("result"+result)
    console.log(part,partNum,data, len)
    return result;
}

