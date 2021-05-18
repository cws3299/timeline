package com.timeSNS.entity;

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
@Table(name = "EMOTION")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Emotion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "EIDX")
	private Long eidx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "EGOODYN")
	private String egoodyn;
	
	@Column(name = "EFIGHTINGYN")
	private String efightingyn;
	
	@Column(name = "ECONGRATURATIONYN")
	private String econgraturationyn;
	
	@Column(name = "EEXPECTYN")
	private String eexpectyn;
	
	@Column(name = "ESURPRISEYN")
	private String esurpriseyn;
	
	@Column(name = "ESADYN")
	private String esadyn;
	
	@Column(name = "ENICEYN")
	private String eniceyn;
	
	@Column(name = "EREGDATE")
	private LocalDateTime eregdate;
	
}
