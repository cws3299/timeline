import React, { useState, useEffect, useCallback } from 'react'
import NewNav from '../components/NewNav';
// import PostContent from '../components/Post/PostContent';
import './BackLetter.css'
import {useLocation} from "react-router";
import axios from "axios";
import { config } from '../shared/config'
import BackLetterContent from '../components/BackLetter/BackLetterContent';

function BackLetter() {
    const location = useLocation();
    const lidx_2 = location.state.lidx_2;
    const [lcategory , setLcategory] = useState("")
    const [lcontent , setLcontent] = useState("")
    const [lidx , setLidx]= useState(null)
    // const [lidx_2 , setLidx_2] = useState(null)
    const [lphoto , setLphoto] = useState("")
    const [lreadyn , setLreadyn] = useState("")
    const [lregdate , setLregdate] = useState("")
    const [rmidx , setRmidx] = useState(null)
    const [smidx , setSmidx] = useState(null)
    const [tlcidx , setTlcidx] = useState(null)

    const url = config.api
    const _token = localStorage.getItem("token");
    let token = {
      headers: { Authorization: `Bearer ${_token}` },
    };

    const sendQuery = useCallback(async () =>{
        try{
            const res = await axios.get(`${url}/mailbox/detail?lidx=${lidx_2}`,token)
            console.log('res',res)
            const category = res.data.lcategory
            const content = res.data.lcontent
            const lidx1 = res.data.lidx_2
            const photo = res.data.lphoto
            const readyn = res.data.lreadyn
            const regdate = res.data.lregdate
            const rmidxx = res.data.rmidx
            const smidxx = res.data.smidx
            const tlcidxx = res.data.tlcidx
            await setLcategory(category)
            await setLcontent(content)
            await setLidx(lidx1)
            await setLphoto(photo)
            await setLreadyn(readyn)
            await setLregdate(regdate)
            await setRmidx(rmidxx)
            await setSmidx(smidxx)
            await setTlcidx(tlcidxx)
            // await setTimelines((prev) => [...prev, ...res.data])
        }catch (err){
            console.log(err)
        }

    },[])

    useEffect(() => {
        sendQuery();
      }, []);

    const data = {
        category: lcategory,
        content: lcontent,
        lidx1: lidx_2,
        lidx2: lidx,
        photo: lphoto,
        readyn: lreadyn,
        regdate: lregdate,
        rmidxx: rmidx,
        smidxx: smidx,
        tlcidxx: tlcidx,
    }   

    
    return(
        <div className="BackLetter">
            <NewNav className = "BackLetterNewNav"/>
            <div className = "BackLetterBox">
                <div className = "BackLetterBox2">
                    <BackLetterContent 
                    data = {data}
                    // lidx_2={lidx_2} lcategoty={lcategoty} lcontent={lcontent} lidx={lidx} lphoto={lphoto} 
                    // lreadyn={lreadyn} lregdate={lregdate} rmidx={rmidx} smidx={smidx} tlcidx={tlcidx}
                    />
                </div>
            </div>
        </div>
    )
}

export default BackLetter;