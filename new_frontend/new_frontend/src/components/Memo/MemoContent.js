import React , {useState, useEffect} from 'react'
import './MemoContent.css'


function MemoContent(data,memo) {
    // console.log('========================',data,memo)
// emotioncountdto: {tlcidx: 363, egoodyn: 0, efightingyn: 0, econgratulationyn: 0, eexpectyn: 0, …}
// mid: "google"
// midx: 51
// mnickname: "google"
// mphoto: "70065e1b-e271-4a58-b65e-a03465cb2806_이도현.jpg"
// tag: (2) ["", "ㅇㅇ"]
// tlccontent: "ㅇㅇ"
// tlcdate: "2021-08-10"
// tlcdelyn: "N"
// tlcemotion: null
// tlcidx: 363
// tlcimage: null
// tlcplace: "ㅇㅇ"
// tlcpubyn: "Y"
// tlcregdate: "2021-08-17T02:30:56"

    const [ddata,setDdata] = useState(null)
    const [mmemo,setMmemo] = useState(null)

    useEffect(()=>{
        console.log('+++',data)
        setDdata(data)
        // setMmemo(memo)
        console.log('------',ddata)
        return ()=> clearTimeout(setDdata)
        // console.log(mmemo)
    },[])

    return(
        <div> 
            
        </div>
    )
}

export default MemoContent;