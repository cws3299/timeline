package com.timeSNS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.repository.StaymemoryreviewRepository;

@Service
public class StayMemoryReviewService {

	@Autowired
	private final StaymemoryreviewRepository staymemoryreviewRepository;
	
	public StayMemoryReviewService(StaymemoryreviewRepository staymemoryreviewRepository) {
		this.staymemoryreviewRepository = staymemoryreviewRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	내가 머문 게시글에 머문 시간 남기기
	public void getSmrWrite(Staymemoryreview stayMemoryReview) {
		
		staymemoryreviewRepository.save(stayMemoryReview);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

}
