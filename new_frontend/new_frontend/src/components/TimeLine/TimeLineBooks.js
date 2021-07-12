import React from 'react'
import './TimeLineBooks.css'

function TimeLineBooks(data2){

    console.log('1111',data2.data2)
    const data = data2.data2

    return(
        <div className="component">
				<ul className="align">
					<li>
						<figure className='book'>

							<ul className='hardcover_front'>
								<li>
									<div className="coverDesign blue">
										<h1>{data.tltitle}</h1>
										<p>{data.tlcategory}</p>
									</div>
								</li>
								<li></li>
							</ul>


							<ul className='page'>
								<li></li>
								<li>
									<a className="btn" href="#">{data.tltitle}</a>
								</li>
								<li></li>
								<li></li>
								<li></li>
							</ul>


							<ul className='hardcover_back'>
								<li></li>
								<li></li>
							</ul>
							<ul className='book_spine'>
								<li></li>
								<li></li>
							</ul>
						</figure>
					</li>
				</ul>
			</div>
	
    )
}

export default TimeLineBooks;