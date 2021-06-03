package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.timeSNS.entity.Emotion;

public interface EmotionRepository extends JpaRepository<Emotion, Long>{

	int countByTlcidxAndMidx(int tlcidx, int midx);
	Emotion findByTlcidxAndMidx(int tlcidx, int midx);
	
	@Transactional
	int deleteByTlcidxAndMidx(int tlcidx, int midx);
	
	int countByTlcidxAndEgoodyn(int tlcidx, String egoodyn);
	int countByTlcidxAndEfightingyn(int tlcidx, String efightingyn);
	int countByTlcidxAndEcongratulationyn(int tlcidx, String econgratulationyn);
	int countByTlcidxAndEexpectyn(int tlcidx, String eexpectyn);
	int countByTlcidxAndEsurpriseyn(int tlcidx, String esurpriseyn);
	int countByTlcidxAndEsadyn(int tlcidx, String esadyn);
	int countByTlcidxAndEniceyn(int tlcidx, String eniceyn);
	
}
