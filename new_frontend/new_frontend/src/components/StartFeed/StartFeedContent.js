import React, {useState} from 'react'
import './StartFeedContent.css'
import LinesEllipsis from 'react-lines-ellipsis'

function StartFeedContent(data) {


    const useData = data.data
    console.log('data',data)
    const tagg = useData.tag.slice(undefined) 
    const tag = tagg.join('#')
    const [useElipsis, setUseElipsis] = useState(true);
    if(useData.tlcimage === null){
        return(
            <div className="StartFeedContent1">
                <div className="StartFeedContent1Box">
                    <div className = "StartFeedContent1BoxImg">

                    </div>
                    <div className = "StartFeedContent1BoxTag">
                        {tag}
                    </div>
                    <div className = "StartFeedContent1BoxMeta">
                        <div className = "StartFeedContentDate">
                            {useData.tlcplace}
                        </div>
                        <div className = "StartFeedContentPlace">
                            {useData.tlcdate}
                        </div>
                    </div>
                </div>
                <div className="StartFeedContent1Content">
                    <div className="StartFeedContent1ContentName">
                        <img src="https://spnimage.edaily.co.kr/images/Photo/files/NP/S/2020/11/PS20112100014.jpg" className="StartFeed1avatarImage" />
                        {useData.mnickname}
                    </div>
                    <div className="StartFeedContent1ContentContent">
                        {useElipsis ? (
                            <LinesEllipsis
                            text={useData.tlccontent}
                            maxLine="10"
                            ellipsis={
                                <span style={{ color: "black" , fontSize:'0.5rem'}} onClick={() => setUseElipsis(false)}>
                                ...더보기
                                </span>
                            }
                            trimRight
                            basedOn="letters"
                            />
                        ) : (
                            <>
                            {data.tlccontent}
                            <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                                닫기
                            </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        )
    }else{
        return(
            <div className="StartFeedContent2">
                {/* <div className="StartFeedContent1Box">
                    <div className = "StartFeedContent1BoxImg">

                    </div>
                    <div className = "StartFeedContent1BoxTag">
                        {tag}
                    </div>
                    <div className = "StartFeedContent1BoxMeta">
                        <div className = "StartFeedContentDate">
                            {useData.tlcplace}
                        </div>
                        <div className = "StartFeedContentPlace">
                            {useData.tlcdate}
                        </div>
                    </div>
                </div>
                <div className="StartFeedContent1Content">
                    <div className="StartFeedContent1ContentName">
                        <img src="http://itimg.chosun.com/sitedata/image/202101/26/2021012602572_0.jpg" className="StartFeed1avatarImage" />
                        {useData.mnickname}
                    </div>
                    <div className="StartFeedContent1ContentContent">
                        {useElipsis ? (
                            <LinesEllipsis
                            text={useData.tlccontent}
                            maxLine="10"
                            ellipsis={
                                <span style={{ color: "black" , fontSize:'0.5rem'}} onClick={() => setUseElipsis(false)}>
                                ...더보기
                                </span>
                            }
                            trimRight
                            basedOn="letters"
                            />
                        ) : (
                            <>
                            {data.tlccontent}
                            <span style={{ color: "black" , fontSize:'0.5rem' }} onClick={() => setUseElipsis(true)}>
                                닫기
                            </span>
                            </>
                        )}
                    </div>
                </div> */}
            </div>
        )
    }
}

export default StartFeedContent;