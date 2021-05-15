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
@Table(name = "TIMELINE")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Timeline {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TLIDX")
	private Long tlidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "TLTITLE")
	private String tltitle;
	
	@Column(name = "TLCATEGORY")
	private String tlcategory;
	
	@Column(name = "TLINTRODUCE")
	private String tlintroduce;
	
	@Column(name = "TLREGDATE")
	private LocalDateTime tlregdate;
	
	@Column(name = "TLPUBYN")
	private String tlpubyn;
	
	@Column(name = "TLDELYN")
	private String tldelyn;
	
}
