package com.timeSNS.service;

import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.TimelineRepository;

public class TimeLineService {

	private TimelineRepository timelineRepository;

	
//----------------------------------------------------------------------------------------------------//	
	
	
	public void getTlWrite(Timeline timeline) {
		
		timelineRepository.save(timeline);
		
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
}
