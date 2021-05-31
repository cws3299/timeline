package com.timeSNS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.FollowDto;
import com.timeSNS.dto.MemberDetailDto;
import com.timeSNS.dto.MemberSearchDto;
import com.timeSNS.entity.Member;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.FollowService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/member")
public class MemberController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	@Autowired
	private MemberRepository memberRepository;
	
	private UserService userService;
	private FollowService followService;
	
	public MemberController(UserService userService,
							FollowService followService) {
		this.userService = userService;
		this.followService = followService;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
//	마이페이지
	@GetMapping("/mypage")
	public MemberDetailDto mypage() {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		내 정보와 팔로우 수 불러오기
		MemberSearchDto msDto= userService.getUserDetail(midx);
		FollowDto fDto = followService.getFollowDto(midx);
		
//		두 정보 합쳐주기
		MemberDetailDto mdDto = MemberDetailDto.builder()
								.mid(msDto.getMid())
								.mnickname(msDto.getMnickname())
								.mphoto(msDto.getMphoto())
								.mproduce(msDto.getMproduce())
								.followDto(fDto)
								.build();
		
		return mdDto;
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	타 회원 페이지
	@GetMapping("/userpage")
	public MemberDetailDto userpage(int midx) {
		
//		타 회원 정보와 팔로우 수 불러오기
		MemberSearchDto msDto= userService.getUserDetail(midx);
		FollowDto fDto = followService.getFollowDto(midx);
		
//		두 정보 합쳐주기
		MemberDetailDto mdDto = MemberDetailDto.builder()
								.mid(msDto.getMid())
								.mnickname(msDto.getMnickname())
								.mphoto(msDto.getMphoto())
								.mproduce(msDto.getMproduce())
								.followDto(fDto)
								.build();
		
		return mdDto;
	}

	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 탈퇴
	@GetMapping("/secession")
	public void secession() {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		Member member = userService.getUserEntity(midx);
		
		member.setMsecessionyn("Y");
		
		userService.getMemeberModify(member);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 정보 수정
	@PostMapping("/modify")
	public void userModify(@RequestBody Member member) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		기존 정보 불러오기
		Member member_ = userService.getUserEntity(midx);
		
//		받아온 값을 확인해서 수정한 정보가 있다면 저장하기
		if(!member.getMpwd().equals(member_.getMpwd())) {
			member_.setMpwd(member.getMpwd());
		}
		if(!member.getMphoto().equals(member_.getMphoto())) {
			member_.setMphoto(member.getMphoto());
		}
		if(!member.getMnickname().equals(member_.getMnickname())) {
			member_.setMnickname(member.getMnickname());
		}
		if(!member.getMproduce().equals(member_.getMproduce())) {
			member_.setMproduce(member.getMproduce());
		}
		userService.getMemeberModify(member_);
		
	}
}
