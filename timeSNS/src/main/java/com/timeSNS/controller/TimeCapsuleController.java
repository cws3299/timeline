package com.timeSNS.controller;


import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.TimeCapsuleDto;
import com.timeSNS.entity.Timecapsule;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimecapsuleRepository;
import com.timeSNS.service.TimeCapsuleService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/timecapsule")
public class TimeCapsuleController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private final TimeCapsuleService timecapsuleService;
	
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TimecapsuleRepository timecapsuleRepository;
	
	public TimeCapsuleController(UserService userService, TimeCapsuleService timecapsuleService) {
		this.userService = userService;
		this.timecapsuleService = timecapsuleService;
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임캡슐 리스트 메소드
	@PostMapping("/main")
	public List<Timecapsule> main(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Timecapsule> tcList = timecapsuleService.getTcList(midx, page);
		int[] pageList = timecapsuleService.getPageList(midx, page);
		System.out.println("tcList: " + tcList);
		
		return tcList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임캡슐 내용 확인 메소드
	@GetMapping("/detail")
	public Timecapsule detail(@RequestParam int tcidx) {
		
		Long tcidx_ = new Long(tcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();

//		TCIDX 값에 따라 데이터 가져오기
		Optional<Timecapsule> tcDetail_ = timecapsuleService.getTcDetail(tcidx_);
		Timecapsule tcDetail = tcDetail_.get();
		
//		확인여부 Y로 바꿔주기
		tcDetail.setTccheckyn("Y");
		timecapsuleRepository.save(tcDetail);
		
		return tcDetail;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임캡슐 작성 메소드
	@PostMapping("/write")
	public void write(@RequestBody TimeCapsuleDto timecapsuleDto) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		받아온 timecapsule json 파일에 작성자 인덱스와 작성시간, 확인여부(기본값 N) 넣어주기
		
		Timecapsule timecapsule = Timecapsule.builder()
			.midx(midx)
			.tcterm(LocalDate.parse(timecapsuleDto.getTcterm()))
			.tctitle(timecapsuleDto.getTctitle())
			.tccontent(timecapsuleDto.getTctitle())
			.tcthink(timecapsuleDto.getTcthink())
			.tccheckyn("N")
			.tcfeedback(timecapsuleDto.getTcfeedback())
			.tcregdate(LocalDateTime.now())
			.build();
		
//		내용 저장하기
		timecapsuleService.getTcWrite(timecapsule);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	피드백 작성 메소드
	@PostMapping("/feedback/{tcidx}")
	public void feedback(@PathVariable int tcidx, @RequestBody TimeCapsuleDto timecapsuleDto) {
		
		Long tcidx_ = new Long(tcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		TCIDX 값에 따라 데이터 가져오기
		Optional<Timecapsule> tcDetail_ = timecapsuleService.getTcDetail(tcidx_);
		Timecapsule tcDetail = tcDetail_.get();
		
//		feedback 내용 넣어주기
		tcDetail.setTcfeedback(timecapsuleDto.getTcfeedback());
		
//		변경내용 저장하기
		timecapsuleRepository.save(tcDetail);
		
	}
}
