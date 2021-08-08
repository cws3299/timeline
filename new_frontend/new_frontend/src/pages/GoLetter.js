import React, {useState,useEffect,useCallback} from 'react'
import NewNav from '../components/NewNav';
// import PostContent from '../components/Post/PostContent';
import GoLetterContent from '../components/GoLetter/GoLetterContent';
import './GoLetter.css'
import {useLocation} from "react-router";
import { config } from '../shared/config'
import axios from 'axios';


function GoLetter() {
    const location = useLocation();
    const go_idx = location.state.go_idx;  
    console.log(go_idx)

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const [lcategory , seTlcategory] = useState("")
    const [lcontent , seTlcontent] = useState("")
    // const [lidx , setState] = useState("")
    const [lidx_2 , seTlidx_2] = useState(0)
    const [lphoto , seTlphoto] = useState("")
    const [lreadyn , seTlreadyn] = useState("")
    const [lregdate , seTlregdate] = useState("")
    const [rmid , seTrmid] = useState("")
    const [rmidx , seTrmidx] = useState(0)
    const [rmnickname , seTrmnickname] = useState("")
    const [rmphoto , seTrmphoto] = useState(null)
    const [smid , seTsmid] = useState("")
    const [smidx , seTsmidx] = useState(0)
    const [smnickname , seTsmnickname] = useState("")
    const [smphoto , seTsmphoto] = useState(null)
    const [tlcidx , seTtlcidx] = useState(0)


    const sendQuery = useCallback(async () => {
        try {
          const res = await axios.get(`${url}/mailbox/detail?lidx=${go_idx}`,token)
          console.log('res',res)
          seTlcategory(res.data.lcategory)
          seTlcontent(res.data.lcontent)
          seTlidx_2(res.data.lidx_2)
          seTlphoto(res.data.lphoto)
          seTlreadyn(res.data.lreadyn)
          seTlregdate(res.data.lregdate)
          seTrmid(res.data.rmid)
          seTrmidx(res.data.rmidx)
          seTrmnickname(res.data.rmnickname)
          seTrmphoto(res.data.rmphoto)
          seTsmid(res.data.smid)
          seTsmidx(res.data.smidx)
          seTsmnickname(res.data.smnickname)
          seTsmphoto(res.data.smphoto)
          seTtlcidx(res.data.tlcidx)
        //   console.log('u',list)
        } catch (err) {
            console.log(err)
        }
      }, []);
    
      useEffect(() => {
        sendQuery();
      }, []);

      const data = {
        lcategory: lcategory,
        lcontent: lcontent,
        lidx: go_idx,
        lidx_2: lidx_2,
        lphoto: lphoto,
        lreadyn: lreadyn,
        lregdate: lregdate,
        rmid: rmid,
        rmidx: rmidx,
        rmnickname: rmnickname,
        rmphoto: rmphoto,
        smid: smid,
        smidx: smidx,
        smnickname: smnickname,
        smphoto: smphoto,
        tlcidx:tlcidx
      }


    return(
        <div className="GoLetter">
            <NewNav className = "GoLetterNewNav"/>
            <div className = "GoLetterBox">
                <div className = "GoLetterBox2">
                    <GoLetterContent data={data} />
                </div>
            </div>
        </div>
    )
}

export default GoLetter;