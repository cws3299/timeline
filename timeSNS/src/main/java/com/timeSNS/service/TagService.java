package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.timeSNS.dto.PostDto;
import com.timeSNS.entity.Posttag;
import com.timeSNS.entity.Tag;
import com.timeSNS.entity.Timelinecontent;
import com.timeSNS.repository.PosttagRepository;
import com.timeSNS.repository.TagRepository;
import com.timeSNS.repository.TimelinecontentRepository;

@Service
public class TagService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final TagRepository tagRepository;
	@Autowired
	private final TimelinecontentRepository timelinecontentRepository;
	
	public TagService(TagRepository tagRepository,
				TimelinecontentRepository timelinecontentRepository) {
		this.tagRepository = tagRepository;
		this.timelinecontentRepository = timelinecontentRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	태그 # 단위로 나눠서 테이블 안에 입력해주기
	public void getTagWrite(String[] tlcTag) {
		
//		해당 태그가 이미 테이블에 들어있는지 확인해본 뒤 없으면 추가하기
		for(int i = 0 ; i < tlcTag.length ; i++) {
			if(tagRepository.findByTcontent(tlcTag[i]).isEmpty()) {
				Tag tag = new Tag();
				tag.setTcontent(tlcTag[i]);
				tagRepository.save(tag);
			}
		}
		
	}
	

//----------------------------------------------------------------------------------------------------//	

	
//	태그 목록 보내주면 각 태그 별 인덱스 번호 보내주기
	public List getTagList(String[] tlcTag) {
		
		List<Tag> tag_ = new ArrayList();
		List tagList = new ArrayList();
		
//		만약 테이블에 해당 태그가 저장되어 있지 않다면 저장해주기
		for(int i = 0 ; i < tlcTag.length ; i++) {
			int tagIdx = (((tagRepository.findByTcontent(tlcTag[i])).get()).getTidx()).intValue();
			tagList.add(tagIdx);
		}
		
		return tagList;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	해당 게시글에 쓰인 태그 보내주기
	public List<String> getTagCList(List tagIdxList) {
		
		List<String> tagList = new ArrayList<>();
		
		for(int i = 0 ; i < tagIdxList.size() ; i++) {
			
			int tidx_ = (int)tagIdxList.get(i);
			Long tidx = new Long(tidx_);
			
			Optional<Tag> tag_ = tagRepository.findByTidx(tidx);
			Tag tag = tag_.get();
			tagList.add(tag.getTcontent());
			
		}
		
		return tagList;
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
//	검색한 태그 인덱스 검색
	public int getTagSearchIdx(String tag) {
		
		int tagIdx = tagRepository.findByTcontent(tag).get().getTidx().intValue();
		
		return tagIdx;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	태그 인덱스 번호를 기준으로 해당 태그를 사용한 게시글  가져오기
	public List<Timelinecontent> getPostTagSearch(int tagIdx, int page) {
		
		Page<Timelinecontent> tlcPage = timelinecontentRepository.findByTidx(tagIdx, PageRequest.of(page-1, PAGE_POST_COUNT));
		List<Timelinecontent> tlcList_ = tlcPage.getContent();
		List<Timelinecontent> tlcList = new ArrayList<>();
		
		if(tlcList_.size() != 0) {
			for(int i = 0 ; i < tlcList_.size() ; i++) {
				tlcList.add(tlcList_.get(i));
			}
		}
		
		return tlcList; 
	}
	
	
}
