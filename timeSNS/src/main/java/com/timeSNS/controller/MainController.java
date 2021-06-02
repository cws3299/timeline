package com.timeSNS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/main")
public class MainController {
	
	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private TimeLineContentService timelinecontentService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public MainController(TimeLineContentService timelinecontentService) {
		this.timelinecontentService = timelinecontentService;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	메인 피드 페이지 불러오기
	@GetMapping("/feed")
	public List<Timelinecontent> Main(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Timelinecontent> tlcList = timelinecontentService.getMainFeed(midx, page);
		
		return tlcList;
	}
	
}
