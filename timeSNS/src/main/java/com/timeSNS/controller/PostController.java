package com.timeSNS.controller;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
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

import com.timeSNS.dto.EmotionCountDto;
import com.timeSNS.dto.PostDto;
import com.timeSNS.entity.Emotion;
import com.timeSNS.entity.Notememory;
import com.timeSNS.entity.Posttag;
import com.timeSNS.entity.Staymemory;
import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelinecontentRepository;
import com.timeSNS.service.EmotionService;
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
	private EmotionService emotionService;
	
	@Autowired
	private MemberRepository memberRepository;
	@Autowired
	private TimelinecontentRepository timelinecontentRepository;
	
	public PostController(TimeLineContentService timelinecontentService, 
			StayMemoryService staymemoryService,
			StayMemoryReviewService staymemoryreviewService,
			NoteMemoryService notememoryService,
			TagService tagService,
			PostTagService posttagService,
			EmotionService emotionService) {
		this.timelinecontentService = timelinecontentService;
		this.staymemoryService = staymemoryService;
		this.staymemoryreviewService = staymemoryreviewService;
		this.notememoryService = notememoryService;
		this.tagService = tagService;
		this.posttagService = posttagService;
		this.emotionService = emotionService;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

//	해당 타임라인 게시글 목록 가져오기
	@PostMapping("/list/{tlidx}")
	public List<PostDto> postList(@PathVariable int tlidx, @RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		해당 타임라인에 속하는 게시글 가져오기
		List<Timelinecontent> tlcList = timelinecontentService.getTlcList(tlidx, page);

//		각 게시글 넣어줄 PostDto 리스트
		List<PostDto> postDtoList = new ArrayList<PostDto>();
		
		for(int i = 0 ; i < tlcList.size() ; i++) {
			int tlcidx = ((tlcList.get(i)).getTlcidx()).intValue();

//			각 게시글에 해당되는 감정 개수
			EmotionCountDto emotionCountDto = emotionService.getEmotionCount(tlcidx);

//			해당 게시글에 적용되는 태그 가져오기
//			게시글에 적용되는 태그의 인덱스 번호 가져오기
			List tagIdxList = posttagService.getTagIdxList(tlcidx);
//			인덱스 번호에 해당하는 태그 내용 가져오기
			List<String> tagList = tagService.getTagCList(tagIdxList);
			
//			PostDto에 게시글 내용, 감정, 태그 합쳐주기
			PostDto postDto = PostDto.builder()
					.tlcidx((tlcList.get(i)).getTlcidx())
					.tlidx((tlcList.get(i)).getTlidx())
					.midx(midx)
					.tlcregdate((tlcList.get(i)).getTlcregdate())
					.tlcdate((tlcList.get(i)).getTlcdate())
					.tlcplace((tlcList.get(i)).getTlcplace())
					.tlcimage((tlcList.get(i)).getTlcimage())
					.tlccontent((tlcList.get(i)).getTlccontent())
					.tlcemotion((tlcList.get(i)).getTlcemotion())
					.tlcpubyn((tlcList.get(i)).getTlcpubyn())
					.tlcdelyn((tlcList.get(i)).getTlcdelyn())
					.emotioncountdto(emotionCountDto)
					.tag(tagList)
					.build();
			
//			목록에 PostDto 넣어주기
			postDtoList.add(postDto);
		}
		
		return postDtoList;
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
		
		timelinecontentRepository.save(tlContent);
		
		String tlcTag_ = tlContent.getTlctag();
		
//		태그 테이블에 입력해주기
		if(tlcTag_ != null) {
			String[] tlcTag = tlcTag_.split("#");
			tagService.getTagWrite(tlcTag);
			List tidxList = tagService.getTagList(tlcTag);
			
//			바로 직전에 저정한 게시글 인덱스 번호 가져오기
			int tlcidx = timelinecontentService.getTlcIdx(tlidx);
			
			posttagService.getPtWrite(tidxList, tlcidx);
		}
		
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
	public PostDto detail(@PathVariable int tlcidx) {
		
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
			if(smrDate == null || (LocalDate.from(smrDate)).isBefore(LocalDate.now())) {
				Staymemoryreview stayMemoryReview = new Staymemoryreview();
				stayMemoryReview.setSmidx(smIdx);
				stayMemoryReview.setTlcidx(tlcidx);
				stayMemoryReview.setSmrstaydate(LocalDateTime.now());
				staymemoryreviewService.getSmrWrite(stayMemoryReview);

			}
		}
		
		
//		해당 게시글 감정 개수 가져오기
		EmotionCountDto emotionCountDto = emotionService.getEmotionCount(tlcidx);
		
//		해당 게시글에 적용되는 태그 가져오기
//		게시글에 적용되는 태그의 인덱스 번호 가져오기
		List tagIdxList = posttagService.getTagIdxList(tlcidx);
//		인덱스 번호에 해당하는 태그 내용 가져오기
		List<String> tagList = tagService.getTagCList(tagIdxList);
		
//		Dto에 넣어주기
		PostDto postDto = PostDto.builder()
				.tlcidx(tlcDetail.getTlcidx())
				.tlidx(tlcDetail.getTlidx())
				.midx(midx)
				.tlcregdate(tlcDetail.getTlcregdate())
				.tlcdate(tlcDetail.getTlcdate())
				.tlcplace(tlcDetail.getTlcplace())
				.tlcimage(tlcDetail.getTlcimage())
				.tlccontent(tlcDetail.getTlccontent())
				.tlcemotion(tlcDetail.getTlcemotion())
				.tlcpubyn(tlcDetail.getTlcpubyn())
				.tlcdelyn(tlcDetail.getTlcdelyn())
				.emotioncountdto(emotionCountDto)
				.tag(tagList)
				.build();
		
		return postDto;
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

//	추억에 남긴 쪽지 목록 가져오기
	@PostMapping("/note/list/{tlcidx}")
	public List<Notememory> noteList(@PathVariable int tlcidx, @RequestParam(defaultValue = "1") int page) {
		
		List<Notememory> nmList = notememoryService.getNmList(tlcidx, page);
		
		return nmList;
		
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

	
//	추억에 남겨둔 쪽지 수정하기
	@PostMapping("/modifynote")
	public String modifyNote(@RequestBody Notememory notememory) {
		
		
		
		return "modifyNote";
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
// 	게시글에 감정 표시하기(등록 안되어 있을 때, Y로 생성, 등록 되어있다면 삭제)
	@PostMapping("/emotion/{tlcidx}")
	public void writeEmotion(@PathVariable int tlcidx, @RequestParam String emotion) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		Emotion emotionE = new Emotion();
		
//		해당 게시글에 감정 표시 한 적이 있는지 확인하기(숫자 1이면 체크한 적 있음, 0이면 한적 없음)
		int emotionCheck = emotionService.getEmotionCheck(tlcidx, midx);
		
//		만약 체크한 적 없다면 감정 표시하기
		if(emotionCheck == 0) {
			emotionE.setTlcidx(tlcidx);
			emotionE.setMidx(midx);
			emotionE.setEregdate(LocalDateTime.now());
			
			if(emotion.equals("good")) {
				emotionE.setEgoodyn("Y");
			}else if(emotion.equals("fighting")) {
				emotionE.setEfightingyn("Y");
			}else if(emotion.equals("congratulation")) {
				emotionE.setEcongratulationyn("Y");
			}else if(emotion.equals("expect")) {
				emotionE.setEexpectyn("Y");
			}else if(emotion.equals("surprise")) {
				emotionE.setEexpectyn("Y");
			}else if(emotion.equals("sad")) {
				emotionE.setEsadyn("Y");
			}else if(emotion.equals("nice")) {
				emotionE.setEniceyn("Y");
			}
			
			emotionService.getEmotionWrite(emotionE);
			
//		만약 감정표시 한 적 있다면 삭제해주기
		}else if(emotionCheck == 1) {
			
			Emotion existingEmotion = emotionService.getEmotionDetail(tlcidx, midx);
			
			if((existingEmotion.getEgoodyn()) != null && emotion.equals("good")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEfightingyn()) != null && emotion.equals("fight")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEcongratulationyn()) != null && emotion.equals("congratulation")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEexpectyn()) != null && emotion.equals("expect")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEsurpriseyn()) != null && emotion.equals("surprise")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEsadyn()) != null && emotion.equals("sad")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}else if((existingEmotion.getEniceyn()) != null && emotion.equals("nice")) {
				emotionService.getEmotionDelete(tlcidx, midx);
			}
		
		}
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	타임라인 게시글 삭제하기
	@PostMapping("/deletepost/{tlcidx}")
	public void deletePost(@PathVariable int tlcidx) {
		
		Long tlcidx_ = new Long(tlcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		Optional<Timelinecontent> tlcDetail_ = timelinecontentService.getTlcDetail(tlcidx_);
		Timelinecontent tlcDetail = tlcDetail_.get();
		
		tlcDetail.setTlcdelyn("Y");
		
		timelinecontentRepository.save(tlcDetail);
	
	}
	
}
