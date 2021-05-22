package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Timecapsule;
import com.timeSNS.repository.TimecapsuleRepository;

@Service
public class TimeCapsuleService {

	@Autowired
	private final TimecapsuleRepository timecapsuleRepository;
	
//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	
	public TimeCapsuleService(TimecapsuleRepository timecapsuleRepository) {
		this.timecapsuleRepository = timecapsuleRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(int midx, int page) {
		int[] pageList = new int[BLOCK_PAGE_NUM_COUNT];
//		총 게시글 수
		Double postsTotalCount = Double.valueOf(timecapsuleRepository.countByMidx(midx));
		
//		총 게시글 수를 기준으로 계산한 마지막 페이지 번호 계산
		int totalLastPageNum = (int)(Math.ceil((postsTotalCount/PAGE_POST_COUNT)));
		
//		현재 페이지를 기준으로 블록의 마지막 페이지 번호 계산
		int blockLastPageNum = (totalLastPageNum > page + BLOCK_PAGE_NUM_COUNT)
				? page + BLOCK_PAGE_NUM_COUNT
				: totalLastPageNum;
		
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
	public List<Timecapsule> getTcList(int midx, int page) {
		
		Page<Timecapsule> tcPage = timecapsuleRepository.findByMidx(midx, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "tcregdate")));
		List<Timecapsule> tcList_ = tcPage.getContent();
		List<Timecapsule> tcList = new ArrayList<>();
		
		for(int i = 0 ; i < tcList_.size() ; i++) {
			tcList.add(tcList_.get(i));
		}
		
		return tcList;
		
	}

	
//----------------------------------------------------------------------------------------------------//	

//	특정 타임캡슐 가져오기
	public Optional<Timecapsule> getTcDetail(Long tcidx) {
		
		Optional<Timecapsule> tcDetail = timecapsuleRepository.findById(tcidx);
		
		return tcDetail;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	타임캡슐 글 쓰기
	public void getTcWrite(Timecapsule timecapsule) {
		
	
		timecapsuleRepository.save(timecapsule);
		
	}
	
	
	
}
