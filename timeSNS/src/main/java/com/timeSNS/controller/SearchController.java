package com.timeSNS.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.EmotionCountDto;
import com.timeSNS.dto.MemberSearchDto;
import com.timeSNS.dto.PostDto;
import com.timeSNS.entity.Timeline;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.EmotionService;
import com.timeSNS.service.PostTagService;
import com.timeSNS.service.TagService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.service.TimeLineService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/search")
public class SearchController {

	public static final String AUTHORIZATION_HEADER = "Authorization";

	private TimeLineService timelineService;
	private TimeLineContentService timelinecontentService;
	private TagService tagService;
	private PostTagService posttagService;
	private EmotionService emotionService;
	private UserService userService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public SearchController(TimeLineService timelineService, 
							TimeLineContentService timelinecontentService,
							TagService tagService,
							PostTagService posttagService,
							EmotionService emotionService,
							UserService userService) {
		
		this.timelineService = timelineService;
		this.timelinecontentService = timelinecontentService;
		this.tagService = tagService;
		this.posttagService = posttagService;
		this.emotionService = emotionService;
		this.userService = userService;
		
	}
	

//----------------------------------------------------------------------------------------------------//	

//	유저 아이디 검색
	@GetMapping("/user")
	public List<MemberSearchDto> user(@RequestParam String user, @RequestParam int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<MemberSearchDto> memberList = userService.getUserList(user, page);
		
		return memberList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	타임라인 검색
	@GetMapping("/timeline")
	public List<Timeline> timeline(@RequestParam String timeline, @RequestParam int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		타임라인 검색 결과 게시글 목록 가져오기
		List<Timeline> tlSearchList = timelineService.getTlSearchList(timeline, page);
		
		return tlSearchList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	게시물 검색
	@GetMapping("/post")
	public List<PostDto> post(@RequestParam String content, @RequestParam int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();

//		타임라인 게시글 검색 결과 게시글 목록 가져오기
		List<Timelinecontent> tlcSearchList = timelinecontentService.getTlcSearchList(content, page);
		
//		각 게시글 넣어줄 PostDto 리스트
		List<PostDto> postDtoList = new ArrayList<PostDto>();
		
		for(int i = 0 ; i < tlcSearchList.size() ; i++) {
			int tlcidx = ((tlcSearchList.get(i)).getTlcidx()).intValue();

//			각 게시글에 해당되는 감정 개수
			EmotionCountDto emotionCountDto = emotionService.getEmotionCount(tlcidx);

//			해당 게시글에 적용되는 태그 가져오기
//			게시글에 적용되는 태그의 인덱스 번호 가져오기
			List tagIdxList = posttagService.getTagIdxList(tlcidx);
//			인덱스 번호에 해당하는 태그 내용 가져오기
			List<String> tagList = tagService.getTagCList(tagIdxList);
			
//			PostDto에 게시글 내용, 감정, 태그 합쳐주기
			PostDto postDto = PostDto.builder()
					.tlcidx((tlcSearchList.get(i)).getTlcidx())
					.tlidx((tlcSearchList.get(i)).getTlidx())
					.midx((tlcSearchList.get(i)).getMidx())
					.tlcregdate((tlcSearchList.get(i)).getTlcregdate())
					.tlcdate((tlcSearchList.get(i)).getTlcdate())
					.tlcplace((tlcSearchList.get(i)).getTlcplace())
					.tlcimage((tlcSearchList.get(i)).getTlcimage())
					.tlccontent((tlcSearchList.get(i)).getTlccontent())
					.tlcemotion((tlcSearchList.get(i)).getTlcemotion())
					.tlcpubyn((tlcSearchList.get(i)).getTlcpubyn())
					.tlcdelyn((tlcSearchList.get(i)).getTlcdelyn())
					.emotioncountdto(emotionCountDto)
					.tag(tagList)
					.build();
			
//			목록에 PostDto 넣어주기
			postDtoList.add(postDto);
		}
		
		return postDtoList;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	태그 검색
	@GetMapping("/tag")
	public String tag(@RequestParam String tag) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		검색 태그 인덱스 번호 가져오기
		int tidx = tagService.getTagSearchIdx(tag);
//		검색 태그 인덱스 기준으로 해당 태그 사용한 게시글 인덱스 받아오기
		
		
		
		return "tag";
	}
	
	
//----------------------------------------------------------------------------------------------------//	

}
