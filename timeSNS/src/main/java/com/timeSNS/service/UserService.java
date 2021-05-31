package com.timeSNS.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.timeSNS.dto.MemberSearchDto;
import com.timeSNS.dto.UserDto;
import com.timeSNS.entity.Authority;
import com.timeSNS.entity.Member;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.util.SecurityUtil;

@Service
public class UserService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;

	private final MemberRepository memberRepository;
	private final PasswordEncoder passwordEncoder;
	
//	UserRepository, PasswordEncoder를 주입받음
	public UserService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
		this.memberRepository = memberRepository;
		this.passwordEncoder = passwordEncoder;
	}


//----------------------------------------------------------------------------------------------------//	

	
//	페이징 처리를 위한 페이지 갯수
	public int[] getPageList(String username, int page) {
		int[] pageList = new int[BLOCK_PAGE_NUM_COUNT];
	
//		총 게시글 수
		Double postsTotalCount = Double.valueOf(memberRepository.countByUsernameContainingOrMnicknameContaining(username, username));
		
//		총 게시글 수를 기준으로 계산한 마지막 페이지 번호 계산
		int totalLastPageNum = (int)(Math.ceil((postsTotalCount/PAGE_POST_COUNT)));
		
//		현재 페이지를 기준으로 블록의 마지막 페이지 번호 계산
		int blockLastPageNum = (totalLastPageNum > page + BLOCK_PAGE_NUM_COUNT)
				? page + BLOCK_PAGE_NUM_COUNT
						:totalLastPageNum;
		
//		페이지 시작 번호 조정
		page = (page<=3) ? 1 : page-2;
		
//		페이지 번호 할당
		for(int val = page, i = 0 ; val <= blockLastPageNum ; val++, i++) {
			pageList[i] = val;
		}
		
		return pageList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원가입 로직을 수행하는 메소드
//	username이 DB에 존재하지 않으면 Authority와 User정보를 생성해서 UserRepository의 save메소드를 통해 DB에 정보를 저장
	@Transactional
	public Member signup(UserDto userDto) {
		if(memberRepository.findOneWithAuthoritiesByUsername(userDto.getMid()).orElse(null) != null) {
			throw new RuntimeException("이미 가입되어 있는 유저입니다");
		}
		
		Authority authority = Authority.builder()
				.authorityName("ROLE_USER")
				.build();
		
		Member member = Member.builder()
				.username(userDto.getMid())
				.mpwd(passwordEncoder.encode(userDto.getMpwd()))
				.mregdate(LocalDateTime.now())
				.mphoto(userDto.getMphoto())
				.mnickname(userDto.getMnickname())
				.mproduce(userDto.getMproduce())
				.mbirthday(userDto.getMbirthday())
				.authorities(Collections.singleton(authority))
				.activated(true)
				.msecessionyn("N")
				.build();
		
//		여기서 중요한 것은, signup 메소드를 통해 가입한 회원은 USER ROLE을 가지고 있고,
//		data.sql에서 자동생성되는 admin 계정은 USER, ADMIN ROLE을 가지고 있다.
//		이 차이를 통해 권한 검증 부분을 테스트
		
		return memberRepository.save(member);
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	SecurityContext에 저장된 username을 기준으로 정보를 가져옴
	@Transactional(readOnly = true)
	public Optional<Member> getUserWithAuthorities(String username){
		return memberRepository.findOneWithAuthoritiesByUsername(username);
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	SecurityContext에 저장된 username의 정보만 가져옴
	@Transactional(readOnly = true)
	public Optional<Member> getMyUserWithAuthorities(){
		return SecurityUtil.getCurrentUsername().flatMap(memberRepository::findOneWithAuthoritiesByUsername);
	}
	
//	두 메소드의 허용권한을 다르게 해서 권한 검증에 대한 부분을 테스트
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 찾기 리스트 메소드
	public List<MemberSearchDto> getUserList(String username, int page) {
		
//		검색어 기준으로 아이디와 닉네임 검색 후 목록 불러오기
		Page<Member> member = memberRepository.findByUsernameContainingOrMnicknameContainingAndMsecessionyn(username, username, "N", PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "mregdate")));
		List<Member> memberList_ = member.getContent();
		List<MemberSearchDto> memberList = new ArrayList<MemberSearchDto>();
		
		for(int i = 0 ; i < memberList_.size() ; i++) {
			MemberSearchDto memberDto = MemberSearchDto.builder()
					.mid((memberList_.get(i)).getUsername())
					.mnickname((memberList_.get(i)).getMnickname())
					.mproduce((memberList_.get(i)).getMproduce())
					.mphoto((memberList_.get(i)).getMphoto())
					.build();
			
			memberList.add(memberDto);
		}
		
		return memberList;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 페이지 자료 불러오기
	public MemberSearchDto getUserDetail(int midx) {
		
		Long midx_ = new Long(midx);
		
		Optional<Member> member_ = memberRepository.findById(midx_);
		Member member = member_.get();
		
		MemberSearchDto msDto = MemberSearchDto.builder()
				.mid(member.getUsername())
				.mnickname(member.getMnickname())
				.mphoto(member.getMphoto())
				.mproduce(member.getMproduce())
				.build();
		
		return msDto;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 정보 불러오기(Dto아닌 entity)
	public Member getUserEntity(int midx) {
		
		Long midx_ = new Long(midx);
		
		Optional<Member> member_ = memberRepository.findById(midx_);
		Member member = member_.get();
		
		return member;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 정보 수정하기
	public void getMemeberModify(Member member) {
		
		memberRepository.save(member);
		
	}
}
