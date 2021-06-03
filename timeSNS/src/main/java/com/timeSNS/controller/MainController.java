package com.timeSNS.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.EmotionCountDto;
import com.timeSNS.dto.PostDto;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.EmotionService;
import com.timeSNS.service.PostTagService;
import com.timeSNS.service.TagService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/main")
public class MainController {
	
	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private TimeLineContentService timelinecontentService;
	private EmotionService emotionService;
	private PostTagService posttagService;
	private TagService tagService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public MainController(TimeLineContentService timelinecontentService,
						EmotionService emotionService,
						PostTagService posttagService,
						TagService tagService) {
		this.timelinecontentService = timelinecontentService;
		this.emotionService = emotionService;
		this.posttagService = posttagService;
		this.tagService = tagService;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	메인 피드 페이지 불러오기
	@GetMapping("/feed")
	public List<PostDto> Main(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		메인에 들어갈 게시글 가져오기
		List<Timelinecontent> tlcList = timelinecontentService.getMainFeed(midx, page);
		
//		각 게시글 넣어줄 PostDto 리스트 만들어주기
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
	
}
