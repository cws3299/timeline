package com.timeSNS.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.MemberSearchDto;
import com.timeSNS.entity.Follow;
import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.FollowService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/follow")
public class FollowController {

	public static final String AUTHORIZATION_HEADER = "Authorization";

	private FollowService followService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public FollowController(FollowService followService) {
		this.followService = followService;
	}
	
//----------------------------------------------------------------------------------------------------//

	
//	타임라인 팔로우하기
	@GetMapping("/followtl")
	public void tlFollow(@RequestParam int tlidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		Follow follow = Follow.builder()
				.tlidx(tlidx)
				.flwrmidx(midx)
				.build();
		
		followService.getFollow(follow);
		
	}

	
//----------------------------------------------------------------------------------------------------//

	
//	회원 팔로우하기
	@GetMapping("/followm")
	public void memberFollow(@RequestParam int flwmidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();

		Follow follow = Follow.builder()
				.flwrmidx(midx)
				.flwmidx(flwmidx)
				.build();
		
		followService.getFollow(follow);
	}
	

//----------------------------------------------------------------------------------------------------//

	
//	타임라인 팔로우 취소하기
	@GetMapping("/followtl/cancel")
	public void tlFollowCancel(@RequestParam int tlidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		followService.getTlFollowCancel(midx, tlidx);
		
	}

	
//----------------------------------------------------------------------------------------------------//

	
//	회원 팔로우 취소하기
	@GetMapping("/followm/cancel")
	public void mFollowCancel(@RequestParam int flwmidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		followService.getMFollowCancel(midx, flwmidx);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	내가 팔로우 한 타임라인 목록 가져오기
	@GetMapping("/followtl/list")
	public List<Timeline> tlFollowList(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Timeline> tlFollowList = followService.getTlFollowList(midx, page);
		
		return tlFollowList;
		
	}

	
//----------------------------------------------------------------------------------------------------//

	
//	내가 팔로우 한 회원 목록 가져오기
	@GetMapping("/followm/list")
	public List<MemberSearchDto> mFollowList(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<MemberSearchDto> mFollowList = followService.getMFolowList(midx, page);
		
		return mFollowList;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	나를 팔로우 한 회원 목록 가져오기
	@GetMapping("/followme/list")
	public List<MemberSearchDto> meFollowList(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<MemberSearchDto> meFollowList = followService.getMeFollowList(midx, page);
		
		return meFollowList;
		
	}
	
	
//----------------------------------------------------------------------------------------------------//


}
