package com.timeSNS.controller;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.swing.filechooser.FileSystemView;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.timeSNS.dto.LetterDto;
import com.timeSNS.entity.Letter;
import com.timeSNS.repository.MemberRepository;
import com.timeSNS.service.LetterService;
import com.timeSNS.service.TimeLineContentService;
import com.timeSNS.service.UserService;
import com.timeSNS.util.SecurityUtil;

@RestController
@RequestMapping("/mailbox")
public class MailBoxController {

	public static final String AUTHORIZATION_HEADER = "Authorization";
	
	private final UserService userService;
	private TimeLineContentService timelinecontentService;
	private LetterService letterService;
	
	@Autowired
	private MemberRepository memberRepository;
	
	public MailBoxController(UserService userService,
							TimeLineContentService timelinecontentService,
							LetterService letterService) {
		this.userService = userService;
		this.timelinecontentService = timelinecontentService;
		this.letterService = letterService;
	}
	

//----------------------------------------------------------------------------------------------------//
	
	
//	받은 편지함 현재 페이지에 맞게 목록 불러오기
	@PostMapping("/reception")
	public List<Letter> reception(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Letter> rlList = letterService.getRlList(midx, page);
		
		
		return rlList;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	보낸 편지함 현재 페이지에 맞게 목록 불러오기
	@PostMapping("/send")
	public List<Letter> send(@RequestParam(defaultValue = "1") int page) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
		List<Letter> slList = letterService.getSlList(midx, page);
		
		
		return slList;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	편지 선택 후 자세히 보기(읽기)
	@GetMapping("/detail")
	public Letter detail(@RequestParam int lidx) {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		편지 내용 가져오기
		Letter letter = letterService.getLetterDetail(lidx);
		
//		편지 확인 여부 Y로 바꿔주기
		letter.setLreadyn("Y");
		letterService.getLetterWrite(letter);
		
		return letter;
	}
	
	
//----------------------------------------------------------------------------------------------------//
	
	
//	편지 보내기
	@PostMapping("/sending")
	public void sending(@RequestParam int tlcidx, @ModelAttribute LetterDto letterDto, HttpServletRequest request) throws Exception {
		
//		이때 midx는 smidx(보낸사람 인덱스)
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		Long tlcidx_ = new Long(tlcidx);
		
		String savedName = null;
		if(letterDto.getLphoto() != null) {
		
	//		UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
			UUID uuid = UUID.randomUUID();
	//		이미지 파일 이름 저장(uuid + _ + 파일이름)
			savedName = uuid.toString() + "_" + letterDto.getLphoto().getOriginalFilename();
			
	//		기본 파일 저장 장소
	//		String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
			String rootPath = request.getSession().getServletContext().getRealPath("/resources");
			String filePath = rootPath;
			
	//		파일 업로드 작업 수행
			File file = new File(filePath);
			
			if (!file.exists()) {
				try{
				    file.mkdir(); //폴더 없을 시 폴더 생성
				    System.out.println("폴더가 생성되었습니다.");
			        } 
			        catch(Exception e){
				    e.getStackTrace();
				}        
		         }else {
				System.out.println("이미 폴더가 생성되어 있습니다.");
			}
			
			File dest = new File(file + "/" + savedName);
			letterDto.getLphoto().transferTo(dest);
			System.out.println("폴더 경로: " + dest);
			
		}
		
//		편지 받는 사람 인덱스
		int rmidx = ((timelinecontentService.getTlcDetail(tlcidx_)).get()).getMidx();
		
		Letter letter_ = Letter.builder()
			.tlcidx(tlcidx)
			.smidx(midx)
			.rmidx(rmidx)
			.lregdate(LocalDateTime.now())
			.lcontent(letterDto.getLcontent())
			.lreadyn("N")
			.lcategory(letterDto.getLcategory())
			.lphoto(savedName)
			.build();

//		편지 보내기
		letterService.getLetterWrite(letter_);
		

		
	}
	
	
//----------------------------------------------------------------------------------------------------//

	
//	답장 보내기
	@PostMapping("/reply")
	public void reply(@RequestParam int lidx, @ModelAttribute LetterDto letterDto, HttpServletRequest request) throws IllegalStateException, IOException {
		
		int midx = ((memberRepository.findByUsername(SecurityUtil.getCurrentUsername().get())).getMidx()).intValue();
		
//		기존 편지 불러오기
		Letter letter_ = letterService.getLetterDetail(lidx);
		
//		기존 편지에서 게시글 번호와 받는 사람 인덱스 가져오기
		int tlcidx = letter_.getTlcidx();
		int rmidx = letter_.getRmidx();
		
		String savedName = null;
		if(letterDto.getLphoto() != null) {

	//		UUID 생셩 (Universal Unique IDentifier, 	범용 고유 식별자)
			UUID uuid = UUID.randomUUID();
	//		이미지 파일 이름 저장(uuid + _ + 파일이름)
			savedName = uuid.toString() + "_" + letterDto.getLphoto().getOriginalFilename();
			
	//		기본 파일 저장 장소
	//		String rootPath = FileSystemView.getFileSystemView().getHomeDirectory().toString();
			String rootPath = request.getSession().getServletContext().getRealPath("/resources");
			String filePath = rootPath;
			
	//		파일 업로드 작업 수행
			File file = new File(filePath);
			
			if (!file.exists()) {
				try{
				    file.mkdir(); //폴더 없을 시 폴더 생성
				    System.out.println("폴더가 생성되었습니다.");
			        } 
			        catch(Exception e){
				    e.getStackTrace();
				}        
		         }else {
				System.out.println("이미 폴더가 생성되어 있습니다.");
			}
			
			File dest = new File(file + "/" + savedName);
			letterDto.getLphoto().transferTo(dest);
			System.out.println("폴더 경로: " + dest);
		
		}
		
		Letter letter_2 = Letter.builder()
			.tlcidx(tlcidx)
			.lidx_2(lidx)
			.smidx(midx)
			.rmidx(rmidx)
			.lregdate(LocalDateTime.now())
			.lcontent(letterDto.getLcontent())
			.lreadyn("N")
			.lcategory(letterDto.getLcategory())
			.lphoto(savedName)
			.build();
		
//		편지 보내기
		letterService.getLetterWrite(letter_2);
	}
		

}
