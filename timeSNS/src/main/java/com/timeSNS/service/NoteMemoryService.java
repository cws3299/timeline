package com.timeSNS.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.entity.Notememory;
import com.timeSNS.repository.NotememoryRepository;

@Service
public class NoteMemoryService {

	@Autowired
	private final NotememoryRepository notememoryRepository;
	
	public NoteMemoryService(NotememoryRepository notememoryRepository) {
		this.notememoryRepository = notememoryRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	추억에 쪽지 남긴 쪽지 저장하기 메소드
	public void getNmWrite(Notememory noteMemory) {
		
		notememoryRepository.save(noteMemory);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
	public Optional<Notememory> getNmDetail(Long nmidx) {
		
		Optional<Notememory> nmDetail =  notememoryRepository.findByNmidx(nmidx);
		
		return nmDetail;
		
	}
}
