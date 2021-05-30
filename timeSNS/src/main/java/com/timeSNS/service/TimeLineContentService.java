package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.TimelinecontentRepository;

@Service
public class TimeLineContentService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final TimelinecontentRepository timelinecontentRepository;
	
	public TimeLineContentService(TimelinecontentRepository timelinecontentRepository) {
		this.timelinecontentRepository = timelinecontentRepository;
	}

	
//----------------------------------------------------------------------------------------------------//


//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(int tlidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 게시글 수
		Double postsTotalCount = Double.valueOf(timelinecontentRepository.countByTlidx(tlidx));
		
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

	
//	현재 페이지에 따른 게시글 불러오기
	public List<Timelinecontent> getTlcList(int tlidx, int page) {
		
		Page<Timelinecontent> tlcPage = timelinecontentRepository.findByTlidxAndTlcpubynAndTlcdelyn(tlidx, "Y", "N", PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "tlcregdate")));
		List<Timelinecontent> tlcList_ = tlcPage.getContent();
		List<Timelinecontent> tlcList = new ArrayList<>();
		
		for(int i = 0 ; i < tlcList_.size() ; i++) {
			tlcList.add(tlcList_.get(i));
		}
		
		return tlcList;
	}
	
	
//----------------------------------------------------------------------------------------------------//

	
//	특정 포스트 가져오기
	public Optional<Timelinecontent> getTlcDetail(Long tlcidx) {
		
		Optional<Timelinecontent> tlcDetail = timelinecontentRepository.findById(tlcidx);
		
		return tlcDetail;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//

}
