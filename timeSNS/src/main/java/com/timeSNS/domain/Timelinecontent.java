package com.timeSNS.domain;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "TIMELINECONTENT")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Timelinecontent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TLCIDX")
	private Long tlcidx;
	
	@Column(name = "TLIDX")
	private int tlidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "TLCREGDATE")
	private LocalDateTime tlcregdate;
	
	@Column(name = "TLCDATE")
	private LocalDateTime tlcdate;
	
	@Column(name = "TLCPLACE")
	private String tlcplace;
	
	@Column(name = "TLCIMAGE")
	private String tlcimage;
	
	@Column(name = "TLCCONTENT")
	private String tlccontent;
	
	@Column(name = "TLCEMOTION")
	private String tlcemotion;
	
	@Column(name = "TLCPUBYN")
	private String tlcpubyn;
	
	@Column(name = "TLCDELYN")
	private String tlcdelyn;
	
}
