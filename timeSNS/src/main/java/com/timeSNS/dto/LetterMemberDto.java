package com.timeSNS.dto;

import java.time.LocalDateTime;

import javax.persistence.Column;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LetterMemberDto {

	private int lidx;
	
	private int tlcidx;
	
	private int lidx_2;
	
	private int smidx;
	
	@Column(name = "smid")
	private String smid;
	
	@Column(name = "smnickname")
	private String smnickname;
	
	@Column(name = "smphoto")
	private String smphoto;
	
	private int rmidx;
	
	@Column(name = "rmid")
	private String rmid;
	
	@Column(name = "rmnickname")
	private String rmnickname;
	
	@Column(name = "rmphoto")
	private String rmphoto;
	
	private LocalDateTime lregdate;
	
	private String lcontent;
	
	private String lreadyn;
	
	private String lcategory;
	
	private String lphoto;
	
}
