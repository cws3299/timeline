package com.timeSNS.service;

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
		
		Posttag postTag = new Posttag();
		postTag.setTlcidx(tlcidx);
		
		for(int i = 0 ; i < tagIdx.size() ; i++) {
			
			postTag.setTidx((int)(tagIdx.get(i)));
			posttagRepository.save(postTag);
			
		}
		
	}
	
}
