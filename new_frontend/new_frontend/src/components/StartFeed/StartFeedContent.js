import React, {useEffect, useState} from 'react'
import './StartFeedContent.css'
import LinesEllipsis from 'react-lines-ellipsis'
import {imageConfig} from '../../shared/imageConfig'

function StartFeedContent(data) {


    const useData = data.data
    console.log('data',data.data)
    const [img, setImg] = useState("https://usagi-post.com/wp-content/uploads/2020/05/no-image-found-360x250-1.png")
    const image_url = imageConfig.src
    const tagg = useData.tag.slice(undefined) 
    const tag = tagg.join('#')
    const [useElipsis, setUseElipsis] = useState(true);

    useEffect(async()=>{
            if (data.data.tlcimage !== null){
                console.log(image_url)
                console.log('===',data.data.mphoto)
                await setImg('data:image/png;base64,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')
                console.log('pppppppp',img)
            }
        })
    if(useData.tlcimage === null){
        return(
            <div className="StartFeedContent1">
                <div className="StartFeedContent1Box">
                    <div className = "StartFeedContent1BoxImg" style={{
                        backgroundImage: `url(${img})`
                    }}>

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