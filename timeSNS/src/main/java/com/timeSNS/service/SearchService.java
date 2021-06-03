package com.timeSNS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.repository.TimelinecontentRepository;

@Service
public class SearchService {

	
	@Autowired
	private final TimelinecontentRepository timelinecontentRepository;
	
	public SearchService(TimelinecontentRepository timelinecontentRepository) {
		this.timelinecontentRepository = timelinecontentRepository;
	}

	
//----------------------------------------------------------------------------------------------------//	


//	타임라인 게시글 검색하기
	
}
