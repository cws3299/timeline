package com.timeSNS.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.ContentDto;
import com.timeSNS.dto.EmotionCountDto;
import com.timeSNS.dto.PostDto;
import com.timeSNS.dto.TimeLineContentDto;
import com.timeSNS.entity.Emotion;
import com.timeSNS.entity.Notememory;
import com.timeSNS.entity.Staymemory;
import com.timeSNS.entity.Staymemoryreview;
import com.timeSNS.entity.Timeline;
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
import com.timeSNS.service.TimeLineService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/post")
public class PostController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private TimeLineContentService timelinecontentService;
	private TimeLineService timelineService;
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
			TimeLineService timelineService,
			StayMemoryService staymemoryService,
			StayMemoryReviewService staymemoryreviewService,
			NoteMemoryService notememoryService,
			TagService tagService,
			PostTagService posttagService,
			EmotionService emotionService) {
		this.timelinecontentService = timelinecontentService;
		this.timelineService = timelineService;
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
		
		Optional<Timeline> tlDetail = timelineService.getTlDetail(new Long(tlidx));
		
//		해당 타임라인에 속하는 게시글 가져오기
		List<ContentDto> tlcList = timelinecontentService.getTlcList(tlidx, page);

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
					.mid((tlcList.get(i)).getMid())
					.mnickname((tlcList.get(i)).getMnickname())
					.mphoto((tlcList.get(i)).getMphoto())
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
	public void writePost(@PathVariable int tlidx, @ModelAttribute TimeLineContentDto tlcDto, HttpServletRequest request) throws IllegalStateException, IOException {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		받아온 이미지가 있다면 이미지 저장해주기
		String savedName = null;
		if(tlcDto.getTlcimage() != null) {
	
//			UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
			UUID uuid = UUID.randomUUID();
//			이미지 파일 이름 저장(uuid + _ + 파일이름)
			savedName = uuid.toString() + "_" + tlcDto.getTlcimage().getOriginalFilename();
			
			DateTimeFormatter format = DateTimeFormatter.ofPattern("yyyyMMdd");
			ZonedDateTime current = ZonedDateTime.now();
			
			System.out.println("경로: " + request.getSession().getServletContext().getRealPath("/resources"));
			
//			기본 파일 저장 장소
//			String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
			String rootPath = request.getSession().getServletContext().getRealPath("/resources");
			String filePath = rootPath;
			
//			파일 업로드 작업 수행
			File file = new File(filePath);
			
			if (!file.exists()) {
				try{
				    file.mkdir(); //폴더 없을 시 폴더 생성
				    System.out.println("폴더가 생성되었습니다.");
			        } 
			        catch(Exception e){
				    e.getStackTrace();
				}        
		         }else {
				System.out.println("이미 폴더가 생성되어 있습니다.");
			}
			
			File dest = new File(file + "/" + savedName);
			tlcDto.getTlcimage().transferTo(dest);
			System.out.println("폴더 경로: " + dest);
		}
		
//		Timelinecontent 엔티티에 타임라인 인덱스, 회원 인덱스, 작성시각, 삭제여부와 받아온 값 저장해주기 
		Timelinecontent tlContent = Timelinecontent.builder()
				.tlidx(tlidx)
				.midx(midx)
				.tlcregdate(LocalDateTime.now())
				.tlcdate(LocalDate.parse(tlcDto.getTlcdate()))
				.tlcplace(tlcDto.getTlcplace())
				.tlcimage(savedName)
				.tlccontent(tlcDto.getTlccontent())
				.tlcemotion(tlcDto.getTlcemotion())
				.tlcpubyn(tlcDto.getTlcpubyn())
				.tlcdelyn("N")
				.tlctag(tlcDto.getTlctag())
				.build();
		
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
	public void modifyPost(@PathVariable int tlcidx, @ModelAttribute TimeLineContentDto tlcDto) throws IllegalStateException, IOException {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		Long tlcidx_ = new Long(tlcidx);
		
//		수정할 기존 게시글 가져오기
		Optional<Timelinecontent> tlContent_ = timelinecontentService.getTlcModify(tlcidx_);
		Timelinecontent tlContent = tlContent_.get();
		
//		받아온 값을 확인해서 수정한 정보가 있다면 저장하기
		if(tlcDto.getTlcdate() != null) {
			if(!LocalDate.parse(tlcDto.getTlcdate()).equals(tlContent.getTlcdate())) {
				tlContent.setTlcdate(LocalDate.parse(tlcDto.getTlcdate()));	
			}
		}
		if(tlcDto.getTlcplace() != null) {
			if(!tlcDto.getTlcplace().equals(tlContent.getTlcplace())) {
				tlContent.setTlcplace(tlcDto.getTlcplace());		
			}
		}
		if(tlcDto.getTlccontent() != null) {
			if(!tlcDto.getTlccontent().equals(tlContent.getTlccontent())) {
				tlContent.setTlccontent(tlcDto.getTlccontent());
			}
		}
		if(tlcDto.getTlcemotion() != null) {
			if(!tlcDto.getTlcemotion().equals(tlContent.getTlcemotion())) {
				tlContent.setTlcemotion(tlcDto.getTlcemotion());
			}
		}
		if(tlcDto.getTlcpubyn() != null) {
			if(!tlcDto.getTlcpubyn().equals(tlContent.getTlcpubyn())) {
				tlContent.setTlcpubyn(tlcDto.getTlcpubyn());
			}
		}
		if(tlcDto.getTlctag() != null) {
			if(!tlcDto.getTlctag().equals(tlContent.getTlctag())) {
				tlContent.setTlctag(tlcDto.getTlctag());
			}
		}
		
//		받아온 이미지가 있다면 이미지 저장해주기
		String savedName = null;
		if(tlcDto.getTlcimage() != null) {
	
//			UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
			UUID uuid = UUID.randomUUID();
//			이미지 파일 이름 저장(uuid + _ + 파일이름)
			savedName = uuid.toString() + "_" + tlcDto.getTlcimage().getOriginalFilename();
			
//			기본 파일 저장 장소
			String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
			String filePath = rootPath + "/timelineSNS/" + savedName;
			
//			파일 업로드 작업 수행
			File file = new File(filePath);
			File dest = file;
			tlcDto.getTlcimage().transferTo(dest);
			
			tlContent.setTlcimage(savedName);
		}
		
//		태그 비교하기
		String tlcTag_ = tlContent.getTlctag();
		
//		태그 테이블에 입력해주기
		if(tlcTag_ != null) {

//			기존에 있던 게시글에 등록된 태그 삭제해주기
			posttagService.getPtDelete(tlcidx);
			
			String[] tlcTag = tlcTag_.split("#");
			tagService.getTagWrite(tlcTag);
			List tidxList = tagService.getTagList(tlcTag);
			
			
//			태그 등록해주기
			posttagService.getPtWrite(tidxList, tlcidx);
		}
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	특정 타임라인 게시글 가져오기
	@PostMapping("/detail/{tlcidx}")
	public PostDto detail(@PathVariable int tlcidx) {
		
		Long tlcidx_ = new Long(tlcidx);
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		tlcidx 값에 따라 데이터 가져오기
		Optional<ContentDto> tlcDetail_ = timelinecontentService.getTlcDetail(tlcidx_);
		ContentDto tlcDetail = tlcDetail_.get();
		
//		해당 타임라인에 게시글을 몇개나 작성했는지 확인
		int tlcCount = staymemoryService.getTlcidxCount(tlcidx);
		
		System.out.println("tlcCount: " + tlcCount);
		System.out.println("midx: " + midx);
		System.out.println("tlcDetail.getMidx: " + tlcDetail.getMidx());
		
		
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
				.mid(tlcDetail.getMid())
				.mnickname(tlcDetail.getMnickname())
				.mphoto(tlcDetail.getMphoto())
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
	@PostMapping("/modifynote/{nmidx}")
	public void modifyNote(@PathVariable int nmidx, @RequestBody Notememory notememory) {
		
		Long nmidx_ = new Long(nmidx);
		
//		기존 추억에 남겨둔 쪽지 가져오기
		Optional<Notememory> nmDetail_ = notememoryService.getNmDetail(nmidx_);
		Notememory nmDetail = nmDetail_.get();
		
//		기존 쪽지와 새로 등록한 쪽지가 다르면 수정하기
		if(!notememory.getNmcontent().equals(nmDetail.getNmcontent())) {
			nmDetail.setNmcontent(notememory.getNmcontent());
		}
		
//		수정내용 변경하기
		notememoryService.getNmWrite(nmDetail);
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
		
		Optional<Timelinecontent> tlcDetail_ = timelinecontentService.getTlcModify(tlcidx_);
		Timelinecontent tlcDetail = tlcDetail_.get();
		
		tlcDetail.setTlcdelyn("Y");
		
		timelinecontentRepository.save(tlcDetail);
	
	}
	
}
