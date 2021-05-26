package com.timeSNS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Staymemory;
import com.timeSNS.repository.StaymemoryRepository;

@Service
public class StayMemoryService {

	@Autowired
	private final StaymemoryRepository staymemoryRepository;
	
	public StayMemoryService(StaymemoryRepository staymemoryRepository) {
		this.staymemoryRepository = staymemoryRepository;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	해당 게시글에 머무른 적 있는지 확인하는 메소드
	public int getTlcidxCount(Long tlcidx) {
		
//		tlcidx값에 따라 값이 있는지 확인
		Long tlccount_ = staymemoryRepository.countByTlcidx(tlcidx);
//		찾은 값을 int로 변환
		int tlccount = tlccount_.intValue();
		
		return tlccount;
	}

	
//----------------------------------------------------------------------------------------------------//	


//	머문 게시글 저장하기
	public void getSmWrite(Staymemory stayMemory) {
		
		staymemoryRepository.save(stayMemory);
		
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	머문 게시글 찾기
	public Staymemory getSmDetail(Long tlcidx) {
		
		Optional<Staymemory> smDetail_ = staymemoryRepository.findByTlcidx(tlcidx);
		Staymemory smDetail = smDetail_.get();
		
		return smDetail;
		
	}

	
}
