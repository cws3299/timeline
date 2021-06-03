package com.timeSNS.service;

import java.time.LocalDateTime;
import java.util.List;

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

	
//	내가 머문 머문 게시글에 저장된 시간 중 가장 최근에 기록된 시간 불러오기
	public LocalDateTime getSmrDate(int tlcidx) {
		
		List<Staymemoryreview> smrDate_ = staymemoryreviewRepository.findByTlcidxOrderBySmrstaydateDesc(tlcidx);
		
		LocalDateTime smrDate = null;
		
		if(smrDate_.size() != 0) {
			smrDate = (smrDate_.get(0)).getSmrstaydate();
		}
		
		return smrDate;
	
	}

	
//----------------------------------------------------------------------------------------------------//	


//	내가 머문 게시글에 기록된 시간 목록 불러오기
	public List<Staymemoryreview> getSmrList(int tlcidx) {
		
		List<Staymemoryreview> smrDateList = staymemoryreviewRepository.findByTlcidxOrderBySmrstaydateDesc(tlcidx);
		
		return smrDateList;
	}
}
