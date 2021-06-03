package com.timeSNS.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.timeSNS.dto.FollowDto;
import com.timeSNS.dto.MemberSearchDto;
import com.timeSNS.entity.Follow;
import com.timeSNS.entity.Member;
import com.timeSNS.entity.Timeline;
import com.timeSNS.repository.FollowRepository;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.repository.TimelineRepository;

@Service
public class FollowService {

//	페이지가 많아질 경우, 한번에 보이는 페이지 선택지 수
	private static final int BLOCK_PAGE_NUM_COUNT = 5;
//	한 페이지에 들어갈 게시글 수
	private static final int PAGE_POST_COUNT = 10;
	
	@Autowired
	private final FollowRepository followRepository;
	@Autowired
	private final TimelineRepository timelineRepository;
	@Autowired
	private final MemberRepository memberRepository;
	
	public FollowService(FollowRepository followRepository,
						TimelineRepository timelineRepository,
						MemberRepository memberRepository) {
		this.followRepository = followRepository;
		this.timelineRepository = timelineRepository;
		this.memberRepository = memberRepository;
	}
	
	
//----------------------------------------------------------------------------------------------------//	


//	내가 팔로우 한 타임라인 페이징 처리를 위한 페이지 갯수
	public int[] getTlPageList(int flwrmidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 타임라인 팔로우 수
		Double postsTotalCount = Double.valueOf(followRepository.countByFlwrmidxAndTlidxNotAndFlwmidx(flwrmidx, 0, 0));
		
//		총 타임라인 팔로우 수를 기준으로 계산한 마지막 페이지 번호 계산
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


//	내가 팔로우 한 회원 페이징 처리를 위한 페이지 갯수
	public int[] getMPageList(int flwrmidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 회원 팔로우 수
		Double postsTotalCount = Double.valueOf(followRepository.countByFlwrmidxAndFlwmidxNotAndTlidx(flwrmidx, 0, 0));
		
//		총 회원 팔로우 수를 기준으로 계산한 마지막 페이지 번호 계산
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


//	나를 팔로우 한 회원 페이징 처리를 위한 페이지 갯수
	public int[] getMePageList(int flwmidx, int page) {
		int [] pageList = new int[BLOCK_PAGE_NUM_COUNT];

//		총 나를 팔로우한 수
		Double postsTotalCount = Double.valueOf(followRepository.countByFlwmidxAndFlwrmidxNotAndTlidx(flwmidx, 0, 0));
		
//		총 나를 팔로우한 수를 기준으로 계산한 마지막 페이지 번호 계산
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

	
//	타임라인/회원 팔로우하기
	public void getFollow(Follow follow) {
		
		followRepository.save(follow);
		
	}

	
//----------------------------------------------------------------------------------------------------//	

//	타임라인 팔로우 취소하기
	public void getTlFollowCancel(int flwrmidx, int tlidx) {
		
		followRepository.deleteByFlwrmidxAndTlidx(flwrmidx, tlidx);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	회원 팔로우 취소하기
	public void getMFollowCancel(int flwrmidx, int flwmidx) {
		
		followRepository.deleteByFlwrmidxAndFlwmidx(flwrmidx, flwmidx);
		
	}
	
	
//----------------------------------------------------------------------------------------------------//	

	
//	내가 팔로우 한 타임라인 목록 가져오기
	public List<Timeline> getTlFollowList(int flwrmidx, int page) {
		
		Page<Follow> tlfPage = followRepository.findByFlwrmidxAndTlidxNotAndFlwmidx(flwrmidx, 0, 0, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "flregdate")));
		List<Follow> tlfList_ = tlfPage.getContent();
		List<Timeline> tlfList = new ArrayList<Timeline>();
		
		if(tlfList_.size() != 0) {
			for(int i = 0 ; i < tlfList_.size() ; i++) {
				Long tlidx = new Long((tlfList_.get(i)).getTlidx());
				tlfList.add((timelineRepository.findById(tlidx)).get());	
			}
		}
		
		return tlfList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	내가 팔로우 한 회원 목록 가져오기
	public List<MemberSearchDto> getMFolowList(int flwrmidx, int page) {
		
		Page<Follow> mfPage = followRepository.findByFlwrmidxAndFlwmidxNotAndTlidx(flwrmidx, 0, 0, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "flregdate")));
		List<Follow> mfList_ = mfPage.getContent();
		List<MemberSearchDto> mfList = new ArrayList<MemberSearchDto>();
		
		if(mfList_.size() != 0) {
			for(int i = 0 ; i < mfList_.size() ; i++) {
				Long midx = new Long((mfList_.get(i)).getFlwmidx());
				Member member = (memberRepository.findById(midx)).get();
				
				MemberSearchDto msDto = MemberSearchDto.builder()
										.mid(member.getUsername())
										.mnickname(member.getMnickname())
										.mphoto(member.getMphoto())
										.mproduce(member.getMproduce())
										.build();
				mfList.add(msDto);
			}
		}
		return mfList;
	}
	
	
//----------------------------------------------------------------------------------------------------//	
	
	
//	나를 팔로우 한 회원 목록 가져오기
	public List<MemberSearchDto> getMeFollowList(int flwmidx, int page) {
		
		Page<Follow> mefPage = followRepository.findByFlwmidxAndFlwrmidxNotAndTlidx(flwmidx, 0, 0, PageRequest.of(page-1, PAGE_POST_COUNT, Sort.by(Sort.Direction.DESC, "flregdate")));
		List<Follow> mefList_ = mefPage.getContent();
		List<MemberSearchDto> mefList = new ArrayList<MemberSearchDto>();

		if(mefList_.size() != 0) {
			for(int i = 0 ; i < mefList_.size() ; i++) {
				Long midx = new Long((mefList_.get(i)).getFlwrmidx());
				Member member = (memberRepository.findById(midx)).get();
				
				MemberSearchDto msDto = MemberSearchDto.builder()
						.mid(member.getUsername())
						.mnickname(member.getMnickname())
						.mphoto(member.getMphoto())
						.mproduce(member.getMproduce())
						.build();
				
				mefList.add(msDto);
			}
		}
		return mefList;
	}
	
//----------------------------------------------------------------------------------------------------//	


//	팔로우 숫자 DTO 만들기
	public FollowDto getFollowDto(int midx) {
		
//		총 타임라인 팔로우 수
		Double timelineTotalCount = Double.valueOf(followRepository.countByFlwrmidxAndTlidxNotAndFlwmidx(midx, 0, 0));
		
//		총 회원 팔로우 수
		Double memberTotalCount = Double.valueOf(followRepository.countByFlwrmidxAndFlwmidxNotAndTlidx(midx, 0, 0));

//		총 나를 팔로우한 수
		Double meTotalCount = Double.valueOf(followRepository.countByFlwmidxAndFlwrmidxNotAndTlidx(midx, 0, 0));
		
		FollowDto followDto = FollowDto.builder()
				.tlFollow(timelineTotalCount.intValue())
				.mFollow(memberTotalCount.intValue())
				.meFollow(meTotalCount.intValue())
				.build();
		
		return followDto;
	}
	
//----------------------------------------------------------------------------------------------------//	

}
