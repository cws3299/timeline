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
@Table(name = "TIMECAPSULE")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Timecapsule {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "TCIDX")
	private int tcidx;
	
	@Column(name = "MIDX")
	private int midx;
	
	@Column(name = "TCTERM")
	private LocalDateTime tcterm;
	
	@Column(name = "TCTITLE")
	private String tctitle;
	
	@Column(name = "TCCONTENT")
	private String tccontent;
	
	@Column(name = "TCIMAGE")
	private String tcimage;
	
	@Column(name = "TCTHINK")
	private String tcthink;
	
	@Column(name = "TCCHECKYN")
	private String tccheckyn;
	
	@Column(name = "TCFEEDBACK")
	private String tcfeedback;
	
	@Column(name = "TCREGDATE")
	private LocalDateTime tcregdate;
	
}
