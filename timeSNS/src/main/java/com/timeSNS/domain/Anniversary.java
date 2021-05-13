package com.timeSNS.domain;

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
@Table(name = "ANNIVERSARY")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Anniversary {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "AIDX")
	private int aidx;
	
	@Column(name = "TLIDX")
	private int tlidx;
	
	@Column(name = "ATITLE")
	private String atitle;
	
	@Column(name = "ACONTENT")
	private String acontent;
	
}
