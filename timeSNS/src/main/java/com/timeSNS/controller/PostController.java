package com.timeSNS.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.entity.Staymemory;
import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelinecontentRepository;
import com.timeSNS.service.StayMemoryReviewService;
import com.timeSNS.service.StayMemoryService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/post")
public class PostController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private TimeLineContentService timelinecontentService;
	private StayMemoryService staymemoryService;
	private StayMemoryReviewService staymemoryreviewService;
	
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TimelinecontentRepository timelinecontentRepository;
	
	public PostController(TimeLineContentService timelinecontentService, 
			StayMemoryService staymemoryService,
			StayMemoryReviewService staymemoryreviewService) {
		this.timelinecontentService = timelinecontentService;
		this.staymemoryService = staymemoryService;
		this.staymemoryreviewService = staymemoryreviewService;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
	public String postList() {
		return "postList";
	}
	
		
//----------------------------------------------------------------------------------------------------//	
	
	
//	타임라인 글 작성
	@PostMapping("/writepost/{tlidx}")
	public void writePost(@PathVariable int tlidx, @RequestBody Timelinecontent tlContent) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		tlContent.setTlidx(tlidx);
		tlContent.setMidx(midx);
		tlContent.setTlcregdate(LocalDateTime.now());
		tlContent.setTlcdelyn("N");
		
		timelinecontentRepository.save(tlContent);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
//	타임라인 글 수정
	@PostMapping("/modifypost/{tlcidx}")
	public void modifyPost(@PathVariable int tlcidx, @RequestBody Timelinecontent tlContent) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	특정 타임라인 가져오기
	@PostMapping("/detail/{tlcidx}")
	public String detail(@PathVariable int tlcidx) {
		
		Long tlcidx_ = new Long(tlcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		tlcidx 값에 따라 데이터 가져오기
		Optional<Timelinecontent> tlcDetail_ = timelinecontentService.getTlcDetail(tlcidx_);
		Timelinecontent tlcDetail = tlcDetail_.get();
		

		int tlcCount = staymemoryService.getTlcidxCount(tlcidx_);
		
//		staymemoryService의 인덱스 변수 값 초기 설정
		int smIdx = 0;
		
//		게시글 보는 사람과 게시글 게시한 사람 비교
		if(midx == tlcDetail.getMidx()) {
			
//			만약 한번도 확인한 적이 없다면(tlcCount가 0이라면) 확인한 게시글 목록에 추가
			if(tlcCount == 0) {
				Staymemory stayMemory = new Staymemory();
				stayMemory.setMidx(midx);
				stayMemory.setTlcidx(tlcidx);
				
				staymemoryService.getSmWrite(stayMemory);	
			}
			
//			확인한 게시글 목록의 인덱스 번호 찾기
			smIdx = ((staymemoryService.getSmDetail(tlcidx_)).getSmidx()).intValue();
			
			
//			확인한 게시글이 오늘 확인한 적이 없다면 확인 날짜 추가하기
			Staymemoryreview stayMemoryReview = new Staymemoryreview();
			stayMemoryReview.setSmidx(smIdx);
			stayMemoryReview.setTlcidx(tlcidx);
			stayMemoryReview.setSmrstaydate(LocalDateTime.now());
			staymemoryreviewService.getSmrWrite(stayMemoryReview);

			
		}
		
		return "detail";
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
	public String emotion() {
		return "emotion";
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
	@PostMapping("/review")
	public void review() {
		
	}

	
//----------------------------------------------------------------------------------------------------//	

	
	public String reviewList() {
		return "reviewList";
	}

	
//----------------------------------------------------------------------------------------------------//	

	
	public String note() {
		return "note";
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
	public String noteList() {
		return "noteList";
	}

	
//----------------------------------------------------------------------------------------------------//	

	
	public String noteListAdd() {
		return "noteListAdd";
	}

	
//----------------------------------------------------------------------------------------------------//	

	
	public String noteDetail() {
		return "noteDetail";
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
	public String modifyNote() {
		return "modifyNote";
	}
	
}
