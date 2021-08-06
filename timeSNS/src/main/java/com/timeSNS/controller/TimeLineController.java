package com.timeSNS.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.TimeLineMemberDto;
import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelineRepository;
import com.timeSNS.service.TimeLineService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/timeline")
public class TimeLineController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private TimeLineService timelineService;
	
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TimelineRepository timelineRepository;
	
	public TimeLineController(UserService userService, TimeLineService timelineService) {
		this.userService = userService;
		this.timelineService = timelineService;
	}

//----------------------------------------------------------------------------------------------------//	
	
	
//	해당 회원 작성 타임라인 목록 가져오기
	@PostMapping("/list")
	public List<TimeLineMemberDto> list(@RequestParam int midx, @RequestParam(defaultValue = "1") int page) {
		
		int midx_ = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<TimeLineMemberDto> tlList = null;
		
//		본인 작성 타임라인을 가져오는 경우
		if(midx == midx_) {
			
			tlList = timelineService.getMyTlList(midx, page);
			
//		타인 작성 타임라인을 가져오는 경우
		}else {
			
			tlList = timelineService.getTlList(midx, page);
			
		}
		
		return tlList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 생성 메소드
	@PostMapping("/createtime")
	public void createTime(@RequestBody Timeline timeline) {
	
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		받아온 timeline에 회원 인덱스, 삭제여부(기본값 N), 작성시간 넣어주기
		timeline.setMidx(midx);
		timeline.setTldelyn("N");
		timeline.setTlregdate(LocalDateTime.now());
		
//		받아온 timeline 저장하기
		timelineService.getTlWrite(timeline);
	
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 수정 메소드
	@PostMapping("/modifytime/{tlidx}")
	public void modifyTime(@PathVariable int tlidx, @RequestBody Timeline timeline) {
	
		Long tlidx_ = new Long(tlidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();	
		
		Timeline findTl = (timelineRepository.findById(tlidx_)).get();
		
		timeline.setMidx(midx);
		timeline.setTlregdate(findTl.getTlregdate());
		timeline.setTldelyn(findTl.getTldelyn());
		timeline.setTlidx(tlidx_);
		
		timelineRepository.save(timeline);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	타임라인 삭제 메소드
	@PostMapping("/deletetime/{tlidx}")
	public void deleteTime(@PathVariable int tlidx) {
		
		Long tlidx_ = new Long(tlidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();	
		
//		tcidx 값에 따라 데이터 가져오기
		Optional<Timeline> tlDetail_ = timelineService.getTlDetail(tlidx_);
		Timeline tlDetail = tlDetail_.get();
		
//		tldelyn 값 바꿔주기(Y 값);
		tlDetail.setTldelyn("Y");
		
//		변경내용 저장하기
		timelineRepository.save(tlDetail);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
}
