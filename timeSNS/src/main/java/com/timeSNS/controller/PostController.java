package com.timeSNS.controller;

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

import com.timeSNS.entity.Notememory;
import com.timeSNS.entity.Staymemory;
import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelinecontentRepository;
import com.timeSNS.service.NoteMemoryService;
import com.timeSNS.service.PostTagService;
import com.timeSNS.service.StayMemoryReviewService;
import com.timeSNS.service.StayMemoryService;
import com.timeSNS.service.TagService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/post")
public class PostController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private TimeLineContentService timelinecontentService;
	private StayMemoryService staymemoryService;
	private StayMemoryReviewService staymemoryreviewService;
	private NoteMemoryService notememoryService;
	private TagService tagService;
	private PostTagService posttagService;
	
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TimelinecontentRepository timelinecontentRepository;
	
	public PostController(TimeLineContentService timelinecontentService, 
			StayMemoryService staymemoryService,
			StayMemoryReviewService staymemoryreviewService,
			NoteMemoryService notememoryService,
			TagService tagService,
			PostTagService posttagService) {
		this.timelinecontentService = timelinecontentService;
		this.staymemoryService = staymemoryService;
		this.staymemoryreviewService = staymemoryreviewService;
		this.notememoryService = notememoryService;
		this.tagService = tagService;
		this.posttagService = posttagService;
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
		
		
//		타임라인 인덱스, 회원 인덱스, 작성시각, 삭제여부 저장해주기 
		tlContent.setTlidx(tlidx);
		tlContent.setMidx(midx);
		tlContent.setTlcregdate(LocalDateTime.now());
		tlContent.setTlcdelyn("N");
		
		String tlcTag_ = tlContent.getTlctag();
		
//		태그 테이블에 입력해주기
		if(tlcTag_ != null) {
			String[] tlcTag = tlcTag_.split("#");
			tagService.getTagWrite(tlcTag);
			List tidxList = tagService.getTagList(tlcTag);
			posttagService.getPtWrite(tidxList, midx);
		}
		
		
		
		timelinecontentRepository.save(tlContent);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
//	타임라인 글 수정
	@PostMapping("/modifypost/{tlcidx}")
	public void modifyPost(@PathVariable int tlcidx, @RequestBody Timelinecontent tlContent) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	특정 타임라인 게시글 가져오기
	@PostMapping("/detail/{tlcidx}")
	public Timelinecontent detail(@PathVariable int tlcidx) {
		
		Long tlcidx_ = new Long(tlcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		tlcidx 값에 따라 데이터 가져오기
		Optional<Timelinecontent> tlcDetail_ = timelinecontentService.getTlcDetail(tlcidx_);
		Timelinecontent tlcDetail = tlcDetail_.get();
		
//		해당 타임라인에 게시글을 몇개나 작성했는지 확인
		int tlcCount = staymemoryService.getTlcidxCount(tlcidx);
		
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
			smIdx = ((staymemoryService.getSmDetail(tlcidx)).getSmidx()).intValue();
//			확인한 게시글의 가장 최근 확인 날짜 찾기
			LocalDateTime smrDate = staymemoryreviewService.getSmrDate(tlcidx);
			
//			확인한 게시글이 오늘 확인한 적이 없다면 확인 날짜 추가하기
			if(smrDate == null || smrDate.isBefore(LocalDateTime.now())) {
			
				Staymemoryreview stayMemoryReview = new Staymemoryreview();
				stayMemoryReview.setSmidx(smIdx);
				stayMemoryReview.setTlcidx(tlcidx);
				stayMemoryReview.setSmrstaydate(LocalDateTime.now());
				staymemoryreviewService.getSmrWrite(stayMemoryReview);

			}
		}
		
		return tlcDetail;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
	public String emotion() {
		return "emotion";
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	추억 다시 본 날짜 목록 불러오기
	@GetMapping("/reviewlist")
	public List<Staymemoryreview> reviewList(@RequestParam int tlcidx) {
		
		List<Staymemoryreview> smrDateList = staymemoryreviewService.getSmrList(tlcidx);
		
		return smrDateList;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	추억에 쪽지 남겨두기
	@PostMapping("/note")
	public void note(@RequestParam int tlcidx, @RequestBody Notememory notememory) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		notememory.setTlcidx(tlcidx);
		notememory.setMidx(midx);
		notememory.setNmregdate(LocalDateTime.now());
		
		notememoryService.getNmWrite(notememory);
		
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

	
//	추억에 남겨둔 쪽지 자세히 보기
	@GetMapping("/notedetail")
	public Notememory noteDetail(@RequestParam int nmidx) {
		
		Long nmidx_ = new Long(nmidx);
		Optional<Notememory> nmDetail_ = notememoryService.getNmDetail(nmidx_);
		Notememory nmDetail = nmDetail_.get();
		
		return nmDetail;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

		
	public String modifyNote() {
		return "modifyNote";
	}
	
}
