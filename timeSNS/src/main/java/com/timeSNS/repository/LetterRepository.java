package com.timeSNS.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.timeSNS.dto.LetterMemberDto;
import com.timeSNS.dto.LetterMemberDtoInterface;
import com.timeSNS.entity.Letter;

public interface LetterRepository extends JpaRepository<Letter, Long>{

//	받은 편지 갯수
	int countByRmidx(int rmidx);
//	보낸 편지 갯수
	int countBySmidx(int smidx);
	
//	받은 편지 페이징 처리 불러오기
	@Query(value =
			"SELECT LETTER.LIDX, LETTER.TLCIDX, LETTER.LIDX_2, LETTER.SMIDX, LETTER.RMIDX, " 
			+ "MEMBER.MID AS SMID, MEMBER.MNICKNAME AS SMNICKNAME, MEMBER.MPHOTO AS SMPHOTO, " 
			+ "LETTER.LREGDATE, LETTER.LCONTENT, LETTER.LREADYN, LETTER.LCATEGORY, LETTER.LPHOTO " 
			+ "FROM LETTER " 
			+ "JOIN MEMBER " 
			+ "ON MEMBER.MIDX = LETTER.SMIDX " 
			+ "WHERE RMIDX = ?1 "
			+ "ORDER BY LETTER.LREGDATE DESC",
			countQuery=
			"SELECT COUNT(*) "
			+ "FROM LETTER "
			+ "JOIN MEMBER "
			+ "ON MEMBER.MIDX = LETTER.SMIDX "
			+ "WHERE RMIDX = ?1"
			+ "ORDER BY LETTER.LREGDATE DESC",
			nativeQuery = true)
	Page<LetterMemberDtoInterface> findByRmidx(int rmidx, Pageable pageable);
	
//	보낸 편지 페이징 처리 불러오기
	@Query(value =
			"SELECT LETTER.LIDX, LETTER.TLCIDX, LETTER.LIDX_2, LETTER.SMIDX, LETTER.RMIDX, " 
			+ "MEMBER.MID AS RMID, MEMBER.MNICKNAME AS RMNICKNAME, MEMBER.MPHOTO AS RMPHOTO, " 
			+ "LETTER.LREGDATE, LETTER.LCONTENT, LETTER.LREADYN, LETTER.LCATEGORY, LETTER.LPHOTO " 
			+ "FROM LETTER " 
			+ "JOIN MEMBER " 
			+ "ON MEMBER.MIDX = LETTER.RMIDX " 
			+ "WHERE SMIDX = ?1 "
			+ "ORDER BY LETTER.LREGDATE DESC",
			countQuery=
			"SELECT COUNT(*) "
			+ "FROM LETTER "
			+ "JOIN MEMBER "
			+ "ON MEMBER.MIDX = LETTER.RMIDX "
			+ "WHERE SMIDX = ?1"
			+ "ORDER BY LETTER.LREGDATE DESC",
			nativeQuery = true)
	Page<LetterMemberDtoInterface> findBySmidx(int smidx, Pageable pageable);
	
//	편지 상세내용 가져오기
	Optional<Letter> findById(Long lidx);
	
	
}
