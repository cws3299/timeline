import React from 'react'
import './SearchPostCard.css'

function SearchPostCard(props){
    console.log('ppppppppppppppppppppppppppppppppp',props)
    return(
        <div className="SearchPostCard">
            {props.props.mid}
        </div>
    )
}

export default SearchPostCard;