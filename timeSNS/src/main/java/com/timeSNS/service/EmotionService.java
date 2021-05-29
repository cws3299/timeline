package com.timeSNS.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.timeSNS.dto.EmotionCountDto;
import com.timeSNS.entity.Emotion;
import com.timeSNS.repository.EmotionRepository;

@Service
public class EmotionService {

	@Autowired
	private final EmotionRepository emotionRepository;
	
	public EmotionService(EmotionRepository emotionRepository) {
		this.emotionRepository = emotionRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	게시글에 감정 표시하기(Emotion 테이블에 데이터 저장)
	public void getEmotionWrite(Emotion emotion) {
		emotionRepository.save(emotion);
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	게시글에 표시한 감정이 있는지 확인하기
	public int getEmotionCheck(int tlcidx, int midx) {
		
		int emotionCheck = emotionRepository.countByTlcidxAndMidx(tlcidx, midx);
		
		return emotionCheck;
	}

	
//----------------------------------------------------------------------------------------------------//	
	
	
//	게시글에 표시한 감정 가져오기
	public Emotion getEmotionDetail(int tlcidx, int midx) {
	
		Emotion emotion = emotionRepository.findByTlcidxAndMidx(tlcidx, midx);
		
		return emotion;
		
	}
	
//----------------------------------------------------------------------------------------------------//	

	
//	게시글에 표시한 감정 삭제하기
	public void getEmotionDelete(int tlcidx, int midx) {
		
		emotionRepository.deleteByTlcidxAndMidx(tlcidx, midx);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	게시글 받은 감정 개수 확인하기
	public EmotionCountDto getEmotionCount(int tlcidx) {
		
		EmotionCountDto emotionCountDto = new EmotionCountDto();
		
		emotionCountDto.builder()
					.tlcidx(tlcidx)
					.egoodyn(emotionRepository.countByTlcidxAndEgoodyn(tlcidx, "Y"))
					.efightingyn(emotionRepository.countByTlcidxAndEfightingyn(tlcidx, "Y"))
					.econgratulationyn(emotionRepository.countByTlcidxAndEcongratulationyn(tlcidx, "Y"))
					.eexpectyn(emotionRepository.countByTlcidxAndEexpectyn(tlcidx, "Y"))
					.esurpriseyn(emotionRepository.countByTlcidxAndEsurpriseyn(tlcidx, "Y"))
					.esadyn(emotionRepository.countByTlcidxAndEsadyn(tlcidx, "Y"))
					.eniceyn(emotionRepository.countByTlcidxAndEniceyn(tlcidx, "Y"));
		
		return emotionCountDto;
	}
}
