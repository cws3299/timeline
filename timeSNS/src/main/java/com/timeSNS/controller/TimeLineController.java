package com.timeSNS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.TimeLineService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@Controller
@RequestMapping("/timeline")
public class TimeLineController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private TimeLineService timelineService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public TimeLineController(UserService userService, TimeLineService timelineService) {
		this.userService = userService;
		this.timelineService = timelineService;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	@PostMapping("/list")
	public String list() {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		
		
		return "list";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	public String listAdd() {
		return "listAdd";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 생성 메소드
	@PostMapping("/createtime")
	public String createTime(@RequestBody Timeline timeline) {
	
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		timeline.setMidx(midx);
		timelineService.getTlWrite(timeline);
	
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	public String createTime() {
		return "createTime";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 수정 메소드
	@PostMapping("/modifytime")
	public String modifyTime(@RequestBody Timeline timeline) {
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	public String modifyTime() {
		return "modifyTime";
	}
	
}
