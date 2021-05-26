package com.timeSNS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.TimelineRepository;

@Service
public class TimeLineService {

	@Autowired
	private final TimelineRepository timelineRepository;

	public TimeLineService(TimelineRepository timelineRepository) {
		this.timelineRepository = timelineRepository;
	}
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 작성 메소드
	public void getTlWrite(Timeline timeline) {
		
		timelineRepository.save(timeline);
		
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
//	특정 타임라인 가져오기
	public Optional<Timeline> getTlDetail(Long tlidx) {
		
		Optional<Timeline> tlDetail = timelineRepository.findById(tlidx);
		
		return tlDetail;
		
	}
	
	
}
