package com.timeSNS.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Emotion;

public interface EmotionRepository extends JpaRepository<Emotion, Long>{

}
