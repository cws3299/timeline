package com.timeSNS.controller;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.timeSNS.dto.FollowDto;
import com.timeSNS.dto.MemberDetailDto;
import com.timeSNS.dto.MemberModifySignDto;
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
	private final PasswordEncoder passwordEncoder;
	
	public MemberController(UserService userService,
							FollowService followService,
							PasswordEncoder passwordEncoder) {
		this.userService = userService;
		this.followService = followService;
		this.passwordEncoder = passwordEncoder;
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
	public void userModify(@ModelAttribute MemberModifySignDto memberDto,
			HttpServletRequest request) throws Exception {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
		UUID uuid = UUID.randomUUID();
//		이미지 파일 이름 저장(uuid + _ + 파일이름)
		String savedName = uuid.toString() + "_" + memberDto.getMphoto().getOriginalFilename();
		
//		기본 파일 저장 장소
		String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
		String filePath = rootPath + "/" + savedName;
		
//		파일 업로드 작업 수행
		File file = new File(filePath);
		File dest = file;
		memberDto.getMphoto().transferTo(dest);
		
		
//		기존 정보 불러오기
		Member member_ = userService.getUserEntity(midx);
		
//		받아온 값을 확인해서 수정한 정보가 있다면 저장하기
		if(!memberDto.getMnickname().equals(member_.getMnickname())) {
			member_.setMnickname(memberDto.getMnickname());
		}
		if(!(passwordEncoder.encode(memberDto.getMpwd())).equals(member_.getMpwd())) {
			member_.setMpwd(passwordEncoder.encode(memberDto.getMpwd()));
		}
		if(!memberDto.getMproduce().equals(member_.getMproduce())) {
			member_.setMproduce(memberDto.getMproduce());
		}
		member_.setMphoto(savedName);
		
		userService.getMemeberModify(member_);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

}
