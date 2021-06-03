package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Notememory;
import com.timeSNS.repository.NotememoryRepository;

@Service
public class NoteMemoryService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final NotememoryRepository notememoryRepository;
	
	public NoteMemoryService(NotememoryRepository notememoryRepository) {
		this.notememoryRepository = notememoryRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(int tlcidx, int page) {
		int[] pageList = new int[BLOCK_PAGE_NUM_COUNT];
		
//		총 게시글 수
		Double postsTotalCount = Double.valueOf(notememoryRepository.countByTlcidx(tlcidx));
		
//		총 게시글 수를 기준으로 계산한 마지막 페이지 번호 계산
		int totalLastPageNum = (int)(Math.ceil((postsTotalCount/PAGE_POST_COUNT)));
		
//		현재 페이지를 기준으로 블록의 마지막 페이지 번호 계산
		int blockLastPageNum = (totalLastPageNum > page + BLOCK_PAGE_NUM_COUNT)
				? page + BLOCK_PAGE_NUM_COUNT
						:totalLastPageNum;
		
//		페이지 시작 번호 조정
		page = (page<=3) ? 1 : page-2;
		
//		페이지 번호 할당
		for(int val = page , i = 0 ; val <= blockLastPageNum ; val++, i++) {
			pageList[i] = val;
		}
		
		return pageList;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	추억에 쪽지 남긴 쪽지 저장하기 메소드
	public void getNmWrite(Notememory noteMemory) {
		
		notememoryRepository.save(noteMemory);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	추억에 남긴 족지 가져오기
	public Optional<Notememory> getNmDetail(Long nmidx) {
		
		Optional<Notememory> nmDetail =  notememoryRepository.findByNmidx(nmidx);
		
		return nmDetail;
		
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	현재 페이지에 따른 추억에 남긴 쪽지 목록 가져오기
	public List<Notememory> getNmList(int tlcidx, int page) {
		
		Page<Notememory> nmPage = notememoryRepository.findByTlcidx(tlcidx, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "nmregdate")));
		List<Notememory> nmList_ = nmPage.getContent();
		List<Notememory> nmList = new ArrayList<>();
		
		for(int i = 0 ; i < nmList_.size() ; i++) {
			nmList.add(nmList_.get(i));
		}
		
		return nmList;
	}
	
}
