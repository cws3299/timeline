package com.timeSNS.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.entity.Letter;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.LetterService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/mailbox")
public class MailBoxController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private TimeLineContentService timelinecontentService;
	private LetterService letterService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public MailBoxController(UserService userService,
							TimeLineContentService timelinecontentService,
							LetterService letterService) {
		this.userService = userService;
		this.timelinecontentService = timelinecontentService;
		this.letterService = letterService;
	}
	

//----------------------------------------------------------------------------------------------------//
	
//	받은 편지함 현재 페이지에 맞게 목록 불러오기
	@PostMapping("/reception")
	public List<Letter> reception(@RequestParam int rmidx, @RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Letter> rlList = letterService.getRlList(rmidx, page);
		
		
		return rlList;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	보낸 편지함 현재 페이지에 맞게 목록 불러오기
	@PostMapping("/send")
	public List<Letter> send(@RequestParam int smidx, @RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Letter> slList = letterService.getSlList(smidx, page);
		
		
		return slList;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	편지 선택 후 자세히 보기(읽기)
	@GetMapping("/detail")
	public Letter detail(@RequestParam int lidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		편지 내용 가져오기
		Letter letter = letterService.getLetterDetail(lidx);
		
//		편지 확인 여부 Y로 바꿔주기
		letter.setLreadyn("Y");
		letterService.getLetterWrite(letter);
		
		return letter;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	편지 보내기
	@PostMapping("/sending")
	public void sending(@RequestParam int tlcidx, @RequestBody Letter letter) {
		
//		이때 midx는 smidx(보낸사람 인덱스)
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		Long tlcidx_ = new Long(tlcidx);
			
//		편지 받는 사람 인덱스
		int rmidx = ((timelinecontentService.getTlcDetail(tlcidx_)).get()).getMidx();
		
		Letter letter_ = Letter.builder()
			.tlcidx(tlcidx)
			.smidx(midx)
			.rmidx(rmidx)
			.lregdate(LocalDateTime.now())
			.lcontent(letter.getLcontent())
			.lreadyn("N")
			.lcategory(letter.getLcategory())
			.lphoto(letter.getLphoto())
			.build();

//		편지 보내기
		letterService.getLetterWrite(letter_);
		

		
	}
	
	
//----------------------------------------------------------------------------------------------------//

	
//	답장 보내기
	@PostMapping("/reply")
	public void reply(@RequestParam int lidx, @RequestBody Letter letter) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		기존 편지 불러오기
		Letter letter_ = letterService.getLetterDetail(lidx);
		
//		기존 편지에서 게시글 번호와 받는 사람 인덱스 가져오기
		int tlcidx = letter_.getTlcidx();
		int rmidx = letter_.getRmidx();
		
		Letter letter_2 = Letter.builder()
			.tlcidx(tlcidx)
			.lidx_2(lidx)
			.smidx(midx)
			.rmidx(rmidx)
			.lregdate(LocalDateTime.now())
			.lcontent(letter.getLcontent())
			.lreadyn("N")
			.lcategory(letter.getLcategory())
			.lphoto(letter.getLphoto())
			.build();
		
//		편지 보내기
		letterService.getLetterWrite(letter_2);
	}
		

}
