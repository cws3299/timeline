package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Posttag;
import com.timeSNS.repository.PosttagRepository;

@Service
public class PostTagService {

	@Autowired
	private PosttagRepository posttagRepository;
	
	public PostTagService(PosttagRepository posttagRepository) {
		this.posttagRepository = posttagRepository;
	}
	
//----------------------------------------------------------------------------------------------------//	

	
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
	
}
