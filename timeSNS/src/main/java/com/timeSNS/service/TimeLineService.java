package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.dto.TimeLineMemberDto;
import com.timeSNS.entity.Member;
import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelineRepository;

@Service
public class TimeLineService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final TimelineRepository timelineRepository;
	@Autowired
	private final MemberRepository memberRepository;

	public TimeLineService(TimelineRepository timelineRepository,
							MemberRepository memberRepository) {
		this.timelineRepository = timelineRepository;
		this.memberRepository = memberRepository;
	}
	
//----------------------------------------------------------------------------------------------------//	
	

//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(int midx, int page) {
		int[] pageList = new int[BLOCK_PAGE_NUM_COUNT];
	
//		총 게시글 수
		Double postsTotalCount = Double.valueOf(timelineRepository.countByMidx(midx));
		
//		총 게시글 수를 기준으로 계산한 마지막 페이지 번호 계산
		int totalLastPageNum = (int)(Math.ceil((postsTotalCount/PAGE_POST_COUNT)));
		
//		현재 페이지를 기준으로 블록의 마지막 페이지 번호 계산
		int blockLastPageNum = (totalLastPageNum > page + BLOCK_PAGE_NUM_COUNT)
				? page + BLOCK_PAGE_NUM_COUNT
						:totalLastPageNum;
		
//		페이지 시작 번호 조정
		page = (page<=3) ? 1 : page-2;
		
//		페이지 번호 할당
		for(int val = page, i = 0 ; val <= blockLastPageNum ; val++, i++) {
			pageList[i] = val;
		}
		
		return pageList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	현재 페이지에 따른 타임라인 목록 불러오기
	public List<TimeLineMemberDto> getTlList(int midx, int page) {
		
		Page<Timeline> tlPage = timelineRepository.findByMidxAndTlpubynAndTldelyn(midx, "Y", "N", PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "tlregdate")));
		List<Timeline> tlList_ = tlPage.getContent();
		List<TimeLineMemberDto> tlList = new ArrayList<>();
		
		for(int i = 0 ; i < tlList_.size() ; i++) {
			Long midx_ = new Long(midx);
			Member member = (memberRepository.findById(midx_)).get();
			
			TimeLineMemberDto tlmDto = TimeLineMemberDto.builder()
					.tlidx(tlList_.get(i).getTlidx())
					.midx(tlList_.get(i).getMidx())
					.mid(member.getUsername())
					.mnickname(member.getMnickname())
					.mphoto(member.getMphoto())
					.tltitle(tlList_.get(i).getTltitle())
					.tlcategory(tlList_.get(i).getTlcategory())
					.tlintroduce(tlList_.get(i).getTlintroduce())
					.tlregdate(tlList_.get(i).getTlregdate())
					.tlpubyn(tlList_.get(i).getTlpubyn())
					.tldelyn(tlList_.get(i).getTlpubyn())
					.build();
			
			tlList.add(tlmDto);
		}
		
		return tlList;
	}
	
//----------------------------------------------------------------------------------------------------//	

	
//	현재 페이지에 따른 타임라인 검색 목록 불러오기
	public List<Timeline> getTlSearchList(String timeline, int page) {
		
		Page<Timeline> tlPage = timelineRepository.findByTltitleContainingAndTlpubynAndTldelyn(timeline, "Y", "N", PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "tlregdate")));
		List<Timeline> tlList_ = tlPage.getContent();
		List<Timeline> tlList = new ArrayList<>();
		
		for(int i = 0 ; i < tlList_.size() ; i++) {
			tlList.add(tlList_.get(i));
		}
		
		return tlList;
		
	}
	
//----------------------------------------------------------------------------------------------------//	

	
//	타임라인 작성 메소드
	public void getTlWrite(Timeline timeline) {
		
		timelineRepository.save(timeline);
		
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
//	특정 타임라인 가져오기
	public Optional<Timeline> getTlDetail(Long tlidx) {
		
		Optional<Timeline> tlDetail = timelineRepository.findById(tlidx);
		
		return tlDetail;
		
	}
	
	
}
