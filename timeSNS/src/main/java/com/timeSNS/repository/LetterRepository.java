package com.timeSNS.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Letter;

public interface LetterRepository extends JpaRepository<Letter, Long>{

//	받은 편지 갯수
	int countByRmidx(int rmidx);
//	보낸 편지 갯수
	int countBySmidx(int smidx);
	
//	받은 편지 페이징 처리 불러오기
	Page<Letter> findByRmidx(int rmidx, Pageable pageable);
	
//	보낸 편지 페이징 처리 불러오기
	Page<Letter> findBySmidx(int smidx, Pageable pageable);
	
}
