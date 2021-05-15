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
@Table(name = "LETTER")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Letter {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "LIDX")
	private Long lidx;
	
	@Column(name = "TLCIDX")
	private int tlcidx;
	
	@Column(name = "LIDX_2")
	private int lidx_2;
	
	@Column(name = "SMIDX")
	private int smidx;
	
	@Column(name = "RMIDX")
	private int rmidx;
	
	@Column(name = "LREGDATE")
	private LocalDateTime lregdate;
	
	@Column(name = "LCONTENT")
	private String lcontent;
	
	@Column(name = "LREADYN")
	private String lreadyn;
	
	@Column(name = "LCATEGORY")
	private String lcategory;
	
	@Column(name = "LPHOTO")
	private String lphto;
	
}
