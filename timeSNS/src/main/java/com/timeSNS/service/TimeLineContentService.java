package com.timeSNS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.TimelinecontentRepository;

@Service
public class TimeLineContentService {

	@Autowired
	private final TimelinecontentRepository timelinecontentRepository;
	
	public TimeLineContentService(TimelinecontentRepository timelinecontentRepository) {
		this.timelinecontentRepository = timelinecontentRepository;
	}
	
//----------------------------------------------------------------------------------------------------//

	
//	특정 포스트 가져오기
	public Optional<Timelinecontent> getTlcDetail(Long tlcidx) {
		
		Optional<Timelinecontent> tlcDetail = timelinecontentRepository.findById(tlcidx);
		
		return tlcDetail;
		
	}
	
}
