package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Posttag;
import com.timeSNS.repository.PosttagRepository;

@Service
public class PostTagService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private PosttagRepository posttagRepository;
	
	public PostTagService(PosttagRepository posttagRepository) {
		this.posttagRepository = posttagRepository;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(int tidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 게시글 수
		Double postsTotalCount = Double.valueOf(posttagRepository.countByTidx(tidx));
		
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

	
//	게시글에 쓰인 태그 인덱스 번호 등록
	public void getPtWrite(List tagIdx, int tlcidx) {
		
		for(int i = 0 ; i < tagIdx.size() ; i++) {
			Posttag postTag = new Posttag();
			postTag.setTlcidx(tlcidx);
			postTag.setTidx((int)(tagIdx.get(i)));
			posttagRepository.save(postTag);
		}
		
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	게시글에 사용된 태그 인덱스번호 가져오기
	public List getTagIdxList(int tlcidx) {
		
		List tagIdxList_ = posttagRepository.findByTlcidx(tlcidx);
		
		List tagIdxList = new ArrayList();
		
		for(int i = 0 ; i < tagIdxList_.size() ; i++) {
			tagIdxList.add(((Posttag)tagIdxList_.get(i)).getTidx());
		}
		
		return tagIdxList;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
	public int[] getPtidxSearchList(int tidx) {
		
		int[] ptidxList = new int[(posttagRepository.findByTidx(tidx)).size()];
		
		for(int i = 0 ; i < ptidxList.length ; i++) {
			ptidxList[i] = (((posttagRepository.findByTidx(tidx)).get(i)).getPtidx()).intValue();
		}
		
		return ptidxList;
		
	}
}
