package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Tag;
import com.timeSNS.repository.TagRepository;

@Service
public class TagService {

	@Autowired
	private final TagRepository tagRepository;
	
	public TagService(TagRepository tagRepository) {
		this.tagRepository = tagRepository;
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

}
