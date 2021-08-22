import React , {useState , useEffect} from 'react'
import NewNav from '../components/NewNav';
// import MemoContent from '../components/Memo/MemoContent';
import './Memo.css'
import {useLocation} from "react-router";
import { config } from '../shared/config'
import axios from 'axios';
import PostButton from '../components/PostButton';
import TimeCapsulebutton from '../components/TimeCapsulebutton.js';
import TimeLineCreateButton from '../components/TimeLineCreateButton';


function Memo() {
    const location = useLocation();
    const tlcidx = location.state.tlcidx; 
    const [data , setData] = useState(null)
    const [memo, setMemo] = useState(null)
    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    // console.log(tlcidx)

    const sendQuery = async() => {
        try {
        //   console.log('====================')
          const res = await axios.post(`${url}/post/detail/${tlcidx}`,null,token)
          await setData(res.data)
        //   console.log('--}}',data)
        //   console.log('res',data)
          const res2 =  await axios.post(`${url}/post/note/list/${tlcidx}`,null,token)
          // console.log('res2',res2)
          await setMemo(res2.data)
        //   console.log('=================================',memo)
        } catch (err) {
            console.log(err)
        }
      };

    useEffect(()=>{
        // console.log('===')
        sendQuery()

    })


    return(
        <div className="Memo">
            <NewNav className = "PostNewNav"/>
            <div className = "MemoBox">
                <div className = "MemoBox2">
                    {/* {data.tlcidx} */}
                </div>
            </div>
            < TimeLineCreateButton />
            < TimeCapsulebutton />
            < PostButton />
        </div>
    )

}

export default Memo;