package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.domain.Emotion;

public interface EmotionRepository extends JpaRepository<Emotion, Long>{

}
