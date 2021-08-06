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
	
	
//	���엫罹≪뒓 由ъ뒪�듃 硫붿냼�뱶
	@PostMapping("/main")
	public List<Timecapsule> main(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Timecapsule> tcList = timecapsuleService.getTcList(midx, page);
//		int[] pageList = timecapsuleService.getPageList(midx, page);
		System.out.println("tcList: " + tcList);
		
		return tcList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	���엫罹≪뒓 �궡�슜 �솗�씤 硫붿냼�뱶
	@GetMapping("/detail")
	public Timecapsule detail(@RequestParam int tcidx) {
		
		Long tcidx_ = new Long(tcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();

//		TCIDX 媛믪뿉 �뵲�씪 �뜲�씠�꽣 媛��졇�삤湲�
		Optional<Timecapsule> tcDetail_ = timecapsuleService.getTcDetail(tcidx_);
		Timecapsule tcDetail = tcDetail_.get();
		
//		�솗�씤�뿬遺� Y濡� 諛붽퓭二쇨린
		tcDetail.setTccheckyn("Y");
		timecapsuleRepository.save(tcDetail);
		
		return tcDetail;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	���엫罹≪뒓 �옉�꽦 硫붿냼�뱶
	@PostMapping("/write")
	public void write(@RequestBody TimeCapsuleDto timecapsuleDto) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		諛쏆븘�삩 timecapsule json �뙆�씪�뿉 �옉�꽦�옄 �씤�뜳�뒪�� �옉�꽦�떆媛�, �솗�씤�뿬遺�(湲곕낯媛� N) �꽔�뼱二쇨린
		
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
		
//		�궡�슜 ���옣�븯湲�
		timecapsuleService.getTcWrite(timecapsule);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	�뵾�뱶諛� �옉�꽦 硫붿냼�뱶
	@PostMapping("/feedback/{tcidx}")
	public void feedback(@PathVariable int tcidx, @RequestBody TimeCapsuleDto timecapsuleDto) {
		
		Long tcidx_ = new Long(tcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		TCIDX 媛믪뿉 �뵲�씪 �뜲�씠�꽣 媛��졇�삤湲�
		Optional<Timecapsule> tcDetail_ = timecapsuleService.getTcDetail(tcidx_);
		Timecapsule tcDetail = tcDetail_.get();
		
//		feedback �궡�슜 �꽔�뼱二쇨린
		tcDetail.setTcfeedback(timecapsuleDto.getTcfeedback());
		
//		蹂�寃쎈궡�슜 ���옣�븯湲�
		timecapsuleRepository.save(tcDetail);
		
	}
}
