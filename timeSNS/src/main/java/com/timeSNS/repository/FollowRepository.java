package com.timeSNS.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.timeSNS.entity.Follow;
import com.timeSNS.entity.Member;

public interface FollowRepository extends JpaRepository<Follow, Long>{

//	타임라인 팔로우 삭제
	int deleteByFlwrmidxAndTlidx(int flrmidx, int tlidx);
	
//	회원 팔로우 삭제
	int deleteByFlwrmidxAndFlwmidx(int flwrmidx, int flwmidx);
	
//	내가 팔로우 한 타임라인 페이징 처리를 위한 갯수 확인
	int countByFlwrmidxAndTlidxNotAndFlwmidx(int flwrmidx, int tlidx, int flwmidx);
//	내가 팔로우 한 타임라인 페이징 처리 불러오기
	Page<Follow> findByFlwrmidxAndTlidxNotAndFlwmidx(int flwrmidx, int tlidx, int flwmidx, Pageable pageable);
	
//	내가 팔로우 한 회원 페이징 처리를 위한 갯수 확인
	int countByFlwrmidxAndFlwmidxNotAndTlidx(int flwrmidx, int flwmidx, int tlidx);
//	내가 팔로우 한 회원 페이징 처리 불러오기
	Page<Follow> findByFlwrmidxAndFlwmidxNotAndTlidx(int flwrmidx, int flwmidx, int tlidx, Pageable pageble);

//	나를 팔로우 한 회원 페이징 처리를 위한 갯수 확인
	int countByFlwmidxAndFlwrmidxNotAndTlidx(int flwmidx, int flwrmidx, int tlidx);
//	나를 팔로우 한 회원 페이징 처리 불러오기
	Page<Follow> findByFlwmidxAndFlwrmidxNotAndTlidx(int flwmidx, int flwrmidx, int tlidx, Pageable pageable);
}
