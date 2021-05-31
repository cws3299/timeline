package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Letter;
import com.timeSNS.repository.LetterRepository;

@Service
public class LetterService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final LetterRepository letterRepository;
	
	public LetterService(LetterRepository letterRepository) {
		this.letterRepository = letterRepository;
	}

	
//----------------------------------------------------------------------------------------------------//	


//	받은 편지 페이징 처리를 위한 페이지 갯수
	public int[] getRlPageList(int rmidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 게시글 수
		Double postsTotalCount = Double.valueOf(letterRepository.countByRmidx(rmidx));
		
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


//	보낸 편지 페이징 처리를 위한 페이지 갯수
	public int[] getSlPageList(int smidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 게시글 수
		Double postsTotalCount = Double.valueOf(letterRepository.countBySmidx(smidx));
		
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

	
//	현재 페이지에 따른 받은 편지 목록 불러오기
	public List<Letter> getRlList(int rmidx, int page) {
		
		Page<Letter> rlPage = letterRepository.findByRmidx(rmidx, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "lregdate")));
		List<Letter> rlList_ = rlPage.getContent();
		List<Letter> rlList = new ArrayList<Letter>();
		
		for(int i = 0 ; i < rlList_.size() ; i++) {
			rlList.add(rlList_.get(i));
		}
		
		return rlList;
	}

	
//----------------------------------------------------------------------------------------------------//	//----------------------------------------------------------------------------------------------------//	

	
//	현재 페이지에 따른 보낸 편지 목록 불러오기
	public List<Letter> getSlList(int rmidx, int page) {
		
		Page<Letter> slPage = letterRepository.findBySmidx(rmidx, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "lregdate")));
		List<Letter> slList_ = slPage.getContent();
		List<Letter> slList = new ArrayList<Letter>();
		
		for(int i = 0 ; i < slList_.size() ; i++) {
			slList.add(slList_.get(i));
		}
		
		return slList;
	}

//----------------------------------------------------------------------------------------------------//	

	
//	인덱스 번호로 편지 정보 불러오기
	public Letter getLetterDetail(int lidx) {
		
//		편지 인덱스 번호 불러오기
		Long lidx_ = new Long(lidx);
//		인덱스 번호로 Optional<Letter> 찾아오기
		Optional<Letter> letterDetail_ = letterRepository.findById(lidx_);
//		Letter 엔티티로 변환해주기
		Letter letterDetail = letterDetail_.get();
		
		return letterDetail;
		
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	편지 보내기
	public void getLetterWrite(Letter letter) {
		
		letterRepository.save(letter);
		
	}
}
