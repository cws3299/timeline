package com.timeSNS.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.entity.Timecapsule;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimecapsuleRepository;
import com.timeSNS.service.TimeCapsuleService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@Controller
@RequestMapping("/timecapsule")
public class TimeCapsuleController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private TimeCapsuleService timecapsuleService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public TimeCapsuleController(UserService userService, TimeCapsuleService timecapsuleService) {
		this.userService = userService;
		this.timecapsuleService = timecapsuleService;
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
	@PostMapping("/main")
	public String main(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Timecapsule> tcList = timecapsuleService.getTcList(midx, page);
		int[] pageList = timecapsuleService.getPageList(midx, page);
		System.out.println("tcList: " + tcList);
		
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	@GetMapping("/detail")
	public String detail(@RequestParam int tcidx_) {
		
		Long tcidx = new Long(tcidx_);
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		Optional<Timecapsule> tcDetail_ = timecapsuleService.getTcDetail(tcidx);
		Timecapsule tcDetail = tcDetail_.get();
		
		return "main";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	@PostMapping("/write")
	public void write(@RequestBody Timecapsule timecapsule) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		timecapsule.setMidx(midx);
		timecapsuleService.getTcWrite(timecapsule);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	@PostMapping("/feedback")
	public String feedback() {
		
		return "feedback";
	}
}
